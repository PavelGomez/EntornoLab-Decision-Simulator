import { state } from '../state.js';
import { T } from '../i18n.js';
import { renderProfessorPanel } from '../professor.js';
import { assemblePhrase, getPhraseFields } from '../ebtaPhrase.js';
import { escapeHtml } from './helpers.js';
import { INJECT_GLOSS } from '../learning/content.js';

export async function mountScreen08(container, caseData, nav) {
  const st = state.get();

  // Professor panel — critical screen for inject selection
  if (st.professorMode) {
    container.appendChild(renderProfessorPanel(caseData, nav));
  }

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
    <div class="ponr-warning-title">Punto de no retorno</div>
    <div class="ponr-warning-text">${T.s8_warning}</div>
  `;
  container.appendChild(warningEl);

  // Show the original phrase for reference before inject
  const originalPhraseCard = document.createElement('div');
  originalPhraseCard.className = 'card';
  originalPhraseCard.innerHTML = `
    <div class="card-header">
      <div class="card-title" style="font-size:var(--text-base);">Su frase E-BTA/R antes del inject</div>
    </div>
    <div class="phrase-preview">${assemblePhrase(getPhraseFields(st, caseData, false), true)}</div>
  `;
  container.appendChild(originalPhraseCard);

  // Determine which inject to show
  // If professor has selected one, use it. Otherwise default to first.
  const inject = (st.selectedInjectId && caseData.injects.find(i => i.id === st.selectedInjectId))
    || caseData.injects[0];

  // Show inject (only after professor has confirmed if in professor mode OR always if not)
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

  container.appendChild(injectCard);

  // Call to action button
  const ctaWrapper = document.createElement('div');
  ctaWrapper.style.cssText = 'display:flex;justify-content:center;padding:var(--sp-8) 0 var(--sp-12);';

  const ctaBtn = document.createElement('button');
  ctaBtn.className = 'btn btn-inject';
  ctaBtn.textContent = T.s8_readBtn;

  ctaBtn.addEventListener('click', () => {
    // Lock the inject selection
    state.set({
      postInject: true,
      selectedInjectId: inject.id,
    });
    nav.onNext();
  });

  ctaWrapper.appendChild(ctaBtn);
  container.appendChild(ctaWrapper);

  // No nav footer with back button — this is the point of no return.
  // We just show the CTA button inline above.
}
