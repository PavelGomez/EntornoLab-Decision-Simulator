import { state } from '../state.js';
import { T } from '../i18n.js';

/**
 * Renders the fixed navigation footer with Back and Continue buttons.
 */
export function renderNavFooter({
  showBack = true,
  onBack,
  onNext,
  nextDisabled = false,
  nextLabel = 'Continuar →',
  backLabel = '← Atrás'
}) {
  const footer = document.createElement('div');
  footer.className = 'nav-footer';

  const left = document.createElement('div');
  if (showBack) {
    const st = state.get();
    // Hide back if post-inject
    if (!st.postInject) {
      const backBtn = document.createElement('button');
      backBtn.className = 'btn btn-secondary';
      backBtn.textContent = backLabel;
      backBtn.addEventListener('click', onBack);
      left.appendChild(backBtn);
    }
  }

  const rightDiv = document.createElement('div');
  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn btn-primary';
  nextBtn.textContent = nextLabel;
  nextBtn.disabled = nextDisabled;
  nextBtn.addEventListener('click', () => {
    if (!nextBtn.disabled) onNext();
  });
  rightDiv.appendChild(nextBtn);

  footer.appendChild(left);
  footer.appendChild(rightDiv);
  return footer;
}

/**
 * Creates a field group with label, input/textarea/select, and optional hint.
 */
export function createFieldGroup({ id, label, hint, type = 'textarea', value = '', placeholder = '', options = [] }) {
  const group = document.createElement('div');
  group.className = 'field-group';

  const labelEl = document.createElement('label');
  labelEl.className = 'field-label';
  labelEl.setAttribute('for', id);
  labelEl.textContent = label;
  group.appendChild(labelEl);

  let input;
  if (type === 'textarea') {
    input = document.createElement('textarea');
    input.className = 'field-textarea';
    input.value = value;
    if (placeholder) input.placeholder = placeholder;
  } else if (type === 'select') {
    input = document.createElement('select');
    input.className = 'field-select';
    options.forEach(opt => {
      const optEl = document.createElement('option');
      optEl.value = opt.value;
      optEl.textContent = opt.label;
      if (opt.value === value) optEl.selected = true;
      input.appendChild(optEl);
    });
  } else {
    input = document.createElement('input');
    input.type = type;
    input.className = 'field-input';
    input.value = value;
    if (placeholder) input.placeholder = placeholder;
  }

  input.id = id;
  group.appendChild(input);

  if (hint) {
    const hintEl = document.createElement('p');
    hintEl.className = 'field-hint';
    hintEl.textContent = hint;
    group.appendChild(hintEl);
  }

  return { group, input };
}

/**
 * Escapes HTML special characters.
 */
export function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Renders a reset button (global).
 */
export function renderResetBtn() {
  const btn = document.createElement('button');
  btn.id = 'reset-btn';
  btn.className = 'btn btn-secondary';
  btn.textContent = T.reset;
  btn.style.cssText = 'font-size:var(--text-sm);padding:var(--sp-2) var(--sp-4);';
  return btn;
}
