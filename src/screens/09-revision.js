import { state } from '../state.js';
import { T } from '../i18n.js';
import { renderNavFooter } from './helpers.js';
import { renderProfessorPanel } from '../professor.js';
import { assemblePhrase, getPhraseFields, isPhraseComplete } from '../ebtaPhrase.js';

export async function mountScreen09(container, caseData, nav) {
  const st = state.get();

  if (st.professorMode) {
    container.appendChild(renderProfessorPanel(caseData, nav));
  }

  const titleEl = document.createElement('h1');
  titleEl.className = 'screen-title';
  titleEl.textContent = T.screenTitles[9];
  container.appendChild(titleEl);

  const subtitleEl = document.createElement('p');
  subtitleEl.className = 'screen-subtitle';
  subtitleEl.textContent = T.s9_hint;
  container.appendChild(subtitleEl);

  // Show the inject for reference
  const inject = caseData.injects.find(i => i.id === st.selectedInjectId) || caseData.injects[0];
  const injectRef = document.createElement('div');
  injectRef.className = 'inject-card';
  injectRef.style.marginBottom = 'var(--sp-4)';
  injectRef.innerHTML = `
    <div class="inject-label">${T.s8_title}</div>
    <div class="inject-text">${inject.text}</div>
  `;
  container.appendChild(injectRef);

  // Original phrase reference
  const origPhraseEl = document.createElement('div');
  origPhraseEl.className = 'reference-phrase';
  origPhraseEl.innerHTML = `
    <div class="reference-phrase-title">Frase E-BTA/R original</div>
    ${assemblePhrase(getPhraseFields(st, caseData, false), true)}
  `;
  container.appendChild(origPhraseEl);

  // Supuestos card
  const supuestosCard = document.createElement('div');
  supuestosCard.className = 'card';
  supuestosCard.innerHTML = `<div class="card-header"><h2 class="card-title">${T.s9_supuestos}</h2></div>`;

  const supuestosGrid = document.createElement('div');
  supuestosGrid.className = 'supuesto-grid';

  // Mantiene
  const mantCard = document.createElement('div');
  mantCard.className = 'supuesto-card supuesto-mantiene';
  mantCard.innerHTML = `
    <div class="field-group" style="margin:0">
      <label class="field-label" for="maintains" style="color:var(--color-success)">${T.s9_maintains}</label>
      <textarea id="maintains" class="field-textarea" placeholder="${T.s9_maintainsHint}">${st.s9_maintains || ''}</textarea>
      <p class="field-hint">${T.s9_maintainsHint}</p>
    </div>
  `;
  supuestosGrid.appendChild(mantCard);

  // Abandona
  const abandCard = document.createElement('div');
  abandCard.className = 'supuesto-card supuesto-abandona';
  abandCard.innerHTML = `
    <div class="field-group" style="margin:0">
      <label class="field-label" for="abandons" style="color:var(--color-error)">${T.s9_abandons}</label>
      <textarea id="abandons" class="field-textarea" placeholder="${T.s9_abandonsHint}">${st.s9_abandons || ''}</textarea>
      <p class="field-hint">${T.s9_abandonsHint}</p>
    </div>
  `;
  supuestosGrid.appendChild(abandCard);

  // Invierte
  const invertCard = document.createElement('div');
  invertCard.className = 'supuesto-card supuesto-invierte';
  invertCard.innerHTML = `
    <div class="field-group" style="margin:0">
      <label class="field-label" for="inverts" style="color:var(--color-accent)">${T.s9_inverts}</label>
      <textarea id="inverts" class="field-textarea" placeholder="${T.s9_invertsHint}">${st.s9_inverts || ''}</textarea>
      <p class="field-hint">${T.s9_invertsHint}</p>
    </div>
  `;
  supuestosGrid.appendChild(invertCard);

  supuestosCard.appendChild(supuestosGrid);
  container.appendChild(supuestosCard);

  // Revised phrase builder
  const revisedCard = document.createElement('div');
  revisedCard.className = 'card';
  revisedCard.innerHTML = `<div class="card-header"><h2 class="card-title">${T.s9_newPhrase}</h2><p style="font-size:var(--text-sm);color:var(--color-muted);margin-top:var(--sp-2)">${T.s9_newPhraseHint}</p></div>`;

  // Live revised phrase preview
  const revisedPhrasePreview = document.createElement('div');
  revisedPhrasePreview.className = 'phrase-preview';
  revisedPhrasePreview.style.marginBottom = 'var(--sp-6)';
  revisedCard.appendChild(revisedPhrasePreview);

  const revDivider = document.createElement('hr');
  revDivider.className = 'divider';
  revisedCard.appendChild(revDivider);

  // --- Event types (revised) ---
  const revEventGroup = buildRevEventTypes(st, caseData);
  revisedCard.appendChild(revEventGroup.el);

  // --- Uncertainty source (revised) ---
  const revUncGroup = buildRevUncertainty(st, caseData);
  revisedCard.appendChild(revUncGroup.el);

  // --- Dominant channel (revised) ---
  const revChannelGroup = buildRevChannel(st);
  revisedCard.appendChild(revChannelGroup.el);

  // --- Protects (revised) ---
  const revProtectsGroup = document.createElement('div');
  revProtectsGroup.className = 'field-group';
  revProtectsGroup.innerHTML = `
    <label class="field-label" for="rev-protects">${T.s5_protects} (revisado)</label>
    <textarea id="rev-protects" class="field-textarea">${st.s9_revisedProtects || st.s5_protects || ''}</textarea>
  `;
  revisedCard.appendChild(revProtectsGroup);

  // --- Sacrifices (revised) ---
  const revSacrificesGroup = document.createElement('div');
  revSacrificesGroup.className = 'field-group';
  revSacrificesGroup.innerHTML = `
    <label class="field-label" for="rev-sacrifices">${T.s5_sacrifices} (revisado)</label>
    <textarea id="rev-sacrifices" class="field-textarea">${st.s9_revisedSacrifices || st.s5_sacrifices || ''}</textarea>
  `;
  revisedCard.appendChild(revSacrificesGroup);

  // --- Buffer board (revised) ---
  const revBufferSection = buildRevBuffers(st, caseData);
  revisedCard.appendChild(revBufferSection.el);

  // --- I1 (revised) ---
  const revI1Group = document.createElement('div');
  revI1Group.className = 'field-group';
  revI1Group.innerHTML = `
    <label class="field-label" for="rev-i1-09">${T.s6_i1} (revisado)</label>
    <input type="text" id="rev-i1-09" class="field-input" value="${st.s9_revisedI1 || st.s6_i1 || ''}">
  `;
  revisedCard.appendChild(revI1Group);

  // --- I2 (revised) ---
  const revI2Group = document.createElement('div');
  revI2Group.className = 'field-group';
  revI2Group.innerHTML = `
    <label class="field-label" for="rev-i2-09">${T.s6_i2} (revisado)</label>
    <input type="text" id="rev-i2-09" class="field-input" value="${st.s9_revisedI2 || st.s6_i2 || ''}">
  `;
  revisedCard.appendChild(revI2Group);

  // --- Threshold (revised) ---
  const revThresholdGroup = document.createElement('div');
  revThresholdGroup.className = 'field-group';
  revThresholdGroup.innerHTML = `
    <label class="field-label" for="rev-threshold-09">${T.s6_threshold} (revisado)</label>
    <textarea id="rev-threshold-09" class="field-textarea">${st.s9_revisedThreshold || st.s6_threshold || ''}</textarea>
  `;
  revisedCard.appendChild(revThresholdGroup);

  container.appendChild(revisedCard);

  // Nav footer
  const footer = renderNavFooter({
    showBack: false, // post-inject, no back
    onBack: nav.onBack,
    onNext: nav.onNext,
    nextDisabled: true,
    nextLabel: T.continue,
  });
  container.appendChild(footer);

  const nextBtn = footer.querySelector('.btn-primary');

  function getRevisedBuffers() {
    return revBufferSection.getState();
  }

  function getRevisedFields() {
    const currentSt = state.get();
    const revBuffers = getRevisedBuffers();
    return {
      eventTypes: revEventGroup.getValues().length > 0 ? revEventGroup.getValues() : currentSt.s2_eventTypes,
      uncertaintySource: revUncGroup.getValue() || currentSt.s2_uncertaintySource,
      dominantChannel: revChannelGroup.getValue() || currentSt.s3_dominantChannel,
      selectedBuffers: revBuffers.selectedBuffers.length > 0 ? revBuffers.selectedBuffers : currentSt.s4_selectedBuffers,
      bufferDetails: Object.keys(revBuffers.bufferDetails).length > 0 ? revBuffers.bufferDetails : currentSt.s4_bufferDetails,
      caseData,
      protects: container.querySelector('#rev-protects').value || currentSt.s5_protects,
      sacrifices: container.querySelector('#rev-sacrifices').value || currentSt.s5_sacrifices,
      i1: container.querySelector('#rev-i1-09').value || currentSt.s6_i1,
      i2: container.querySelector('#rev-i2-09').value || currentSt.s6_i2,
      threshold: container.querySelector('#rev-threshold-09').value || currentSt.s6_threshold,
    };
  }

  function updateRevisedPhrase() {
    revisedPhrasePreview.innerHTML = assemblePhrase(getRevisedFields(), true);
  }

  function validate() {
    const maintains = container.querySelector('#maintains').value.trim();
    const abandons = container.querySelector('#abandons').value.trim();
    const inverts = container.querySelector('#inverts').value.trim();
    const supuestosOk = maintains.length > 0 && abandons.length > 0 && inverts.length > 0;

    const revisedFields = getRevisedFields();
    const phraseOk = isPhraseComplete(revisedFields);

    nextBtn.disabled = !(supuestosOk && phraseOk);
    return supuestosOk && phraseOk;
  }

  function saveState() {
    const revBuffers = getRevisedBuffers();
    state.set({
      s9_maintains: container.querySelector('#maintains').value,
      s9_abandons: container.querySelector('#abandons').value,
      s9_inverts: container.querySelector('#inverts').value,
      s9_revisedEventTypes: revEventGroup.getValues(),
      s9_revisedUncertaintySource: revUncGroup.getValue(),
      s9_revisedDominantChannel: revChannelGroup.getValue(),
      s9_revisedProtects: container.querySelector('#rev-protects').value,
      s9_revisedSacrifices: container.querySelector('#rev-sacrifices').value,
      s9_revisedSelectedBuffers: revBuffers.selectedBuffers,
      s9_revisedBufferDetails: revBuffers.bufferDetails,
      s9_revisedI1: container.querySelector('#rev-i1-09').value,
      s9_revisedI2: container.querySelector('#rev-i2-09').value,
      s9_revisedThreshold: container.querySelector('#rev-threshold-09').value,
    });
  }

  function onAnyChange() {
    saveState();
    updateRevisedPhrase();
    validate();
  }

  // Supuestos
  ['#maintains', '#abandons', '#inverts'].forEach(sel => {
    container.querySelector(sel).addEventListener('input', onAnyChange);
  });

  // Revised phrase fields
  ['#rev-protects', '#rev-sacrifices'].forEach(sel => {
    container.querySelector(sel).addEventListener('input', onAnyChange);
  });
  ['#rev-i1-09', '#rev-i2-09'].forEach(sel => {
    container.querySelector(sel).addEventListener('input', onAnyChange);
  });
  ['#rev-threshold-09'].forEach(sel => {
    container.querySelector(sel).addEventListener('input', onAnyChange);
  });

  // Sub-components register their own change callbacks
  revEventGroup.onChange(onAnyChange);
  revUncGroup.onChange(onAnyChange);
  revChannelGroup.onChange(onAnyChange);
  revBufferSection.onChange(onAnyChange);

  updateRevisedPhrase();
  validate();
}

// ---- Sub-builders ----

function buildRevEventTypes(st, caseData) {
  const current = st.s9_revisedEventTypes.length > 0 ? st.s9_revisedEventTypes : [...st.s2_eventTypes];
  let values = [...current];
  let _onChange = null;

  const el = document.createElement('div');
  el.className = 'field-group';
  el.innerHTML = `<label class="field-label">${T.s2_eventType} (revisado)</label>`;

  const grid = document.createElement('div');
  grid.className = 'options-grid';
  grid.style.marginTop = 'var(--sp-2)';

  const eventTypeKeys = ['subito-discreto', 'acumulativo', 'cascada', 'legitimidad'];
  eventTypeKeys.forEach(key => {
    const optCard = document.createElement('div');
    optCard.className = 'option-card';
    const checked = values.includes(key) ? 'checked' : '';
    optCard.innerHTML = `
      <input type="checkbox" id="rev-evt-${key}" value="${key}" ${checked}>
      <label for="rev-evt-${key}">${T.eventTypes[key]}</label>
    `;
    const cb = optCard.querySelector('input');
    cb.addEventListener('change', () => {
      values = Array.from(el.querySelectorAll('input[type=checkbox]:checked')).map(i => i.value);
      if (_onChange) _onChange();
    });
    grid.appendChild(optCard);
  });

  el.appendChild(grid);

  return {
    el,
    getValues: () => values,
    onChange: (fn) => { _onChange = fn; },
  };
}

function buildRevUncertainty(st, caseData) {
  const current = st.s9_revisedUncertaintySource || st.s2_uncertaintySource;
  let value = current;
  let _onChange = null;

  const el = document.createElement('div');
  el.className = 'field-group';
  el.innerHTML = `<label class="field-label">${T.s2_uncertainty} (revisado)</label>`;

  const grid = document.createElement('div');
  grid.className = 'options-grid';
  grid.style.marginTop = 'var(--sp-2)';

  const availableUncertainty = caseData.uncertaintySources || Object.keys(T.uncertaintySources);
  availableUncertainty.forEach(key => {
    const optCard = document.createElement('div');
    optCard.className = 'option-card';
    const checked = value === key ? 'checked' : '';
    optCard.innerHTML = `
      <input type="radio" id="rev-unc-${key}" name="rev-uncertainty" value="${key}" ${checked}>
      <label for="rev-unc-${key}">${T.uncertaintySources[key] || key}</label>
    `;
    const rb = optCard.querySelector('input');
    rb.addEventListener('change', () => {
      value = rb.value;
      if (_onChange) _onChange();
    });
    grid.appendChild(optCard);
  });

  el.appendChild(grid);

  return {
    el,
    getValue: () => value,
    onChange: (fn) => { _onChange = fn; },
  };
}

function buildRevChannel(st) {
  const current = st.s9_revisedDominantChannel || st.s3_dominantChannel;
  let value = current;
  let _onChange = null;

  const el = document.createElement('div');
  el.className = 'field-group';

  const label = document.createElement('label');
  label.className = 'field-label';
  label.setAttribute('for', 'rev-channel');
  label.textContent = `${T.s3_dominantChannel} (revisado)`;
  el.appendChild(label);

  const select = document.createElement('select');
  select.id = 'rev-channel';
  select.className = 'field-select';
  select.innerHTML = '<option value="">— Seleccione —</option>';
  Object.entries(T.channels).forEach(([val, lbl]) => {
    const opt = document.createElement('option');
    opt.value = val;
    opt.textContent = lbl;
    if (val === value) opt.selected = true;
    select.appendChild(opt);
  });
  select.addEventListener('change', () => {
    value = select.value;
    if (_onChange) _onChange();
  });
  el.appendChild(select);

  return {
    el,
    getValue: () => value,
    onChange: (fn) => { _onChange = fn; },
  };
}

function buildRevBuffers(st, caseData) {
  const initSelected = st.s9_revisedSelectedBuffers.length > 0 ? [...st.s9_revisedSelectedBuffers] : [...st.s4_selectedBuffers];
  const initDetails = Object.keys(st.s9_revisedBufferDetails).length > 0 ? { ...st.s9_revisedBufferDetails } : { ...st.s4_bufferDetails };

  let selectedBuffers = [...initSelected];
  let bufferDetails = JSON.parse(JSON.stringify(initDetails));
  let _onChange = null;

  const el = document.createElement('div');
  el.className = 'field-group';
  el.innerHTML = `<label class="field-label">Buffer(s) (revisado — seleccione hasta 2)</label>`;

  const bufList = document.createElement('div');
  bufList.className = 'buffer-list';
  bufList.style.marginTop = 'var(--sp-2)';

  const potenciaOptions = Object.entries(T.potencia).map(([v, l]) => ({ value: v, label: l }));
  const duracionOptions = Object.entries(T.duracion).map(([v, l]) => ({ value: v, label: l }));
  const costoOptions = Object.entries(T.costo).map(([v, l]) => ({ value: v, label: l }));

  caseData.availableBuffers.forEach(buf => {
    const isSelected = selectedBuffers.includes(buf.id);
    const det = bufferDetails[buf.id] || {};

    const bufCard = document.createElement('div');
    bufCard.className = `buffer-card${isSelected ? ' selected' : ''}`;
    bufCard.dataset.bufferId = buf.id;

    const bufHeader = document.createElement('div');
    bufHeader.className = 'buffer-card-header';
    bufHeader.innerHTML = `
      <input type="checkbox" id="rev-buf-${buf.id}" ${isSelected ? 'checked' : ''} style="width:18px;height:18px;accent-color:var(--color-navy);flex-shrink:0;">
      <label for="rev-buf-${buf.id}" style="font-weight:var(--weight-semibold);cursor:pointer;">${buf.label}</label>
    `;
    bufCard.appendChild(bufHeader);

    const bufDetails = document.createElement('div');
    bufDetails.className = 'buffer-card-details';

    const costBadge = document.createElement('p');
    costBadge.style.cssText = 'font-size:var(--text-xs);color:var(--color-muted);margin-bottom:var(--sp-3);';
    costBadge.innerHTML = `<strong>${T.s4_costUnit}:</strong> ${T.costUnits[buf.costUnit] || buf.costUnit}`;
    bufDetails.appendChild(costBadge);

    bufDetails.appendChild(createRevAxisGroup('potencia', buf.id, T.s4_potencia, potenciaOptions, det.potencia, 'rev9'));
    bufDetails.appendChild(createRevAxisGroup('duracion', buf.id, T.s4_duracion, duracionOptions, det.duracion, 'rev9'));
    bufDetails.appendChild(createRevAxisGroup('costo', buf.id, T.s4_costo, costoOptions, det.costo, 'rev9'));

    bufCard.appendChild(bufDetails);
    bufList.appendChild(bufCard);

    const checkbox = bufHeader.querySelector('input[type=checkbox]');
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        if (selectedBuffers.length >= 2) {
          checkbox.checked = false;
          return;
        }
        selectedBuffers.push(buf.id);
        bufCard.classList.add('selected');
      } else {
        selectedBuffers = selectedBuffers.filter(id => id !== buf.id);
        bufCard.classList.remove('selected');
      }
      if (_onChange) _onChange();
    });

    bufDetails.addEventListener('click', (e) => {
      const axisOption = e.target.closest('.axis-option');
      if (!axisOption) return;
      const axis = axisOption.dataset.axis;
      const value = axisOption.dataset.value;
      if (!axis || !value) return;

      bufDetails.querySelectorAll(`.axis-option[data-axis="${axis}"]`).forEach(opt => {
        opt.classList.remove('checked');
        const inp = opt.querySelector('input');
        if (inp) inp.checked = false;
      });
      axisOption.classList.add('checked');
      const inp = axisOption.querySelector('input');
      if (inp) inp.checked = true;

      if (!bufferDetails[buf.id]) bufferDetails[buf.id] = {};
      bufferDetails[buf.id][axis] = value;
      if (_onChange) _onChange();
    });
  });

  el.appendChild(bufList);

  return {
    el,
    getState: () => ({ selectedBuffers, bufferDetails }),
    onChange: (fn) => { _onChange = fn; },
  };
}

function createRevAxisGroup(axisKey, bufId, axisLabel, options, currentValue, prefix = '') {
  const group = document.createElement('div');
  group.className = 'axis-group';

  const label = document.createElement('div');
  label.className = 'axis-label';
  label.textContent = axisLabel;
  group.appendChild(label);

  const optionsEl = document.createElement('div');
  optionsEl.className = 'axis-options';

  options.forEach(opt => {
    const pill = document.createElement('div');
    pill.className = `axis-option${currentValue === opt.value ? ' checked' : ''}`;
    pill.dataset.axis = axisKey;
    pill.dataset.value = opt.value;
    pill.innerHTML = `<input type="radio" name="${prefix}-${axisKey}-${bufId}" value="${opt.value}" ${currentValue === opt.value ? 'checked' : ''}><span>${opt.label}</span>`;
    optionsEl.appendChild(pill);
  });

  group.appendChild(optionsEl);
  return group;
}
