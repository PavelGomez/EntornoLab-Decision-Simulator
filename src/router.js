import { state } from './state.js';
import { mountScreen } from './screens/index.js';
import { T } from './i18n.js';
import { openEbtaModal } from './ebtaModal.js';

const TOTAL_SCREENS = 10;

// Keep a reference to caseData so the popstate handler can re-render.
let _caseDataRef = null;

// Intercept the browser's physical back button / swipe gesture after the inject.
// On each navigation we push a history entry. If the user presses back while
// postInject is true, we push forward again to make the gesture a no-op.
window.addEventListener('popstate', () => {
  const st = state.get();
  if (st.postInject) {
    history.pushState({ screen: st.currentScreen }, '', window.location.href);
  }
});

/**
 * Barra superior persistente (navy, estilo familia MacroLab).
 * Es de orientación, NO de navegación libre: no permite saltar a pantallas
 * posteriores ni volver atrás tras el inject. Muestra la marca + versión,
 * el enlace al marco E-BTA/R y, donde aplique, el contador de pantalla.
 */
export function renderTopBar(currentScreen, { showCounter = true } = {}) {
  const bar = document.createElement('div');
  bar.className = 'topbar';

  const brand = document.createElement('div');
  brand.className = 'topbar-brand';
  brand.textContent = 'EntornoLab · v1.2';

  const right = document.createElement('div');
  right.className = 'topbar-right';

  const ebtaBtn = document.createElement('button');
  ebtaBtn.className = 'topbar-ebtar';
  ebtaBtn.type = 'button';
  ebtaBtn.setAttribute('aria-label', '¿Qué es E-BTA/R?');
  ebtaBtn.innerHTML =
    '<span class="topbar-ebtar-full">¿Qué es E-BTA/R?</span>' +
    '<span class="topbar-ebtar-short">E-BTA/R</span>';
  ebtaBtn.addEventListener('click', openEbtaModal);
  right.appendChild(ebtaBtn);

  if (showCounter) {
    const counter = document.createElement('span');
    counter.className = 'topbar-counter';
    counter.textContent = T.screenLabel(currentScreen, TOTAL_SCREENS);
    right.appendChild(counter);
  }

  bar.appendChild(brand);
  bar.appendChild(right);
  return bar;
}

export function renderProgressBar(currentScreen) {
  const bar = document.createElement('div');
  bar.className = 'progress-bar';

  const steps = document.createElement('div');
  steps.className = 'progress-steps';
  for (let i = 1; i <= TOTAL_SCREENS; i++) {
    const step = document.createElement('div');
    step.className = `progress-step ${i < currentScreen ? 'done' : i === currentScreen ? 'current' : ''}`;
    steps.appendChild(step);
  }

  const label = document.createElement('span');
  label.className = 'progress-label';
  label.textContent = T.screenLabel(currentScreen, TOTAL_SCREENS);

  bar.appendChild(steps);
  bar.appendChild(label);
  return bar;
}

/**
 * Renders the landing page (screen 0) — no case data needed.
 * onStart(caseOrder) is called when the participant clicks "Comenzar".
 * La portada lleva la barra superior persistente (sin contador) y, debajo,
 * la banda hero navy + el cuerpo sobre el lienzo claro.
 */
export async function renderLanding(onStart) {
  const app = document.getElementById('app');
  app.innerHTML = '';

  // Barra superior persistente (sin contador de pantalla en la portada)
  app.appendChild(renderTopBar(0, { showCounter: false }));

  const container = document.createElement('div');
  container.className = 'screen screen--landing';
  app.appendChild(container);

  await mountScreen(0, container, null, { onStart });
  window.scrollTo(0, 0);
}

export async function navigate(caseData, targetScreen) {
  const st = state.get();

  // Block backward navigation after inject (screen 8)
  if (st.postInject && targetScreen < 8) {
    return; // silently ignore
  }

  // Block going past screen 10
  if (targetScreen > TOTAL_SCREENS) return;
  if (targetScreen < 1) return;

  state.set({ currentScreen: targetScreen });
  _caseDataRef = caseData;
  // Push a history entry so popstate fires on browser back
  history.pushState({ screen: targetScreen }, '', window.location.href);
  await render(caseData);
}

export async function render(caseData) {
  const app = document.getElementById('app');
  const st = state.get();
  const screen = st.currentScreen;

  // Clear and rebuild
  app.innerHTML = '';

  // Barra superior persistente (navy) + barra de progreso (familia)
  app.appendChild(renderTopBar(screen, { showCounter: true }));
  app.appendChild(renderProgressBar(screen));

  // Screen container
  const container = document.createElement('div');
  container.className = 'screen';
  app.appendChild(container);

  // Mount screen
  await mountScreen(screen, container, caseData, {
    onNext: () => navigate(caseData, screen + 1),
    onBack: () => {
      const s = state.get();
      if (!s.postInject && screen > 1) navigate(caseData, screen - 1);
    },
    navigate: (n) => navigate(caseData, n),
  });

  // Scroll to top
  window.scrollTo(0, 0);
}
