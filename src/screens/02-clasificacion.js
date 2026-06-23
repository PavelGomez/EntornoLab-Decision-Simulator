import { state } from '../state.js';
import { T } from '../i18n.js';
import { renderNavFooter } from './helpers.js';
import { renderProfessorPanel } from '../professor.js';
import { attachSoftHints, makeSoftHintBox, makeFrequentErrorsNote } from '../softHints.js';

export async function mountScreen02(container, caseData, nav) {
  const st = state.get();

  if (st.professorMode) {
    container.appendChild(renderProfessorPanel(caseData, nav));
  }

  const titleEl = document.createElement('h1');
  titleEl.className = 'screen-title';
  titleEl.textContent = T.screenTitles[2];
  container.appendChild(titleEl);

  const subtitleEl = document.createElement('p');
  subtitleEl.className = 'screen-subtitle';
  subtitleEl.textContent = 'Identifique el tipo de evento y la fuente principal de incertidumbre.';
  container.appendChild(subtitleEl);

  const microcopy = document.createElement('p');
  microcopy.className = 'screen-microcopy';
  microcopy.textContent = T.microcopy.evento;
  container.appendChild(microcopy);

  const card = document.createElement('div');
  card.className = 'card';

  // Event types (checkboxes)
  const eventTypesGroup = document.createElement('div');
  eventTypesGroup.className = 'field-group';
  eventTypesGroup.innerHTML = `
    <label class="field-label">${T.s2_eventType}</label>
    <p class="field-hint">${T.s2_eventTypeHint}</p>
  `;

  const optionsGrid = document.createElement('div');
  optionsGrid.className = 'options-grid';
  optionsGrid.style.marginTop = 'var(--sp-3)';

  const eventTypeKeys = ['subito-discreto', 'acumulativo', 'cascada', 'legitimidad'];
  eventTypeKeys.forEach(key => {
    const optCard = document.createElement('div');
    optCard.className = 'option-card';
    const inputId = `evt-${key}`;
    const checked = st.s2_eventTypes.includes(key) ? 'checked' : '';
    optCard.innerHTML = `
      <input type="checkbox" id="${inputId}" value="${key}" ${checked}>
      <label for="${inputId}">${T.eventTypes[key]}</label>
    `;
    optionsGrid.appendChild(optCard);
  });

  eventTypesGroup.appendChild(optionsGrid);
  card.appendChild(eventTypesGroup);

  // Demarcation textarea
  const demarcGroup = document.createElement('div');
  demarcGroup.className = 'field-group';
  demarcGroup.innerHTML = `
    <label class="field-label" for="demarcation">${T.s2_demarcation}</label>
    <textarea id="demarcation" class="field-textarea" placeholder="Explique el criterio de demarcación...">${st.s2_demarcation || ''}</textarea>
    <p class="field-hint">${T.s2_demarcationHint}</p>
  `;
  // Pistas blandas (no bloquean) + nota de error frecuente
  const demarcHintBox = makeSoftHintBox();
  demarcGroup.appendChild(demarcHintBox);
  demarcGroup.appendChild(makeFrequentErrorsNote('factor ≠ evento · nombra el hecho o umbral, no el clima general.'));
  card.appendChild(demarcGroup);

  // Uncertainty source (radio)
  const uncertaintyGroup = document.createElement('div');
  uncertaintyGroup.className = 'field-group';
  uncertaintyGroup.innerHTML = `<label class="field-label">${T.s2_uncertainty}</label>
    <p class="field-hint">${T.microcopy.incertidumbre}</p>`;

  const uncertaintyGrid = document.createElement('div');
  uncertaintyGrid.className = 'options-grid';
  uncertaintyGrid.style.marginTop = 'var(--sp-3)';

  // Only show uncertainty sources available for this case
  const availableUncertainty = caseData.uncertaintySources || Object.keys(T.uncertaintySources);
  availableUncertainty.forEach(key => {
    const optCard = document.createElement('div');
    optCard.className = 'option-card';
    const inputId = `unc-${key}`;
    const checked = st.s2_uncertaintySource === key ? 'checked' : '';
    optCard.innerHTML = `
      <input type="radio" id="${inputId}" name="uncertainty" value="${key}" ${checked}>
      <label for="${inputId}">${T.uncertaintySources[key] || key}</label>
    `;
    uncertaintyGrid.appendChild(optCard);
  });

  uncertaintyGroup.appendChild(uncertaintyGrid);
  card.appendChild(uncertaintyGroup);

  // Validation message
  const validMsg = document.createElement('p');
  validMsg.className = 'validation-msg';
  validMsg.id = 'val-msg-02';
  validMsg.textContent = 'Complete todos los campos para continuar.';
  card.appendChild(validMsg);

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
    const checkedTypes = Array.from(container.querySelectorAll('input[type=checkbox]:checked')).map(i => i.value);
    const demarcText = container.querySelector('#demarcation').value.trim();
    const unchecked = container.querySelector('input[name=uncertainty]:checked');
    const valid = checkedTypes.length > 0 && demarcText.length > 0 && !!unchecked;
    nextBtn.disabled = !valid;
    return valid;
  }

  function saveState() {
    const checkedTypes = Array.from(container.querySelectorAll('input[type=checkbox]:checked')).map(i => i.value);
    const demarcText = container.querySelector('#demarcation').value;
    const uncEl = container.querySelector('input[name=uncertainty]:checked');
    state.set({
      s2_eventTypes: checkedTypes,
      s2_demarcation: demarcText,
      s2_uncertaintySource: uncEl ? uncEl.value : '',
    });
  }

  // Wire up event listeners
  container.querySelectorAll('input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', () => { saveState(); validate(); });
  });

  container.querySelector('#demarcation').addEventListener('input', () => { saveState(); validate(); });
  attachSoftHints(container.querySelector('#demarcation'), ['evento', 'incertidumbre'], demarcHintBox);

  container.querySelectorAll('input[name=uncertainty]').forEach(rb => {
    rb.addEventListener('change', () => { saveState(); validate(); });
  });

  validate();
}
