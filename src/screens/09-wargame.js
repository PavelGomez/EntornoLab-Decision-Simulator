/*
 * Ronda de réplica (modalidad Wargame) — se ejecuta tras la Pantalla 9,
 * conservando el no-retorno (solo se avanza). Tres pasos:
 *   1. "Anticipa la réplica" — el alumno escribe cómo reaccionará el actor.
 *   2. "Réplica del actor" — el facilitador la revela (texto pre-escrito:
 *      campo opcional `replies` o, si no existe, un inject distinto al usado).
 *   3. "Segunda revisión" — supuestos + clasificación de bucle.
 * Todo va al PDF rotulado "Ronda de réplica (wargame)". Sin IA, sin puntaje.
 */
import { state } from '../state.js';
import { T } from '../i18n.js';
import { renderNavFooter } from './helpers.js';
import { renderProfessorPanel } from '../professor.js';
import { LOOP_DEFS } from '../learning/content.js';

// Elige la réplica pre-escrita: usa `replies` si existe; si no, reutiliza un
// inject distinto al que ya se reveló.
export function pickReply(caseData, st) {
  if (Array.isArray(caseData.replies) && caseData.replies.length) {
    return caseData.replies[0];
  }
  const others = (caseData.injects || []).filter(i => i.id !== st.selectedInjectId);
  return others[0] || (caseData.injects || [])[0] || { id: 'reply', text: '' };
}

export async function mountWargameRound(container, caseData, nav) {
  const st = state.get();

  if (st.professorMode) {
    container.appendChild(renderProfessorPanel(caseData, nav));
  }

  const titleEl = document.createElement('h1');
  titleEl.className = 'screen-title';
  titleEl.innerHTML = '<span class="wargame-badge">Ronda de réplica (wargame)</span><br>El actor responde a tu decisión';
  container.appendChild(titleEl);

  const subtitleEl = document.createElement('p');
  subtitleEl.className = 'screen-subtitle';
  subtitleEl.textContent = 'Pensamiento de segundo orden: el otro también juega. Anticipa su réplica, recíbela y vuelve a revisar. No se vuelve atrás.';
  container.appendChild(subtitleEl);

  // ---- Paso 1: Anticipa la réplica ----
  const anticipateCard = document.createElement('div');
  anticipateCard.className = 'card';
  anticipateCard.innerHTML = `
    <div class="card-header"><h2 class="card-title">1 · Anticipa la réplica</h2></div>
    <div class="field-group" style="margin-bottom:0">
      <label class="field-label" for="wg-anticipate">¿Cómo crees que reaccionará el actor a tu decisión?</label>
      <textarea id="wg-anticipate" class="field-textarea" placeholder="Escribe tu anticipación antes de ver la réplica real.">${st.wg_anticipate || ''}</textarea>
    </div>
  `;
  container.appendChild(anticipateCard);

  // ---- Paso 2: Réplica del actor (revelar) ----
  const reply = pickReply(caseData, st);
  const replyCard = document.createElement('div');
  replyCard.className = 'card';
  replyCard.innerHTML = `<div class="card-header"><h2 class="card-title">2 · Réplica del actor</h2></div>`;
  const revealBtn = document.createElement('button');
  revealBtn.className = 'btn btn-primary';
  revealBtn.type = 'button';
  revealBtn.textContent = 'Revelar la réplica del actor';
  revealBtn.disabled = !(st.wg_anticipate && st.wg_anticipate.trim());
  const replyReveal = document.createElement('div');
  replyReveal.className = 'inject-card';
  replyReveal.style.marginTop = 'var(--sp-4)';
  replyReveal.style.display = 'none';
  replyReveal.innerHTML = `<div class="inject-label">Réplica del actor</div><div class="inject-text">${reply.text}</div>`;
  replyCard.appendChild(revealBtn);
  replyCard.appendChild(replyReveal);
  container.appendChild(replyCard);

  // ---- Paso 3: Segunda revisión ----
  const reviewCard = document.createElement('div');
  reviewCard.className = 'card';
  reviewCard.style.display = (st.wg_replyId ? 'block' : 'none');
  reviewCard.innerHTML = `
    <div class="card-header"><h2 class="card-title">3 · Segunda revisión</h2>
      <p style="font-size:var(--text-sm);color:var(--muted);margin-top:var(--sp-2)">A la luz de la réplica, vuelve a declarar qué supuesto mantienes, cuál abandonas y cuál inviertes, y clasifica el bucle.</p>
    </div>
    <div class="supuesto-grid">
      <div class="supuesto-card supuesto-mantiene"><div class="field-group" style="margin:0">
        <label class="field-label" for="wg-maintains" style="color:var(--color-success)">${T.s9_maintains}</label>
        <textarea id="wg-maintains" class="field-textarea">${st.wg_maintains || ''}</textarea></div></div>
      <div class="supuesto-card supuesto-abandona"><div class="field-group" style="margin:0">
        <label class="field-label" for="wg-abandons" style="color:var(--color-error)">${T.s9_abandons}</label>
        <textarea id="wg-abandons" class="field-textarea">${st.wg_abandons || ''}</textarea></div></div>
      <div class="supuesto-card supuesto-invierte"><div class="field-group" style="margin:0">
        <label class="field-label" for="wg-inverts" style="color:var(--color-accent)">${T.s9_inverts}</label>
        <textarea id="wg-inverts" class="field-textarea">${st.wg_inverts || ''}</textarea></div></div>
    </div>
    <hr class="divider">
    <div class="loop-options">
      <label class="loop-option">
        <input type="radio" name="wg-loop-type" value="simple" ${st.wg_loopType === 'simple' ? 'checked' : ''}>
        <span class="loop-option-label">Bucle simple</span>
        <div class="loop-option-desc">${LOOP_DEFS.simple.replace('Bucle simple: ', '')}</div>
      </label>
      <label class="loop-option">
        <input type="radio" name="wg-loop-type" value="doble" ${st.wg_loopType === 'doble' ? 'checked' : ''}>
        <span class="loop-option-label">Doble bucle</span>
        <div class="loop-option-desc">${LOOP_DEFS.doble.replace('Doble bucle: ', '')}</div>
      </label>
    </div>
    <div class="field-group" style="margin-bottom:0">
      <label class="field-label" for="wg-loop-why">¿Por qué? (1–2 frases)</label>
      <textarea id="wg-loop-why" class="field-textarea">${st.wg_loopWhy || ''}</textarea>
    </div>
  `;
  container.appendChild(reviewCard);

  // ---- Nav footer ----
  const footer = renderNavFooter({
    showBack: false,
    onBack: nav.onBack,
    onNext: nav.onNext,
    nextDisabled: true,
    nextLabel: T.continue,
  });
  container.appendChild(footer);
  const nextBtn = footer.querySelector('.btn-primary');

  function wgLoopType() {
    const c = container.querySelector('input[name="wg-loop-type"]:checked');
    return c ? c.value : '';
  }

  function save() {
    state.set({
      wg_anticipate: container.querySelector('#wg-anticipate').value,
      wg_maintains: container.querySelector('#wg-maintains').value,
      wg_abandons: container.querySelector('#wg-abandons').value,
      wg_inverts: container.querySelector('#wg-inverts').value,
      wg_loopType: wgLoopType(),
      wg_loopWhy: container.querySelector('#wg-loop-why').value,
    });
  }

  function validate() {
    const reviewVisible = reviewCard.style.display !== 'none';
    const m = container.querySelector('#wg-maintains').value.trim();
    const a = container.querySelector('#wg-abandons').value.trim();
    const i = container.querySelector('#wg-inverts').value.trim();
    const why = container.querySelector('#wg-loop-why').value.trim();
    const ok = reviewVisible && m && a && i && wgLoopType() && why;
    nextBtn.disabled = !ok;
  }

  // anticipate enables reveal
  container.querySelector('#wg-anticipate').addEventListener('input', () => {
    save();
    revealBtn.disabled = !container.querySelector('#wg-anticipate').value.trim();
  });

  revealBtn.addEventListener('click', () => {
    replyReveal.style.display = 'block';
    reviewCard.style.display = 'block';
    revealBtn.disabled = true;
    state.set({ wg_replyId: reply.id });
    validate();
  });

  // If reply was already revealed in a previous mount, show it.
  if (st.wg_replyId) {
    replyReveal.style.display = 'block';
    revealBtn.disabled = true;
  }

  ['#wg-maintains', '#wg-abandons', '#wg-inverts', '#wg-loop-why'].forEach(sel => {
    container.querySelector(sel).addEventListener('input', () => { save(); validate(); });
  });
  container.querySelectorAll('input[name="wg-loop-type"]').forEach(rb => {
    rb.addEventListener('change', () => { save(); validate(); });
  });

  validate();
}
