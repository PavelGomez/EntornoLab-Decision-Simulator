import { state } from './state.js';
import { loadCase, CASE_FILES } from './caseLoader.js';
import { render, renderLanding } from './router.js';
import { isProfessorMode } from './professor.js';
import { isConsoleRoute, renderConsole, isConsoleUnlocked } from './console.js';
import { openFromHash } from './learning/center.js';

const T_resetConfirm = '\u00bfReiniciar la sesi\u00f3n? Se perder\u00e1 todo el progreso no exportado.';

function escapeForHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function showError(msg) {
  document.getElementById('app').innerHTML = `
    <div style="padding:40px;max-width:600px;margin:0 auto">
      <div class="error-card">
        <div class="error-title">Error al cargar el caso</div>
        <p style="margin-top:8px;">${escapeForHtml(msg)}</p>
        <p style="margin-top:16px;font-size:13px;color:#666">
          Verifique que el archivo del caso existe en <code>cases/v1/</code>
          y sigue el esquema v1.0. Consulte <code>cases/v1/schema.md</code>.
        </p>
      </div>
    </div>
  `;
}

function setupListeners() {
  // Global reset handler (event delegation — persiste aunque el DOM cambie)
  if (!document._entornolabResetBound) {
    document._entornolabResetBound = true;
    document.addEventListener('click', (e) => {
      if (e.target.id === 'reset-btn' || e.target.closest?.('#reset-btn')) {
        if (confirm(T_resetConfirm)) {
          state.reset();
          window.location.href = window.location.pathname; // vuelve a la portada
        }
      }
    });
  }
}

async function startCase(caseOrder, profMode) {
  const caseFile = CASE_FILES[caseOrder] || CASE_FILES.A;
  try {
    const caseData = await loadCase(caseFile);
    state.set({ caseId: caseData.caseId, currentScreen: 1 });
    // Actualiza la URL sin recargar (para que un refresco recupere el caso correcto)
    history.replaceState({}, '', `?caso=${caseOrder}`);
    setupListeners();
    await render(caseData);
    return caseData;
  } catch (e) {
    showError(e.message);
    return null;
  }
}

async function boot() {
  state.load();

  // ── Ruta privada de la consola (no enlazada): ?vista=consola / #consola ──
  if (isConsoleRoute()) {
    const app = document.getElementById('app');
    await renderConsole(app, {
      onStartRun: async (order, runConfig, facData, studentData) => {
        state.set({ caseId: studentData.caseId, currentScreen: 1, professorMode: true });
        state.startRun(runConfig);
        history.replaceState({}, '', `?caso=${order}`);
        setupListeners();
        await render(studentData);
      },
    });
    return;
  }

  // El tablero del facilitador se muestra si se entró por la vía pública
  // (?modo=profesor) o si la consola está desbloqueada y hay un run activo
  // (así el tablero sobrevive a una recarga del enlace del alumno mid-run).
  // La capa docente (consola/datos del facilitador) NO forma parte de la build
  // pública. `?modo=profesor` solo alterna un panel mínimo sin datos privados.
  const profMode = isProfessorMode() || (isConsoleUnlocked() && !!state.get().runConfig);
  if (profMode !== state.get().professorMode) {
    state.set({ professorMode: profMode });
  }

  const params = new URLSearchParams(window.location.search);
  const caseOrderParam = params.get('caso')?.toUpperCase();
  const st = state.get();

  // ── Caso A: portada (ninguna sesión activa y sin parámetro de caso en URL)
  if (st.currentScreen === 0 && !caseOrderParam) {
    await renderLanding(async (chosenOrder) => {
      await startCase(chosenOrder, profMode);
    });
    openFromHash();
    return;
  }

  // ── Caso B: sesión activa o enlace directo con ?caso=
  const caseOrder = caseOrderParam || 'A';
  const caseFile = CASE_FILES[caseOrder] || CASE_FILES.A;

  try {
    const caseData = await loadCase(caseFile);

    // Si el caso cambió respecto a la sesión guardada, empezar de cero
    const saved = state.get();
    if (saved.caseId && saved.caseId !== caseData.caseId) {
      state.reset();
      state.set({ professorMode: profMode });
    }

    // ── Enlace de recorrido preconfigurado (multidispositivo, edición TTX) ──
    // Parámetros admitidos: ?caso=A&inject=<id>&modo=ttx&sesion=<token>.
    // Se validan contra el caso; los inválidos se ignoran y caen en un valor
    // seguro. NUNCA transporta datos del facilitador (notas, análisis, clave).
    const injectParam = params.get('inject');
    const sesionParam = params.get('sesion');
    const validInject = (injectParam && Array.isArray(caseData.injects) &&
      caseData.injects.some(i => i.id === injectParam)) ? injectParam : null;

    // Freshness de sesión: un token nuevo reinicia el recorrido para que una
    // sesión previa en este navegador no contamine la del enlace recién abierto.
    if (sesionParam && state.get().linkSession !== sesionParam) {
      state.reset();
      state.set({ professorMode: profMode, linkSession: sesionParam });
    }

    // Esta edición es TTX: se fuerza la modalidad con independencia del enlace.
    state.set({ caseId: caseData.caseId, modality: 'ttx' });
    if (validInject) state.set({ selectedInjectId: validInject });
    // Si llegó por URL directa sin sesión, ir a pantalla 1
    if (state.get().currentScreen === 0) state.set({ currentScreen: 1 });

    setupListeners();
    await render(caseData);
    openFromHash();

  } catch (e) {
    showError(e.message);
  }
}

boot();
