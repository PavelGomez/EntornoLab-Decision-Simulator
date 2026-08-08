import { state } from '../state.js';
import { T } from '../i18n.js';
import { renderProfessorPanel } from '../professor.js';
import { assemblePhrase, getPhraseFields } from '../ebtaPhrase.js';
import { generatePdf, generateJson } from '../pdf.js';
import { escapeHtml } from './helpers.js';
import { INJECT_GLOSS } from '../learning/content.js';

export async function mountScreen08(container, caseData, nav) {
  const st = state.get();

  // Superficie del facilitador — pantalla crítica para liberar el inject.
  if (st.professorMode) {
    container.appendChild(renderProfessorPanel(caseData, nav));
  }

  // Retén por política de revelado: si runConfig pide que el facilitador libere
  // y aún no lo hizo, no se muestra el texto del inject ni se permite avanzar.
  const reten = st.runConfig?.revealPolicy === 'facilitator' && !st.injectReleased;

  const titleEl = document.createElement('h1');
  titleEl.className = 'screen-title';
  titleEl.style.color = 'var(--color-inject)';
  titleEl.textContent = T.screenTitles[8];
  container.appendChild(titleEl);

  // Glosa del anglicismo en su primera aparición (Pantalla 8).
  const glossEl = document.createElement('p');
  glossEl.className = 'screen-subtitle';
  glossEl.innerHTML = `<strong>Inject (inyección de información).</strong> ${INJECT_GLOSS}`;
  container.appendChild(glossEl);

  // Point of no return warning
  const warningEl = document.createElement('div');
  warningEl.className = 'ponr-warning';
  warningEl.innerHTML = `
    <div class="ponr-warning-title">Antes de continuar</div>
    <div class="ponr-warning-text">${T.s8_warning}</div>
  `;
  container.appendChild(warningEl);

  // Frase original (antes del inject), como referencia.
  const originalPhraseCard = document.createElement('div');
  originalPhraseCard.className = 'card';
  originalPhraseCard.innerHTML = `
    <div class="card-header">
      <div class="card-title" style="font-size:var(--text-base);">Su frase E-BTA/R antes del inject</div>
    </div>
    <div class="phrase-preview">${assemblePhrase(getPhraseFields(st, caseData, false), true)}</div>
  `;
  container.appendChild(originalPhraseCard);

  // Inject a mostrar (queda fijado al sellar).
  const inject = (st.selectedInjectId && caseData.injects.find(i => i.id === st.selectedInjectId))
    || caseData.injects[0];

  // Contenedor donde se inyectará el texto del inject DESPUÉS de sellar.
  const injectSlot = document.createElement('div');

  function revealInject() {
    injectSlot.innerHTML = '';
    if (reten) {
      const retenCard = document.createElement('div');
      retenCard.className = 'inject-card';
      retenCard.style.opacity = '.85';
      retenCard.innerHTML = `<div class="inject-label">${T.s8_title}</div>
        <div class="inject-text" style="font-style:italic;">⏳ ${T.retenState}</div>`;
      injectSlot.appendChild(retenCard);

      // Entrega 1: exportar la decisión ANTES del inject (compromiso externalizado).
      const dlWrap = document.createElement('div');
      dlWrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:8px;padding:var(--sp-6) 0 var(--sp-12);';
      const note = document.createElement('p');
      note.className = 'field-hint';
      note.style.cssText = 'text-align:center;max-width:52ch;';
      note.innerHTML = 'Tu decisión y tu supuesto quedaron <strong>sellados</strong>. Descarga y entrega estos dos archivos <strong>antes</strong> de que el profesor libere el inject. Cuando lo libere, vuelve con el segundo enlace (misma sesión) para hacer la revisión.';
      const dlBtn = document.createElement('button');
      dlBtn.className = 'btn btn-inject';
      dlBtn.textContent = 'Descargar mi decisión antes del inject (PDF + JSON)';
      const dlMsg = document.createElement('p');
      dlMsg.className = 'field-hint';
      dlMsg.style.textAlign = 'center';
      dlBtn.addEventListener('click', async () => {
        dlBtn.disabled = true;
        dlBtn.textContent = 'Generando\u2026';
        await new Promise(r => setTimeout(r, 30));
        state.set({ exportedAt: new Date().toISOString() });
        await state.computeIntegrityHash();
        const fs = state.get();
        const ok = generatePdf(caseData, fs, { preInject: true });
        generateJson(caseData, fs, { preInject: true });
        dlBtn.disabled = false;
        dlBtn.textContent = 'Descargar mi decisión antes del inject (PDF + JSON)';
        dlMsg.textContent = ok
          ? ('\u2713 Descargados \u00b7 verifyCode ' + (fs.verifyCode || '\u2014'))
          : 'JSON descargado; usa la vista imprimible para el PDF.';
      });
      dlWrap.appendChild(note);
      dlWrap.appendChild(dlBtn);
      dlWrap.appendChild(dlMsg);
      injectSlot.appendChild(dlWrap);
      return; // sin CTA de avance mientras dure el retén
    }
    const injectCard = document.createElement('div');
    injectCard.className = 'inject-card';
    const injectLabel = document.createElement('div');
    injectLabel.className = 'inject-label';
    injectLabel.textContent = T.s8_title;
    injectCard.appendChild(injectLabel);
    const injectText = document.createElement('div');
    injectText.className = 'inject-text';
    injectText.textContent = inject.text;
    injectCard.appendChild(injectText);
    injectSlot.appendChild(injectCard);

    const ctaWrapper = document.createElement('div');
    ctaWrapper.style.cssText = 'display:flex;justify-content:center;padding:var(--sp-8) 0 var(--sp-12);';
    const ctaBtn = document.createElement('button');
    ctaBtn.className = 'btn btn-inject';
    ctaBtn.textContent = T.s8_readBtn;
    ctaBtn.addEventListener('click', () => {
      state.set({ postInject: true, selectedInjectId: inject.id });
      nav.onNext();
    });
    ctaWrapper.appendChild(ctaBtn);
    injectSlot.appendChild(ctaWrapper);
  }

  // ── H (anti-retrospectiva): nombrar el supuesto decisivo ANTES de ver el inject.
  // Se sella en el snapshot pre-inject; el texto del inject solo se revela tras
  // sellar. Así el "antes" carga un compromiso falsable y una revisión honesta es
  // visible (una fabricada, tras recomenzar, se delata). Al recargar ya sellado,
  // se salta el paso y no permite reescribir el supuesto.
  const already = !!st.preInjectSnapshot;

  if (already) {
    container.appendChild(injectSlot);
    revealInject();
    return;
  }

  const assumeCard = document.createElement('div');
  assumeCard.className = 'card';
  assumeCard.innerHTML = `
    <div class="card-header">
      <div class="card-title" style="font-size:var(--text-base);">Antes de ver la información nueva</div>
    </div>
    <label class="field-label" for="s8-assumption">¿Qué supuesto decisivo sostiene tu acción y quedaría a prueba si llega información nueva?</label>
    <textarea id="s8-assumption" class="field-textarea" placeholder="Ej.: que el plazo real será de al menos 60 días · que el banco confirmará el respaldo a tiempo · que el actor no se moverá primero…">${escapeHtml(st.s8_assumption || '')}</textarea>
    <p class="field-hint">Al sellar, tu decisión inicial y este supuesto quedan congelados. El inject aparecerá enseguida; desde ahí solo puedes revisar, no reescribir.</p>
  `;
  container.appendChild(assumeCard);
  container.appendChild(injectSlot);

  const sealWrap = document.createElement('div');
  sealWrap.style.cssText = 'display:flex;justify-content:center;padding:var(--sp-6) 0 var(--sp-12);';
  const sealBtn = document.createElement('button');
  sealBtn.className = 'btn btn-inject';
  sealBtn.textContent = 'Sellar mi decisión y ver el inject';
  sealBtn.disabled = true;
  sealWrap.appendChild(sealBtn);
  container.appendChild(sealWrap);

  const ta = assumeCard.querySelector('#s8-assumption');
  ta.addEventListener('input', () => { sealBtn.disabled = ta.value.trim().length === 0; });
  if (ta.value.trim().length > 0) sealBtn.disabled = false;

  sealBtn.addEventListener('click', () => {
    state.set({ s8_assumption: ta.value.trim() });
    state.sealPreInject(); // congela s1..s7 + s8_assumption + injectSeenAt
    ta.setAttribute('disabled', '');
    sealWrap.remove();
    revealInject();
    injectSlot.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
