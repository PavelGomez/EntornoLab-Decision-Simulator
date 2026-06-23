import { state } from '../state.js';
import { T } from '../i18n.js';
import { renderNavFooter } from './helpers.js';
import { renderProfessorPanel } from '../professor.js';
import { attachSoftHints, makeSoftHintBox } from '../softHints.js';

export async function mountScreen05(container, caseData, nav) {
  const st = state.get();

  if (st.professorMode) {
    container.appendChild(renderProfessorPanel(caseData, nav));
  }

  const titleEl = document.createElement('h1');
  titleEl.className = 'screen-title';
  titleEl.textContent = T.screenTitles[5];
  container.appendChild(titleEl);

  const subtitleEl = document.createElement('p');
  subtitleEl.className = 'screen-subtitle';
  subtitleEl.textContent = 'Articule explícitamente qué protege su decisión, qué sacrifica y qué riesgo permanece.';
  container.appendChild(subtitleEl);

  const microcopy = document.createElement('p');
  microcopy.className = 'screen-microcopy';
  microcopy.textContent = T.microcopy.tradeoff;
  container.appendChild(microcopy);

  const card = document.createElement('div');
  card.className = 'card';

  // Protects
  const protectsGroup = document.createElement('div');
  protectsGroup.className = 'field-group';
  protectsGroup.innerHTML = `
    <label class="field-label" for="protects">${T.s5_protects}</label>
    <textarea id="protects" class="field-textarea" placeholder="El activo, capacidad o relación que se pone a resguardo...">${st.s5_protects || ''}</textarea>
    <p class="field-hint">${T.s5_protectsHint}</p>
  `;
  card.appendChild(protectsGroup);

  // Sacrifices
  const sacrificesGroup = document.createElement('div');
  sacrificesGroup.className = 'field-group';
  sacrificesGroup.innerHTML = `
    <label class="field-label" for="sacrifices">${T.s5_sacrifices}</label>
    <textarea id="sacrifices" class="field-textarea" placeholder="Lo que se cede o expone para proteger lo anterior...">${st.s5_sacrifices || ''}</textarea>
    <p class="field-hint">${T.s5_sacrificesHint}</p>
  `;
  card.appendChild(sacrificesGroup);

  // Residual risk
  const residualGroup = document.createElement('div');
  residualGroup.className = 'field-group';
  residualGroup.innerHTML = `
    <label class="field-label" for="residual-risk">${T.s5_residualRisk}</label>
    <textarea id="residual-risk" class="field-textarea" placeholder="El riesgo que permanece incluso si la decisión funciona...">${st.s5_residualRisk || ''}</textarea>
    <p class="field-hint">${T.s5_residualRiskHint}</p>
  `;
  card.appendChild(residualGroup);

  container.appendChild(card);

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
    const p = container.querySelector('#protects').value.trim();
    const s = container.querySelector('#sacrifices').value.trim();
    const r = container.querySelector('#residual-risk').value.trim();
    const valid = p.length > 0 && s.length > 0 && r.length > 0;
    nextBtn.disabled = !valid;
    return valid;
  }

  function saveState() {
    state.set({
      s5_protects: container.querySelector('#protects').value,
      s5_sacrifices: container.querySelector('#sacrifices').value,
      s5_residualRisk: container.querySelector('#residual-risk').value,
    });
  }

  container.querySelector('#protects').addEventListener('input', () => { saveState(); validate(); });
  container.querySelector('#sacrifices').addEventListener('input', () => { saveState(); validate(); });
  container.querySelector('#residual-risk').addEventListener('input', () => { saveState(); validate(); });

  // Pistas blandas (reglas globales: p. ej. "cisne negro" → rinoceronte gris)
  ['#protects', '#sacrifices', '#residual-risk'].forEach(sel => {
    const el = container.querySelector(sel);
    const box = makeSoftHintBox();
    el.parentElement.appendChild(box);
    attachSoftHints(el, ['evento'], box);
  });

  validate();
}
