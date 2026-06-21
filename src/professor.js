import { state } from './state.js';
import { T } from './i18n.js';

export function isProfessorMode() {
  return new URLSearchParams(window.location.search).get('modo') === 'profesor' ||
    window.location.hash === '#profesor';
}

export function renderProfessorPanel(caseData, nav) {
  const st = state.get();
  const panel = document.createElement('div');
  panel.className = 'professor-panel';

  panel.innerHTML = `<div class="professor-panel-title">&#127891; ${T.prof_panel}</div>`;

  // Modalidad del recorrido: Tabletop (TTX) | Wargame
  const modalityDiv = document.createElement('div');
  modalityDiv.style.cssText = 'margin-bottom:12px;';
  modalityDiv.innerHTML = `<div style="margin-bottom:8px;font-size:13px;opacity:.8">${T.prof_modality}</div>`;
  const modes = [
    { key: 'ttx', label: 'Tabletop (TTX)' },
    { key: 'wargame', label: 'Wargame' },
  ];
  const modeRow = document.createElement('div');
  modeRow.style.cssText = 'display:flex;gap:8px;';
  modes.forEach(m => {
    const active = (st.modality || 'ttx') === m.key;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.style.cssText = 'flex:1;padding:8px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.35);cursor:pointer;font-size:13px;font-weight:700;' +
      (active ? 'background:#2D6EA3;color:#fff;border-color:#2D6EA3;' : 'background:transparent;color:#fff;');
    btn.textContent = m.label;
    btn.addEventListener('click', () => {
      state.set({ modality: m.key });
      nav.navigate(state.get().currentScreen);
    });
    modeRow.appendChild(btn);
  });
  modalityDiv.appendChild(modeRow);
  panel.appendChild(modalityDiv);

  // Inject selector
  const injectDiv = document.createElement('div');
  injectDiv.innerHTML = `<div style="margin-bottom:8px;font-size:13px;opacity:.8">${T.prof_injectSelect}</div>`;

  caseData.injects.forEach(inj => {
    const btn = document.createElement('button');
    const isSelected = st.selectedInjectId === inj.id;
    btn.style.cssText = 'display:block;width:100%;text-align:left;padding:8px 12px;margin-bottom:8px;border-radius:6px;border:none;cursor:pointer;font-size:13px;' +
      (isSelected ? 'background:#2D6EA3;color:white;' : 'background:rgba(255,255,255,.15);color:white;');
    const previewText = inj.text.length > 80 ? inj.text.substring(0, 80) + '...' : inj.text;
    btn.textContent = `${inj.id}: ${previewText}`;
    btn.addEventListener('click', () => {
      state.set({ selectedInjectId: inj.id });
      nav.navigate(state.get().currentScreen);
    });
    injectDiv.appendChild(btn);

    if (isSelected) {
      const prompt = document.createElement('div');
      prompt.style.cssText = 'font-size:12px;opacity:.8;padding:8px;background:rgba(255,255,255,.1);border-radius:4px;margin-bottom:8px;';
      prompt.innerHTML = `<strong>${T.prof_facilPrompt}</strong><br>${inj.facilitatorPrompt}`;
      injectDiv.appendChild(prompt);
    }
  });

  panel.appendChild(injectDiv);

  // Case notes
  const notesDiv = document.createElement('div');
  notesDiv.style.cssText = 'margin-top:12px;font-size:12px;opacity:.7;';
  const notesPreview = caseData.facilitatorNotes.length > 200
    ? caseData.facilitatorNotes.substring(0, 200) + '...'
    : caseData.facilitatorNotes;
  notesDiv.innerHTML = `<strong>${T.prof_caseNotes}</strong><br>${notesPreview}`;
  panel.appendChild(notesDiv);

  // facilitatorAnalysis (solo en modo profesor — nunca visible al participante)
  if (caseData.facilitatorAnalysis) {
    const fa = caseData.facilitatorAnalysis;
    const analysisDiv = document.createElement('details');
    analysisDiv.style.cssText = 'margin-top:12px;';
    const analysisSummary = document.createElement('summary');
    analysisSummary.style.cssText = 'font-size:12px;font-weight:bold;cursor:pointer;opacity:.85;margin-bottom:6px;';
    analysisSummary.textContent = '\u{1F9E0} An\u00e1lisis del facilitador';
    analysisDiv.appendChild(analysisSummary);

    const rows = [
      { label: 'Sin opci\u00f3n dominante', value: fa.noDominantOption },
      { label: 'Mapa de trade-offs', value: fa.tradeoffMap },
      { label: 'Calibraci\u00f3n', value: fa.calibration },
    ];
    rows.forEach(row => {
      if (!row.value) return;
      const p = document.createElement('p');
      p.style.cssText = 'font-size:11px;opacity:.75;margin-bottom:6px;line-height:1.5;';
      p.innerHTML = `<strong>${row.label}:</strong> ${row.value}`;
      analysisDiv.appendChild(p);
    });

    if (fa.injectInteractions?.length) {
      const intLabel = document.createElement('p');
      intLabel.style.cssText = 'font-size:11px;font-weight:bold;opacity:.75;margin-bottom:4px;';
      intLabel.textContent = 'Interacciones inject \u2194 movidas:';
      analysisDiv.appendChild(intLabel);
      fa.injectInteractions.forEach(ii => {
        const p = document.createElement('p');
        p.style.cssText = 'font-size:11px;opacity:.7;margin-bottom:4px;padding:4px 6px;background:rgba(255,255,255,.1);border-radius:4px;line-height:1.4;';
        const undercuts = ii.undercuts?.join(', ') || '\u2014';
        const rewards = ii.rewards?.join(', ') || '\u2014';
        p.innerHTML = `<strong>${ii.inject}</strong>: socava [${undercuts}], favorece [${rewards}]${ii.note ? '. ' + ii.note : ''}`;
        analysisDiv.appendChild(p);
      });
    }

    panel.appendChild(analysisDiv);
  }

  return panel;
}
