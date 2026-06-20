import { state } from '../state.js';
import { T } from '../i18n.js';
import { renderNavFooter, escapeHtml } from './helpers.js';
import { renderProfessorPanel } from '../professor.js';

export async function mountScreen01(container, caseData, nav) {
  const st = state.get();

  // Professor panel
  if (st.professorMode) {
    container.appendChild(renderProfessorPanel(caseData, nav));
  }

  const titleEl = document.createElement('h1');
  titleEl.className = 'screen-title';
  titleEl.textContent = T.screenTitles[1];
  container.appendChild(titleEl);

  const subtitleEl = document.createElement('p');
  subtitleEl.className = 'screen-subtitle';
  subtitleEl.innerHTML = `<span class="role-badge">${escapeHtml(T.roles[caseData.role] || caseData.role)}</span>&nbsp;·&nbsp;${T.s1_estimated(caseData.estimatedMinutes)}`;
  container.appendChild(subtitleEl);

  // Main card with briefing
  const card = document.createElement('div');
  card.className = 'card';

  const cardHeader = document.createElement('div');
  cardHeader.className = 'card-header';
  cardHeader.innerHTML = `<h2 class="card-title">${escapeHtml(caseData.title)}</h2>`;
  card.appendChild(cardHeader);

  const signalBox = document.createElement('div');
  signalBox.className = 'signal-box';
  signalBox.innerHTML = `<div class="signal-label">${T.s1_signal}</div><div class="signal-text">${escapeHtml(caseData.initialSignal)}</div>`;
  card.appendChild(signalBox);

  const briefingEl = document.createElement('div');
  briefingEl.className = 'briefing-text';
  briefingEl.innerHTML = parseBriefing(caseData.briefing);
  card.appendChild(briefingEl);

  container.appendChild(card);

  // Checkbox card
  const checkCard = document.createElement('div');
  checkCard.className = 'card';

  const checkLabel = document.createElement('label');
  checkLabel.className = 'checkbox-wrapper';
  checkLabel.innerHTML = `
    <input type="checkbox" id="read-check" ${st.s1_read ? 'checked' : ''}>
    <span>${T.s1_read}</span>
  `;
  checkCard.appendChild(checkLabel);
  container.appendChild(checkCard);

  // Nav footer
  const footer = renderNavFooter({
    showBack: false,
    onBack: nav.onBack,
    onNext: nav.onNext,
    nextDisabled: !st.s1_read,
    nextLabel: T.continue,
  });
  container.appendChild(footer);

  const nextBtn = footer.querySelector('.btn-primary');
  const check = container.querySelector('#read-check');

  check.addEventListener('change', () => {
    state.set({ s1_read: check.checked });
    nextBtn.disabled = !check.checked;
  });
}

function parseBriefing(text) {
  if (!text) return '';
  // Split into sections by §N.
  const parts = text.split(/(?=§\d+\.)/);
  return parts.map(section => {
    section = section.trim();
    if (!section) return '';
    const match = section.match(/^(§\d+\.\s*[^\n]+)\n?([\s\S]*)$/);
    if (match) {
      const title = escapeHtml(match[1].trim());
      const body = escapeHtml(match[2].trim())
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, ' ');
      return `<p><span class="briefing-section-title">${title}</span></p><p>${body}</p>`;
    }
    const body = escapeHtml(section)
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, ' ');
    return `<p>${body}</p>`;
  }).join('');
}
