import { state } from '../state.js';
import { T } from '../i18n.js';
import { renderNavFooter, escapeHtml } from './helpers.js';
import { renderProfessorPanel } from '../professor.js';
import { getBufferEconomics } from '../dossier.js';
import { makeFrequentErrorsNote } from '../softHints.js';

export async function mountScreen04(container, caseData, nav) {
  const st = state.get();

  if (st.professorMode) {
    container.appendChild(renderProfessorPanel(caseData, nav));
  }

  const titleEl = document.createElement('h1');
  titleEl.className = 'screen-title';
  titleEl.textContent = T.screenTitles[4];
  container.appendChild(titleEl);

  const subtitleEl = document.createElement('p');
  subtitleEl.className = 'screen-subtitle';
  subtitleEl.textContent = T.s4_selectBuffers;
  container.appendChild(subtitleEl);

  const microcopy = document.createElement('p');
  microcopy.className = 'screen-microcopy';
  microcopy.textContent = T.microcopy.buffer;
  container.appendChild(microcopy);

  const hintEl = document.createElement('p');
  hintEl.style.cssText = 'font-size:var(--text-sm);color:var(--color-muted);margin-bottom:var(--sp-4);';
  hintEl.textContent = T.s4_selectHint;
  container.appendChild(hintEl);

  container.appendChild(makeFrequentErrorsNote('recurso ≠ buffer · sin canal y costo (directo y de oportunidad) es contexto.'));

  // Max-reached warning
  const maxWarning = document.createElement('div');
  maxWarning.className = 'validation-msg';
  maxWarning.id = 'max-warning';
  maxWarning.textContent = T.s4_maxReached;
  container.appendChild(maxWarning);

  const bufferList = document.createElement('div');
  bufferList.className = 'buffer-list';

  // Track current selections
  let selectedBuffers = [...(st.s4_selectedBuffers || [])];
  let bufferDetails = { ...(st.s4_bufferDetails || {}) };

  const potenciaOptions = Object.entries(T.potencia).map(([v, l]) => ({ value: v, label: l }));
  const duracionOptions = Object.entries(T.duracion).map(([v, l]) => ({ value: v, label: l }));
  const costoOptions = Object.entries(T.costo).map(([v, l]) => ({ value: v, label: l }));

  caseData.availableBuffers.forEach(buf => {
    const isSelected = selectedBuffers.includes(buf.id);
    const det = bufferDetails[buf.id] || {};

    const bufCard = document.createElement('div');
    bufCard.className = `buffer-card${isSelected ? ' selected' : ''}`;
    bufCard.dataset.bufferId = buf.id;

    // Header with checkbox
    const bufHeader = document.createElement('div');
    bufHeader.className = 'buffer-card-header';
    const checkId = `buf-${buf.id}`;
    bufHeader.innerHTML = `
      <input type="checkbox" id="${checkId}" ${isSelected ? 'checked' : ''} style="width:18px;height:18px;accent-color:var(--color-navy);flex-shrink:0;">
      <label for="${checkId}" style="font-weight:var(--weight-semibold);cursor:pointer;font-size:var(--text-base);">${buf.label}</label>
    `;
    bufCard.appendChild(bufHeader);

    // Axis details (shown when selected)
    const bufDetails = document.createElement('div');
    bufDetails.className = 'buffer-card-details';

    // Cost unit badge (read-only)
    const costUnitBadge = document.createElement('p');
    costUnitBadge.style.cssText = 'font-size:var(--text-xs);color:var(--color-muted);margin-bottom:var(--sp-3);';
    costUnitBadge.innerHTML = `<strong>${T.s4_costUnit}:</strong> ${T.costUnits[buf.costUnit] || buf.costUnit} &nbsp;<span style="opacity:.6">(${T.s4_costUnitHint})</span>`;
    bufDetails.appendChild(costUnitBadge);

    // Buffer economics (from dossier, if available)
    const econ = getBufferEconomics(caseData.dossier, buf.id);
    if (econ) {
      const econBox = document.createElement('div');
      econBox.className = 'buffer-economics';
      econBox.innerHTML = `<div class="buffer-economics-title">Datos del buffer</div>`;
      const grid = document.createElement('div');
      grid.className = 'buffer-economics-grid';
      const econFields = [
        { label: 'Capacidad', value: econ.capacity },
        { label: 'Costo de activaci\u00f3n', value: econ.activationCost },
        { label: 'Agotamiento / Lead time', value: `${econ.depletion || '\u2014'} \u00b7 ${econ.leadTime || '\u2014'}` },
        { label: 'Efecto residual', value: econ.residual },
      ];
      econFields.forEach(f => {
        if (!f.value) return;
        const item = document.createElement('div');
        item.className = 'buffer-economics-item';
        item.innerHTML = `<strong>${f.label}</strong>${f.value}`;
        grid.appendChild(item);
      });
      econBox.appendChild(grid);
      bufDetails.appendChild(econBox);
    }

    // Potencia axis
    bufDetails.appendChild(createAxisGroup('potencia', buf.id, T.s4_potencia, potenciaOptions, det.potencia));
    // Duracion axis
    bufDetails.appendChild(createAxisGroup('duracion', buf.id, T.s4_duracion, duracionOptions, det.duracion));
    // Costo axis
    bufDetails.appendChild(createAxisGroup('costo', buf.id, T.s4_costo, costoOptions, det.costo));

    // ── Mecanismo del buffer (¿cómo protege?) — opcional, una línea (v1.5) ──
    const mechGroup = document.createElement('div');
    mechGroup.className = 'field-group optional-field';
    const mechTitle = Object.entries(T.bufferMechanisms)
      .map(([v]) => `${T.bufferMechanisms[v]}: ${T.bufferMechanismDefs[v]}`).join(' · ');
    const mechOptionsHtml = Object.entries(T.bufferMechanisms)
      .map(([v, l]) => `<option value="${v}"${det.mechanism === v ? ' selected' : ''}>${l}</option>`).join('');
    mechGroup.innerHTML = `
      <label class="field-label" for="mech-${buf.id}">${T.s4_mechanism}</label>
      <select id="mech-${buf.id}" class="field-select buf-mechanism" data-buf="${buf.id}" title="${escapeHtml(mechTitle)}">
        <option value="">${T.s4_mechanismNone}</option>
        ${mechOptionsHtml}
      </select>
    `;
    bufDetails.appendChild(mechGroup);

    // ── Costo de oportunidad — opcional (v1.5) ──
    const oppGroup = document.createElement('div');
    oppGroup.className = 'field-group optional-field';
    oppGroup.style.marginBottom = '0';
    const oppEcon = getBufferEconomics(caseData.dossier, buf.id);
    const oppPlaceholder = (buf.opportunityCost || (oppEcon && oppEcon.opportunityCost) || 'Caja que no inviertes, foco, velocidad, legitimidad, flexibilidad…');
    oppGroup.innerHTML = `
      <label class="field-label" for="opp-${buf.id}">${T.s4_opportunityCost}</label>
      <textarea id="opp-${buf.id}" class="field-textarea buf-opportunity" data-buf="${buf.id}" placeholder="${escapeHtml(oppPlaceholder)}">${escapeHtml(det.opportunityCost || '')}</textarea>
      <p class="field-hint">${T.s4_opportunityCostHint}</p>
    `;
    bufDetails.appendChild(oppGroup);

    bufCard.appendChild(bufDetails);
    bufferList.appendChild(bufCard);

    // Listeners para campos opcionales (no afectan la validación de avance)
    mechGroup.querySelector('select').addEventListener('change', (e) => {
      if (!bufferDetails[buf.id]) bufferDetails[buf.id] = {};
      bufferDetails[buf.id].mechanism = e.target.value;
      state.set({ s4_bufferDetails: bufferDetails });
    });
    oppGroup.querySelector('textarea').addEventListener('input', (e) => {
      if (!bufferDetails[buf.id]) bufferDetails[buf.id] = {};
      bufferDetails[buf.id].opportunityCost = e.target.value;
      state.set({ s4_bufferDetails: bufferDetails });
    });

    // Checkbox listener
    const checkbox = bufHeader.querySelector('input[type=checkbox]');
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        if (selectedBuffers.length >= 2) {
          checkbox.checked = false;
          maxWarning.classList.add('show');
          return;
        }
        selectedBuffers.push(buf.id);
        bufCard.classList.add('selected');
        maxWarning.classList.remove('show');
      } else {
        selectedBuffers = selectedBuffers.filter(id => id !== buf.id);
        bufCard.classList.remove('selected');
        maxWarning.classList.remove('show');
      }
      saveAndValidate();
    });

    // Axis option listeners (event delegation on bufDetails)
    bufDetails.addEventListener('click', (e) => {
      const axisOption = e.target.closest('.axis-option');
      if (!axisOption) return;
      const axis = axisOption.dataset.axis;
      const value = axisOption.dataset.value;
      if (!axis || !value) return;

      // Update visual selection
      bufDetails.querySelectorAll(`.axis-option[data-axis="${axis}"]`).forEach(opt => {
        opt.classList.remove('checked');
        const inp = opt.querySelector('input');
        if (inp) inp.checked = false;
      });
      axisOption.classList.add('checked');
      const inp = axisOption.querySelector('input');
      if (inp) inp.checked = true;

      // Update details
      if (!bufferDetails[buf.id]) bufferDetails[buf.id] = {};
      bufferDetails[buf.id][axis] = value;
      saveAndValidate();
    });
  });

  container.appendChild(bufferList);

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

  function saveAndValidate() {
    state.set({
      s4_selectedBuffers: selectedBuffers,
      s4_bufferDetails: bufferDetails,
    });
    validate();
  }

  function validate() {
    if (selectedBuffers.length === 0) {
      nextBtn.disabled = true;
      return false;
    }
    // All selected buffers must have all 3 axes
    const allComplete = selectedBuffers.every(bid => {
      const det = bufferDetails[bid] || {};
      return det.potencia && det.duracion && det.costo;
    });
    nextBtn.disabled = !allComplete;
    return allComplete;
  }

  validate();
}

function createAxisGroup(axisKey, bufId, axisLabel, options, currentValue) {
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
    pill.dataset.bufId = bufId;
    pill.innerHTML = `<input type="radio" name="${axisKey}-${bufId}" value="${opt.value}" ${currentValue === opt.value ? 'checked' : ''}><span>${opt.label}</span>`;
    optionsEl.appendChild(pill);
  });

  group.appendChild(optionsEl);
  return group;
}
