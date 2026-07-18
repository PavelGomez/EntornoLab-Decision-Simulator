import { state } from '../state.js';
import { T } from '../i18n.js';
import { renderNavFooter, escapeHtml } from './helpers.js';
import { renderProfessorPanel } from '../professor.js';
import { assemblePhrase, isActionComplete, isAspirationalAction } from '../ebtaPhrase.js';

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

  // ── Tarjeta de acción táctica (Qué / Quién / Primer hito / Cuándo / No haré) ──
  const actionCard = document.createElement('div');
  actionCard.className = 'card';
  actionCard.innerHTML = `
    <div class="card-header">
      <h2 class="card-title" title="${escapeHtml(T.s6_actionTooltip)}">${T.s6_actionCardTitle}</h2>
    </div>
    <div class="field-group">
      <label class="field-label" for="s6-action">${T.s6_action}</label>
      <textarea id="s6-action" class="field-textarea" placeholder="Ej: constituir un fideicomiso parcial documentado">${escapeHtml(st.s6_action || '')}</textarea>
      <p class="field-hint">${T.s6_actionHint}</p>
      <div id="s6-aspirational" class="soft-hint" style="display:none;color:var(--color-warning,#a15c00);margin-top:6px;font-size:13px"></div>
    </div>
    <div class="field-group">
      <label class="field-label" for="s6-owner">${T.s6_owner}</label>
      <input type="text" id="s6-owner" class="field-input" placeholder="Ej: Finanzas y Legal" value="${escapeHtml(st.s6_owner || '')}">
      <p class="field-hint">${T.s6_ownerHint}</p>
    </div>
    <div class="field-group">
      <label class="field-label" for="s6-milestone">${T.s6_firstMilestone}</label>
      <input type="text" id="s6-milestone" class="field-input" placeholder="Ej: obtener carta bancaria por el saldo" value="${escapeHtml(st.s6_firstMilestone || '')}">
      <p class="field-hint">${T.s6_firstMilestoneHint}</p>
    </div>
    <div class="field-group">
      <label class="field-label" for="s6-deadline">${T.s6_deadline}</label>
      <input type="text" id="s6-deadline" class="field-input" placeholder="Ej: antes del día 30" value="${escapeHtml(st.s6_deadline || '')}">
      <p class="field-hint">${T.s6_deadlineHint}</p>
    </div>
    <div class="field-group" style="margin-bottom:0">
      <label class="field-label" for="s6-rejalt">${T.s6_rejectedAlt}</label>
      <textarea id="s6-rejalt" class="field-textarea" placeholder="Ej: esperar a que se publique la circular sin cubrir el saldo">${escapeHtml(st.s6_rejectedAlt || '')}</textarea>
      <p class="field-hint">${T.s6_rejectedAltHint}</p>
    </div>
  `;
  container.appendChild(actionCard);

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
  const el = (sel) => container.querySelector(sel);

  function getCurrentFields() {
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
      residualRisk: currentSt.s5_residualRisk,
      action: el('#s6-action').value,
      owner: el('#s6-owner').value,
      firstMilestone: el('#s6-milestone').value,
      deadline: el('#s6-deadline').value,
      rejectedAlt: el('#s6-rejalt').value,
      // I1/I2/umbral se capturan en la Pantalla 7; para la vista previa se leen del estado.
      i1: currentSt.s6_i1,
      i2: currentSt.s6_i2,
      threshold: currentSt.s6_threshold,
    };
  }

  function updatePhrase() {
    phrasePreview.innerHTML = assemblePhrase(getCurrentFields(), true);
  }

  function updateAspirationalHint() {
    const box = el('#s6-aspirational');
    const val = el('#s6-action').value;
    const first = String(val || '').trim().split(/[\s,;.:]+/)[0] || '';
    if (val.trim() && isAspirationalAction(val)) {
      box.textContent = T.s6_aspirationalHint.replace('%V', first);
      box.style.display = '';
    } else {
      box.style.display = 'none';
      box.textContent = '';
    }
  }

  function validate() {
    const complete = isActionComplete(getCurrentFields());
    nextBtn.disabled = !complete;
    return complete;
  }

  function saveState() {
    state.set({
      s6_action: el('#s6-action').value,
      s6_owner: el('#s6-owner').value,
      s6_firstMilestone: el('#s6-milestone').value,
      s6_deadline: el('#s6-deadline').value,
      s6_rejectedAlt: el('#s6-rejalt').value,
    });
  }

  ['#s6-action', '#s6-owner', '#s6-milestone', '#s6-deadline', '#s6-rejalt'].forEach(sel => {
    container.querySelector(sel).addEventListener('input', () => {
      saveState();
      updateAspirationalHint();
      updatePhrase();
      validate();
    });
  });

  // Initial render
  updateAspirationalHint();
  updatePhrase();
  validate();
}
