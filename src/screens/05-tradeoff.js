import { state } from '../state.js';
import { T } from '../i18n.js';
import { renderNavFooter, escapeHtml } from './helpers.js';
import { renderProfessorPanel } from '../professor.js';
import { attachSoftHints, makeSoftHintBox } from '../softHints.js';

// Términos que suelen señalar que se está tratando un DEBER como moneda de
// cambio (piso, no sacrificio). Alimenta una pista blanda, nunca bloquea.
const DUTY_FLAGS = /represalia|denunciante|whistlebl|atenci[oó]n inmediata|cumplimiento|normativa|deber de cuidado|seguridad de (?:los|las|el|la)/i;

export async function mountScreen05(container, caseData, nav) {
  const st = state.get();
  const isCasoC = (caseData.order === 'C');

  if (st.professorMode) {
    container.appendChild(renderProfessorPanel(caseData, nav));
  }

  const titleEl = document.createElement('h1');
  titleEl.className = 'screen-title';
  titleEl.textContent = T.screenTitles[5];
  container.appendChild(titleEl);

  const subtitleEl = document.createElement('p');
  subtitleEl.className = 'screen-subtitle';
  subtitleEl.textContent = 'Declare qué protege, qué sacrifica, quién paga, cuándo, hasta dónde es reversible, qué piso no se negocia y qué riesgo queda.';
  container.appendChild(subtitleEl);

  const microcopy = document.createElement('p');
  microcopy.className = 'screen-microcopy';
  microcopy.textContent = T.microcopy.tradeoff;
  container.appendChild(microcopy);

  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="field-group">
      <label class="field-label" for="protects">${T.s5_protects}</label>
      <textarea id="protects" class="field-textarea" placeholder="El activo, capacidad o relación que se pone a resguardo...">${escapeHtml(st.s5_protects || '')}</textarea>
      <p class="field-hint">${T.s5_protectsHint}</p>
    </div>
    <div class="field-group">
      <label class="field-label" for="sacrifices">${T.s5_sacrifices}</label>
      <textarea id="sacrifices" class="field-textarea" placeholder="Lo que se cede o expone para proteger lo anterior...">${escapeHtml(st.s5_sacrifices || '')}</textarea>
      <p class="field-hint">${T.s5_sacrificesHint}</p>
      <div id="s5-ethical" class="soft-hint" style="display:none;color:var(--color-warning,#a15c00);margin-top:6px;font-size:13px"></div>
    </div>
    <div class="field-group">
      <label class="field-label" for="cost-bearer">${T.s5_costBearer}</label>
      <input type="text" id="cost-bearer" class="field-input" placeholder="Ej: tesorería; no los repartidores" value="${escapeHtml(st.s5_costBearer || '')}">
      <p class="field-hint">${T.s5_costBearerHint}</p>
    </div>
    <div class="field-group">
      <label class="field-label" for="cost-timing">${T.s5_costTiming}</label>
      <input type="text" id="cost-timing" class="field-input" placeholder="Ej: hoy, en tesorería; o al activar" value="${escapeHtml(st.s5_costTiming || '')}">
      <p class="field-hint">${T.s5_costTimingHint}</p>
    </div>
    <div class="field-group">
      <label class="field-label" for="reversibility">${T.s5_reversibility}</label>
      <input type="text" id="reversibility" class="field-input" placeholder="Ej: reversible solo hasta emitir la orden" value="${escapeHtml(st.s5_reversibility || '')}">
      <p class="field-hint">${T.s5_reversibilityHint}</p>
    </div>
  `;
  container.appendChild(card);

  // Piso no negociable (con aviso reforzado en Caso C)
  const floorCard = document.createElement('div');
  floorCard.className = 'card';
  const casoCNotice = isCasoC
    ? `<div class="soft-hint" style="background:rgba(161,92,0,.08);border-left:3px solid var(--color-warning,#a15c00);padding:10px 12px;border-radius:6px;margin-bottom:12px;font-size:13px;line-height:1.5">${escapeHtml(T.s5_floorCasoC)}</div>`
    : '';
  floorCard.innerHTML = `
    ${casoCNotice}
    <div class="field-group" style="margin-bottom:0">
      <label class="field-label" for="floor">${T.s5_floor}</label>
      <textarea id="floor" class="field-textarea" placeholder="${isCasoC ? 'Nombra el piso: atención inmediata, no represalia, cumplimiento vigente…' : 'Un deber que no se negocia; o «no aplica» y por qué'}">${escapeHtml(st.s5_floor || '')}</textarea>
      <p class="field-hint">${T.s5_floorHint}</p>
    </div>
  `;
  container.appendChild(floorCard);

  // Riesgo residual (Z)
  const residualCard = document.createElement('div');
  residualCard.className = 'card';
  residualCard.innerHTML = `
    <div class="field-group" style="margin-bottom:0">
      <label class="field-label" for="residual-risk">${T.s5_residualRisk}</label>
      <textarea id="residual-risk" class="field-textarea" placeholder="El riesgo que permanece incluso si la decisión funciona...">${escapeHtml(st.s5_residualRisk || '')}</textarea>
      <p class="field-hint">${T.s5_residualRiskHint}</p>
    </div>
  `;
  container.appendChild(residualCard);

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
  const val = (sel) => container.querySelector(sel).value;

  function validate() {
    const ok = ['#protects', '#sacrifices', '#cost-bearer', '#cost-timing', '#reversibility', '#floor', '#residual-risk']
      .every(sel => val(sel).trim().length > 0);
    nextBtn.disabled = !ok;
    return ok;
  }

  function updateEthicalHint() {
    const box = container.querySelector('#s5-ethical');
    if (DUTY_FLAGS.test(val('#sacrifices'))) {
      box.textContent = T.s5_floorEthicalHint;
      box.style.display = '';
    } else {
      box.style.display = 'none';
      box.textContent = '';
    }
  }

  function saveState() {
    state.set({
      s5_protects: val('#protects'),
      s5_sacrifices: val('#sacrifices'),
      s5_costBearer: val('#cost-bearer'),
      s5_costTiming: val('#cost-timing'),
      s5_reversibility: val('#reversibility'),
      s5_floor: val('#floor'),
      s5_residualRisk: val('#residual-risk'),
    });
  }

  ['#protects', '#sacrifices', '#cost-bearer', '#cost-timing', '#reversibility', '#floor', '#residual-risk'].forEach(sel => {
    container.querySelector(sel).addEventListener('input', () => {
      saveState();
      updateEthicalHint();
      validate();
    });
  });

  // Pistas blandas globales (p. ej. "cisne negro" → rinoceronte gris)
  ['#protects', '#sacrifices', '#residual-risk'].forEach(sel => {
    const el = container.querySelector(sel);
    const box = makeSoftHintBox();
    el.parentElement.appendChild(box);
    attachSoftHints(el, ['evento'], box);
  });

  updateEthicalHint();
  validate();
}
