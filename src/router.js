import { state } from './state.js';
import { mountScreen } from './screens/index.js';
import { T } from './i18n.js';

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

export function renderProgressBar(container, currentScreen) {
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

  // Progress bar
  app.appendChild(renderProgressBar(app, screen));

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
