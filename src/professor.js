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

  // Inject selector
  const injectDiv = document.createElement('div');
  injectDiv.innerHTML = `<div style="margin-bottom:8px;font-size:13px;opacity:.8">${T.prof_injectSelect}</div>`;

  caseData.injects.forEach(inj => {
    const btn = document.createElement('button');
    const isSelected = st.selectedInjectId === inj.id;
    btn.style.cssText = 'display:block;width:100%;text-align:left;padding:8px 12px;margin-bottom:8px;border-radius:6px;border:none;cursor:pointer;font-size:13px;' +
      (isSelected ? 'background:#c9952a;color:white;' : 'background:rgba(255,255,255,.15);color:white;');
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

  return panel;
}
