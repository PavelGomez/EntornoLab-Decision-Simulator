import { state } from '../state.js';
import { T } from '../i18n.js';
import { renderProfessorPanel } from '../professor.js';
import { assemblePhrase, getPhraseFields } from '../ebtaPhrase.js';
import { generatePdf, openPrintView } from '../pdf.js';
import { escapeHtml, renderResetBtn } from './helpers.js';

export async function mountScreen10(container, caseData, nav) {
  const st = state.get();

  if (st.professorMode) {
    container.appendChild(renderProfessorPanel(caseData, nav));
  }

  const titleEl = document.createElement('h1');
  titleEl.className = 'screen-title';
  titleEl.textContent = T.s10_title;
  container.appendChild(titleEl);

  const subtitleEl = document.createElement('p');
  subtitleEl.className = 'screen-subtitle';
  subtitleEl.textContent = T.s10_hint;
  container.appendChild(subtitleEl);

  // Completion badge
  const badge = document.createElement('div');
  badge.className = 'completion-badge';
  badge.innerHTML = '&#10003; Ciclo de decisión completado';
  container.appendChild(badge);

  // Export actions
  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'export-actions';

  const pdfBtn = document.createElement('button');
  pdfBtn.className = 'btn btn-primary';
  pdfBtn.textContent = T.downloadPdf;
  pdfBtn.addEventListener('click', () => {
    const success = generatePdf(caseData, state.get());
    if (!success) {
      alert('No se pudo generar el PDF. Intente usar la vista imprimible como alternativa.');
    }
  });
  actionsDiv.appendChild(pdfBtn);

  const printBtn = document.createElement('button');
  printBtn.className = 'btn btn-secondary';
  printBtn.textContent = T.printView;
  printBtn.addEventListener('click', () => {
    openPrintView(caseData, state.get());
  });
  actionsDiv.appendChild(printBtn);

  const resetBtn = renderResetBtn();
  actionsDiv.appendChild(resetBtn);

  container.appendChild(actionsDiv);

  const pdfNote = document.createElement('p');
  pdfNote.style.cssText = 'font-size:var(--text-sm);color:var(--color-muted);margin-bottom:var(--sp-6);';
  pdfNote.textContent = T.s10_pdfNote;
  container.appendChild(pdfNote);

  // Case switcher
  const caseSection = document.createElement('div');
  caseSection.style.cssText = 'margin-bottom:var(--sp-6);';
  caseSection.innerHTML = `<p style="font-size:var(--text-sm);color:var(--color-muted);margin-bottom:var(--sp-3);">Acceder a otro caso:</p>`;

  const caseSelectorDiv = document.createElement('div');
  caseSelectorDiv.className = 'case-selector';
  const params = new URLSearchParams(window.location.search);
  const currentCase = (params.get('caso') || 'A').toUpperCase();

  ['A', 'B', 'C'].forEach(order => {
    const caseNames = { A: 'Caso A — Ancla', B: 'Caso B — Transferencia', C: 'Caso C — Portable' };
    const btn = document.createElement('a');
    btn.href = `?caso=${order}${st.professorMode ? '&modo=profesor' : ''}`;
    btn.className = `case-btn${currentCase === order ? ' active' : ''}`;
    btn.textContent = caseNames[order] || `Caso ${order}`;
    caseSelectorDiv.appendChild(btn);
  });

  caseSection.appendChild(caseSelectorDiv);
  container.appendChild(caseSection);

  // Summary sections
  const summary = document.createElement('div');

  // S2 - Classification
  const s2Section = createExportSection('Clasificación del evento', [
    {
      label: 'Tipo(s) de evento',
      value: st.s2_eventTypes.map(t => T.eventTypes[t] || t).join(', ') || '—'
    },
    {
      label: 'Criterio de demarcación',
      value: st.s2_demarcation || '—'
    },
    {
      label: 'Fuente principal de incertidumbre',
      value: T.uncertaintySources[st.s2_uncertaintySource] || st.s2_uncertaintySource || '—'
    }
  ]);
  summary.appendChild(s2Section);

  // S3 - Impact
  const s3Items = [
    { label: 'Canal dominante', value: T.channels[st.s3_dominantChannel] || st.s3_dominantChannel || '—' },
  ];
  if (st.s3_secondaryChannel) {
    s3Items.push({ label: 'Canal secundario', value: T.channels[st.s3_secondaryChannel] || st.s3_secondaryChannel });
  }
  s3Items.push(
    { label: 'Impacto 1.ª ronda', value: st.s3_impact1 || '—' },
    { label: 'Impacto 2.ª ronda', value: st.s3_impact2 || '—' }
  );
  summary.appendChild(createExportSection('Mapa de impacto', s3Items));

  // S4 - Buffers
  const s4Items = st.s4_selectedBuffers.map(bid => {
    const bufDef = caseData.availableBuffers.find(b => b.id === bid);
    const det = st.s4_bufferDetails[bid] || {};
    if (!bufDef) return null;
    return {
      label: bufDef.label,
      value: `Potencia: ${T.potencia[det.potencia] || det.potencia || '?'} · Duración: ${T.duracion[det.duracion] || det.duracion || '?'} · Costo: ${T.costo[det.costo] || det.costo || '?'} (${T.costUnits[bufDef.costUnit] || bufDef.costUnit})`
    };
  }).filter(Boolean);
  summary.appendChild(createExportSection('Buffer Board', s4Items.length > 0 ? s4Items : [{ label: 'Buffers seleccionados', value: '—' }]));

  // S5 - Trade-off
  summary.appendChild(createExportSection('Trade-off Statement', [
    { label: 'Qué se protege', value: st.s5_protects || '—' },
    { label: 'Qué se sacrifica', value: st.s5_sacrifices || '—' },
    { label: 'Riesgo residual', value: st.s5_residualRisk || '—' }
  ]));

  // S6 - Indicators
  summary.appendChild(createExportSection('Indicadores de revisión', [
    { label: 'I1', value: st.s6_i1 || '—' },
    { label: 'I2', value: st.s6_i2 || '—' },
    { label: 'Umbral T', value: st.s6_threshold || '—' }
  ]));

  // Phrase initial
  const phraseSection = document.createElement('div');
  phraseSection.className = 'export-section';
  phraseSection.innerHTML = `<div class="export-section-title">Frase E-BTA/R Inicial</div>`;
  const phraseDiv = document.createElement('div');
  phraseDiv.className = 'phrase-preview';
  phraseDiv.innerHTML = assemblePhrase(getPhraseFields(st, caseData, false), true);
  phraseSection.appendChild(phraseDiv);
  summary.appendChild(phraseSection);

  // Inject revealed
  const inject = caseData.injects.find(i => i.id === st.selectedInjectId) || caseData.injects[0];
  const injectSection = document.createElement('div');
  injectSection.className = 'export-section';
  injectSection.innerHTML = `<div class="export-section-title">Inject revelado</div>`;
  const injectCard = document.createElement('div');
  injectCard.className = 'inject-card';
  injectCard.innerHTML = `<div class="inject-label">${T.s8_title}</div><div class="inject-text">${escapeHtml(inject.text)}</div>`;
  injectSection.appendChild(injectCard);
  summary.appendChild(injectSection);

  // S9 - Supuestos
  summary.appendChild(createExportSection('Revisión forzada — Supuestos', [
    { label: 'Supuesto que mantengo', value: st.s9_maintains || '—' },
    { label: 'Supuesto que abandono', value: st.s9_abandons || '—' },
    { label: 'Supuesto que invierto', value: st.s9_inverts || '—' }
  ]));

  // Revised phrase
  const revisedPhraseSection = document.createElement('div');
  revisedPhraseSection.className = 'export-section';
  revisedPhraseSection.innerHTML = `<div class="export-section-title">Frase E-BTA/R Revisada</div>`;
  const revisedPhraseDiv = document.createElement('div');
  revisedPhraseDiv.className = 'phrase-preview';
  revisedPhraseDiv.innerHTML = assemblePhrase(getPhraseFields(st, caseData, true), true);
  revisedPhraseSection.appendChild(revisedPhraseDiv);
  summary.appendChild(revisedPhraseSection);

  container.appendChild(summary);

  // Padding at bottom (no nav footer needed)
  const spacer = document.createElement('div');
  spacer.style.height = 'var(--sp-16)';
  container.appendChild(spacer);
}

function createExportSection(title, items) {
  const section = document.createElement('div');
  section.className = 'export-section';

  const titleEl = document.createElement('div');
  titleEl.className = 'export-section-title';
  titleEl.textContent = title;
  section.appendChild(titleEl);

  items.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'export-item';
    itemEl.innerHTML = `
      <div class="export-item-label">${escapeHtml(item.label)}</div>
      <div class="export-item-value">${escapeHtml(item.value)}</div>
    `;
    section.appendChild(itemEl);
  });

  return section;
}
