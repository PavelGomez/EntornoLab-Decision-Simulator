import { state } from '../state.js';
import { T } from '../i18n.js';
import { renderNavFooter, escapeHtml } from './helpers.js';
import { renderProfessorPanel } from '../professor.js';
import { assemblePhrase, getPhraseFields, isPhraseComplete } from '../ebtaPhrase.js';
import { attachSoftHints, makeSoftHintBox } from '../softHints.js';

export async function mountScreen06(container, caseData, nav) {
  const st = state.get();

  if (st.professorMode) {
    container.appendChild(renderProfessorPanel(caseData, nav));
  }

  const titleEl = document.createElement('h1');
  titleEl.className = 'screen-title';
  titleEl.textContent = T.screenTitles[6];
  container.appendChild(titleEl);

  const subtitleEl = document.createElement('p');
  subtitleEl.className = 'screen-subtitle';
  subtitleEl.textContent = T.s6_phraseHint;
  container.appendChild(subtitleEl);

  const microcopy = document.createElement('p');
  microcopy.className = 'screen-microcopy';
  microcopy.textContent = T.microcopy.accion;
  container.appendChild(microcopy);

  // Phrase card (live preview)
  const phraseCard = document.createElement('div');
  phraseCard.className = 'card';
  phraseCard.innerHTML = `
    <div class="card-header">
      <h2 class="card-title">${T.s6_phraseTitle}</h2>
    </div>
    <div id="phrase-preview" class="phrase-preview"></div>
  `;
  container.appendChild(phraseCard);

  // Indicators card
  const indicatorsCard = document.createElement('div');
  indicatorsCard.className = 'card';

  // I1
  const i1Group = document.createElement('div');
  i1Group.className = 'field-group';
  i1Group.innerHTML = `
    <label class="field-label" for="i1">${T.s6_i1}</label>
    <input type="text" id="i1" class="field-input" placeholder="Ej: Publicación oficial de la circular en Gaceta" value="${st.s6_i1 || ''}">
    <p class="field-hint">${T.s6_i1Hint}</p>
  `;
  indicatorsCard.appendChild(i1Group);

  // I2
  const i2Group = document.createElement('div');
  i2Group.className = 'field-group';
  i2Group.innerHTML = `
    <label class="field-label" for="i2">${T.s6_i2}</label>
    <input type="text" id="i2" class="field-input" placeholder="Ej: Movimiento de saldos de usuarios hacia competidores" value="${st.s6_i2 || ''}">
    <p class="field-hint">${T.s6_i2Hint}</p>
  `;
  indicatorsCard.appendChild(i2Group);

  // Threshold
  const thresholdGroup = document.createElement('div');
  thresholdGroup.className = 'field-group';
  thresholdGroup.innerHTML = `
    <label class="field-label" for="threshold">${T.s6_threshold}</label>
    <textarea id="threshold" class="field-textarea" placeholder="Ej: Si la circular se publica con plazo menor a 60 días...">${st.s6_threshold || ''}</textarea>
    <p class="field-hint">${T.s6_thresholdHint}</p>
  `;
  indicatorsCard.appendChild(thresholdGroup);

  container.appendChild(indicatorsCard);

  // ── Tipo de jugada (opción real) — opcional (v1.5) ──
  const realOptCard = document.createElement('div');
  realOptCard.className = 'card';
  const realOptOptionsHtml = Object.entries(T.realOptions)
    .map(([v, l]) => `<option value="${v}"${st.s6_realOption === v ? ' selected' : ''}>${l}</option>`).join('');
  realOptCard.innerHTML = `
    <div class="field-group" style="margin-bottom:var(--sp-3)">
      <label class="field-label" for="real-option">${T.s6_realOption}</label>
      <select id="real-option" class="field-select">
        <option value="">${T.s6_realOptionNone}</option>
        ${realOptOptionsHtml}
      </select>
      <p class="field-hint">${T.s6_realOptionHint}</p>
    </div>
    <div id="real-option-trigger-wrap" class="field-group optional-field" style="margin-bottom:0;display:none">
      <label class="field-label" for="real-option-trigger">${T.s6_realOptionTrigger}</label>
      <textarea id="real-option-trigger" class="field-textarea" placeholder="Qué señal define ejercer / abandonar / seguir esperando…">${escapeHtml(st.s6_realOptionTrigger || '')}</textarea>
      <p class="field-hint">${T.s6_realOptionTriggerHint}</p>
    </div>
    <div id="real-option-wait" class="soft-hints" style="margin-top:var(--sp-3)"></div>
  `;
  container.appendChild(realOptCard);

  const realOptSelect = realOptCard.querySelector('#real-option');
  const triggerWrap = realOptCard.querySelector('#real-option-trigger-wrap');
  const triggerEl = realOptCard.querySelector('#real-option-trigger');
  const waitBox = realOptCard.querySelector('#real-option-wait');

  function updateRealOption() {
    const val = realOptSelect.value;
    triggerWrap.style.display = val ? '' : 'none';
    waitBox.innerHTML = '';
    if (val === 'esperar') {
      const p = document.createElement('p');
      p.className = 'soft-hint';
      p.textContent = T.s6_waitPista;
      waitBox.appendChild(p);
    }
    state.set({ s6_realOption: val, s6_realOptionTrigger: triggerEl.value });
  }
  realOptSelect.addEventListener('change', updateRealOption);
  triggerEl.addEventListener('input', () => state.set({ s6_realOptionTrigger: triggerEl.value }));
  updateRealOption();

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
  const phrasePreview = container.querySelector('#phrase-preview');

  function getCurrentFields() {
    const i1 = container.querySelector('#i1').value;
    const i2 = container.querySelector('#i2').value;
    const threshold = container.querySelector('#threshold').value;
    const currentSt = state.get();
    return {
      eventTypes: currentSt.s2_eventTypes,
      uncertaintySource: currentSt.s2_uncertaintySource,
      dominantChannel: currentSt.s3_dominantChannel,
      selectedBuffers: currentSt.s4_selectedBuffers,
      bufferDetails: currentSt.s4_bufferDetails,
      caseData,
      protects: currentSt.s5_protects,
      sacrifices: currentSt.s5_sacrifices,
      i1,
      i2,
      threshold,
    };
  }

  function updatePhrase() {
    const fields = getCurrentFields();
    phrasePreview.innerHTML = assemblePhrase(fields, true);
  }

  function validate() {
    const fields = getCurrentFields();
    const complete = isPhraseComplete(fields);
    nextBtn.disabled = !complete;
    return complete;
  }

  function saveState() {
    state.set({
      s6_i1: container.querySelector('#i1').value,
      s6_i2: container.querySelector('#i2').value,
      s6_threshold: container.querySelector('#threshold').value,
    });
  }

  // Wire up
  ['#i1', '#i2', '#threshold'].forEach(sel => {
    container.querySelector(sel).addEventListener('input', () => {
      saveState();
      updatePhrase();
      validate();
    });
  });

  // Pista blanda en el umbral (necesita valor + ventana de tiempo)
  const thresholdEl = container.querySelector('#threshold');
  const thresholdBox = makeSoftHintBox();
  thresholdEl.parentElement.appendChild(thresholdBox);
  attachSoftHints(thresholdEl, ['umbral'], thresholdBox);

  // Initial render
  updatePhrase();
  validate();
}
