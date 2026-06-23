import { state } from '../state.js';
import { T } from '../i18n.js';
import { renderNavFooter } from './helpers.js';
import { renderProfessorPanel } from '../professor.js';
import { renderDossierConsultPanel } from '../dossier.js';
import { attachSoftHints, makeSoftHintBox } from '../softHints.js';
import { escapeHtml } from './helpers.js';

export async function mountScreen03(container, caseData, nav) {
  const st = state.get();

  if (st.professorMode) {
    container.appendChild(renderProfessorPanel(caseData, nav));
  }

  const titleEl = document.createElement('h1');
  titleEl.className = 'screen-title';
  titleEl.textContent = T.screenTitles[3];
  container.appendChild(titleEl);

  const subtitleEl = document.createElement('p');
  subtitleEl.className = 'screen-subtitle';
  subtitleEl.textContent = 'Identifique el canal de impacto y describa las rondas de propagación.';
  container.appendChild(subtitleEl);

  const microcopy = document.createElement('p');
  microcopy.className = 'screen-microcopy';
  microcopy.textContent = T.microcopy.canal;
  container.appendChild(microcopy);

  // Panel de consulta del dossier (actores + incertidumbre)
  const consultPanel = renderDossierConsultPanel(caseData.dossier);
  if (consultPanel) container.appendChild(consultPanel);

  // ── Reducir equivocidad (v1.5) — encima del canal dominante ──
  const equivBlock = document.createElement('div');
  equivBlock.className = 'equiv-block';
  let rivalSuggestionsHtml = '';
  if (Array.isArray(caseData.rivalInterpretations) && caseData.rivalInterpretations.length) {
    rivalSuggestionsHtml = `
      <p class="field-hint" style="margin-top:var(--sp-3)"><strong>${T.s3_rivalSuggestions}</strong></p>
      <ul class="lc-list" style="margin-top:var(--sp-2)">${
        caseData.rivalInterpretations.map(r => `<li>${escapeHtml(r)}</li>`).join('')
      }</ul>`;
  }
  equivBlock.innerHTML = `
    <div class="equiv-title">${T.s3_equivTitle}</div>
    <p class="equiv-intro">${T.s3_equivIntro}</p>
    <div class="field-group">
      <label class="field-label" for="rival-interpretations">${T.s3_rivalInterpretations}</label>
      <textarea id="rival-interpretations" class="field-textarea" placeholder="Lectura A… / Lectura B… / Lectura C…">${escapeHtml(st.s3_rivalInterpretations || '')}</textarea>
      <p class="field-hint">${T.s3_rivalInterpretationsHint}</p>
    </div>
    <div class="field-group" style="margin-bottom:0">
      <label class="field-label" for="discriminating-evidence">${T.s3_discriminatingEvidence}</label>
      <input type="text" id="discriminating-evidence" class="field-input" placeholder="El dato que distingue una lectura de otra…" value="${escapeHtml(st.s3_discriminatingEvidence || '')}">
      <p class="field-hint">${T.s3_discriminatingEvidenceHint}</p>
    </div>
    ${rivalSuggestionsHtml}
  `;
  container.appendChild(equivBlock);

  const card = document.createElement('div');
  card.className = 'card';

  const channelOptions = Object.entries(T.channels).map(([value, label]) => ({ value, label }));

  // Dominant channel select
  const domGroup = document.createElement('div');
  domGroup.className = 'field-group';
  const domLabel = document.createElement('label');
  domLabel.className = 'field-label';
  domLabel.setAttribute('for', 'dominant-channel');
  domLabel.textContent = T.s3_dominantChannel;
  domGroup.appendChild(domLabel);

  const domSelect = document.createElement('select');
  domSelect.id = 'dominant-channel';
  domSelect.className = 'field-select';
  domSelect.innerHTML = '<option value="">— Seleccione un canal —</option>';
  channelOptions.forEach(opt => {
    const el = document.createElement('option');
    el.value = opt.value;
    el.textContent = opt.label;
    if (opt.value === st.s3_dominantChannel) el.selected = true;
    domSelect.appendChild(el);
  });
  domGroup.appendChild(domSelect);
  card.appendChild(domGroup);

  // Secondary channel select
  const secGroup = document.createElement('div');
  secGroup.className = 'field-group';
  const secLabel = document.createElement('label');
  secLabel.className = 'field-label';
  secLabel.setAttribute('for', 'secondary-channel');
  secLabel.textContent = T.s3_secondaryChannel;
  secGroup.appendChild(secLabel);

  const secSelect = document.createElement('select');
  secSelect.id = 'secondary-channel';
  secSelect.className = 'field-select';
  secSelect.innerHTML = `<option value="">${T.s3_secondaryNone}</option>`;
  channelOptions.forEach(opt => {
    const el = document.createElement('option');
    el.value = opt.value;
    el.textContent = opt.label;
    if (opt.value === st.s3_secondaryChannel) el.selected = true;
    secSelect.appendChild(el);
  });
  secGroup.appendChild(secSelect);
  card.appendChild(secGroup);

  // Impact round 1
  const impact1Group = document.createElement('div');
  impact1Group.className = 'field-group';
  impact1Group.innerHTML = `
    <label class="field-label" for="impact1">${T.s3_impact1}</label>
    <textarea id="impact1" class="field-textarea" placeholder="Describa el impacto inmediato...">${st.s3_impact1 || ''}</textarea>
    <p class="field-hint">${T.s3_impact1Hint}</p>
  `;
  card.appendChild(impact1Group);

  // Impact round 2
  const impact2Group = document.createElement('div');
  impact2Group.className = 'field-group';
  impact2Group.innerHTML = `
    <label class="field-label" for="impact2">${T.s3_impact2}</label>
    <textarea id="impact2" class="field-textarea" placeholder="Describa el impacto de mediano plazo...">${st.s3_impact2 || ''}</textarea>
    <p class="field-hint">${T.s3_impact2Hint}</p>
  `;
  card.appendChild(impact2Group);

  container.appendChild(card);

  // Validation message
  const valMsg = document.createElement('div');
  valMsg.className = 'nav-validation-msg';
  container.appendChild(valMsg);

  // Nav footer
  const footer = renderNavFooter({
    showBack: true,
    onBack: nav.onBack,
    onNext: nav.onNext,
    nextDisabled: true,
    nextLabel: T.continue,
  });
  container.appendChild(footer);

  const nextBtn = footer.querySelector('.btn-primary');

  function validate() {
    const dom = domSelect.value;
    const i1 = container.querySelector('#impact1').value.trim();
    const i2 = container.querySelector('#impact2').value.trim();
    const valid = !!dom && i1.length > 0 && i2.length > 0;
    nextBtn.disabled = !valid;
    if (!valid) {
      const missing = [];
      if (!dom) missing.push('el canal dominante');
      if (!i1) missing.push('el impacto de primera ronda');
      if (!i2) missing.push('el impacto de segunda ronda');
      valMsg.textContent = `Completa ${missing.join(', ')} antes de continuar.`;
    } else {
      valMsg.textContent = '';
    }
    valMsg.classList.toggle('show', !valid && (!!dom || !!i1 || !!i2));
    return valid;
  }

  function saveState() {
    state.set({
      s3_dominantChannel: domSelect.value,
      s3_secondaryChannel: secSelect.value,
      s3_impact1: container.querySelector('#impact1').value,
      s3_impact2: container.querySelector('#impact2').value,
      s3_rivalInterpretations: container.querySelector('#rival-interpretations').value,
      s3_discriminatingEvidence: container.querySelector('#discriminating-evidence').value,
    });
  }

  domSelect.addEventListener('change', () => { saveState(); validate(); });
  secSelect.addEventListener('change', () => { saveState(); });
  container.querySelector('#impact1').addEventListener('input', () => { saveState(); validate(); });
  container.querySelector('#impact2').addEventListener('input', () => { saveState(); validate(); });

  // Equivocidad: opcionales, no afectan la validación de avance.
  container.querySelector('#rival-interpretations').addEventListener('input', saveState);
  container.querySelector('#discriminating-evidence').addEventListener('input', saveState);

  // Pistas blandas en los impactos ("afecta todo" → jerarquiza el canal dominante)
  const impact1El = container.querySelector('#impact1');
  const impact2El = container.querySelector('#impact2');
  const hintBox1 = makeSoftHintBox();
  const hintBox2 = makeSoftHintBox();
  impact1El.parentElement.appendChild(hintBox1);
  impact2El.parentElement.appendChild(hintBox2);
  attachSoftHints(impact1El, ['impacto'], hintBox1);
  attachSoftHints(impact2El, ['impacto'], hintBox2);

  validate();
}
