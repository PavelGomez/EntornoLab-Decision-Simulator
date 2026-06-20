import { state } from '../state.js';
import { T } from '../i18n.js';
import { renderNavFooter } from './helpers.js';
import { renderProfessorPanel } from '../professor.js';
import { assemblePhrase, getPhraseFields } from '../ebtaPhrase.js';

export async function mountScreen07(container, caseData, nav) {
  const st = state.get();

  if (st.professorMode) {
    container.appendChild(renderProfessorPanel(caseData, nav));
  }

  const titleEl = document.createElement('h1');
  titleEl.className = 'screen-title';
  titleEl.textContent = T.screenTitles[7];
  container.appendChild(titleEl);

  const subtitleEl = document.createElement('p');
  subtitleEl.className = 'screen-subtitle';
  subtitleEl.textContent = T.s7_hint;
  container.appendChild(subtitleEl);

  // Show the complete phrase for reference
  const phraseCard = document.createElement('div');
  phraseCard.className = 'card';
  phraseCard.innerHTML = `
    <div class="card-header">
      <h2 class="card-title">${T.s6_phraseTitle}</h2>
    </div>
    <div class="phrase-preview" id="phrase-preview-07"></div>
  `;
  container.appendChild(phraseCard);

  // Review and optionally adjust indicators
  const reviewCard = document.createElement('div');
  reviewCard.className = 'card';
  reviewCard.innerHTML = `<div class="card-header"><h2 class="card-title">${T.s7_review}</h2></div>`;

  // I1
  const i1Group = document.createElement('div');
  i1Group.className = 'field-group';
  i1Group.innerHTML = `
    <label class="field-label" for="rev-i1">${T.s6_i1}</label>
    <input type="text" id="rev-i1" class="field-input" value="${st.s6_i1 || ''}">
    <p class="field-hint">${T.s6_i1Hint}</p>
  `;
  reviewCard.appendChild(i1Group);

  // I2
  const i2Group = document.createElement('div');
  i2Group.className = 'field-group';
  i2Group.innerHTML = `
    <label class="field-label" for="rev-i2">${T.s6_i2}</label>
    <input type="text" id="rev-i2" class="field-input" value="${st.s6_i2 || ''}">
    <p class="field-hint">${T.s6_i2Hint}</p>
  `;
  reviewCard.appendChild(i2Group);

  // Threshold
  const thresholdGroup = document.createElement('div');
  thresholdGroup.className = 'field-group';
  thresholdGroup.innerHTML = `
    <label class="field-label" for="rev-threshold">${T.s6_threshold}</label>
    <textarea id="rev-threshold" class="field-textarea">${st.s6_threshold || ''}</textarea>
    <p class="field-hint">${T.s6_thresholdHint}</p>
  `;
  reviewCard.appendChild(thresholdGroup);

  container.appendChild(reviewCard);

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
  const phrasePreview = container.querySelector('#phrase-preview-07');

  function getCurrentFields() {
    const i1 = container.querySelector('#rev-i1').value;
    const i2 = container.querySelector('#rev-i2').value;
    const threshold = container.querySelector('#rev-threshold').value;
    const currentSt = state.get();
    return getPhraseFields({ ...currentSt, s6_i1: i1, s6_i2: i2, s6_threshold: threshold }, caseData, false);
  }

  function updatePhrase() {
    phrasePreview.innerHTML = assemblePhrase(getCurrentFields(), true);
  }

  function validate() {
    const i1 = container.querySelector('#rev-i1').value.trim();
    const i2 = container.querySelector('#rev-i2').value.trim();
    const threshold = container.querySelector('#rev-threshold').value.trim();
    const valid = i1.length > 0 && i2.length > 0 && threshold.length > 0;
    nextBtn.disabled = !valid;
    return valid;
  }

  function saveState() {
    state.set({
      s6_i1: container.querySelector('#rev-i1').value,
      s6_i2: container.querySelector('#rev-i2').value,
      s6_threshold: container.querySelector('#rev-threshold').value,
    });
  }

  ['#rev-i1', '#rev-i2', '#rev-threshold'].forEach(sel => {
    container.querySelector(sel).addEventListener('input', () => {
      saveState();
      updatePhrase();
      validate();
    });
  });

  updatePhrase();
  validate();
}
