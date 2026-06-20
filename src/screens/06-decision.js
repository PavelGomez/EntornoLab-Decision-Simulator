import { state } from '../state.js';
import { T } from '../i18n.js';
import { renderNavFooter } from './helpers.js';
import { renderProfessorPanel } from '../professor.js';
import { assemblePhrase, getPhraseFields, isPhraseComplete } from '../ebtaPhrase.js';

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

  // Initial render
  updatePhrase();
  validate();
}
