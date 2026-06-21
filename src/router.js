import { state } from './state.js';
import { mountScreen } from './screens/index.js';
import { T } from './i18n.js';
import { openLearning, setStartHook, renderOrientacion, buildSectionNav } from './learning/center.js';

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
/**
 * Barra superior persistente (estilo MacroLab). Muestra TODAS las secciones del
 * centro de aprendizaje directamente —no hay un modo separado "Aprender"—.
 * En escritorio las secciones se ven inline; en móvil colapsan tras un menú
 * hamburguesa. Es de orientación, no de navegación libre del recorrido.
 */
export function renderTopBar(currentScreen, { showCounter = true } = {}) {
  const inRecorrido = showCounter;

  const bar = document.createElement('div');
  bar.className = 'topbar';

  const brand = document.createElement('button');
  brand.className = 'topbar-brand';
  brand.type = 'button';
  brand.setAttribute('aria-label', 'Inicio · EntornoLab');
  brand.textContent = 'EntornoLab';
  brand.addEventListener('click', () => {
    if (inRecorrido) openLearning('inicio');
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Botón hamburguesa (visible en móvil por CSS)
  const burger = document.createElement('button');
  burger.className = 'topbar-burger';
  burger.type = 'button';
  burger.setAttribute('aria-label', 'Abrir el menú de secciones');
  burger.setAttribute('aria-expanded', 'false');
  burger.innerHTML = '&#9776;';
  burger.addEventListener('click', () => {
    const open = bar.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Navegación de secciones (todas visibles en escritorio)
  const nav = buildSectionNav();
  nav.classList.add('topbar-nav');
  // Al elegir una sección en móvil, cierra el menú
  nav.addEventListener('click', () => bar.classList.remove('open'));

  const right = document.createElement('div');
  right.className = 'topbar-right';

  // Chip de autoría (estilo MercaLab) — visible en escritorio
  const author = document.createElement('span');
  author.className = 'topbar-author';
  author.textContent = 'Pável Gómez · 2026';
  right.appendChild(author);

  if (inRecorrido) {
    const counter = document.createElement('span');
    counter.className = 'topbar-counter';
    counter.textContent = T.screenLabel(currentScreen, TOTAL_SCREENS);
    right.appendChild(counter);
  } else {
    const startBtn = document.createElement('button');
    startBtn.className = 'btn btn-primary topbar-start';
    startBtn.type = 'button';
    startBtn.textContent = 'Iniciar recorrido →';
    startBtn.addEventListener('click', () => {
      const sec = document.querySelector('.landing-case-section');
      if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    right.appendChild(startBtn);
  }

  bar.appendChild(brand);
  bar.appendChild(nav);
  bar.appendChild(right);
  bar.appendChild(burger);
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

  // "Iniciar recorrido →" desde el centro de aprendizaje (en la portada):
  // cierra el overlay y lleva al selector de caso.
  setStartHook(() => {
    const sec = document.querySelector('.landing-case-section');
    if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

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

  // Tarjeta "Orientación rápida" al inicio de cada pantalla del recorrido (1–10)
  if (screen >= 1 && screen <= 10) {
    const orient = renderOrientacion(screen);
    if (orient) container.insertBefore(orient, container.firstChild);
  }

  // Scroll to top
  window.scrollTo(0, 0);
}
