import { state } from './state.js';
import { loadCase, CASE_FILES } from './caseLoader.js';
import { render } from './router.js';
import { isProfessorMode } from './professor.js';

async function boot() {
  // Load persisted state
  state.load();

  // Check professor mode
  const profMode = isProfessorMode();

  // Determine which case to load
  const params = new URLSearchParams(window.location.search);
  const caseOrder = (params.get('caso') || 'A').toUpperCase();
  const caseFile = CASE_FILES[caseOrder] || CASE_FILES.A;

  // Apply professor mode
  const st = state.get();
  if (profMode !== st.professorMode) {
    state.set({ professorMode: profMode });
  }

  try {
    const caseData = await loadCase(caseFile);

    // Reset state if switching cases
    const currentSt = state.get();
    if (currentSt.caseId && currentSt.caseId !== caseData.caseId) {
      state.reset();
      state.set({ professorMode: profMode });
    }

    state.set({ caseId: caseData.caseId });

    // Add reset button listener (global event delegation)
    document.addEventListener('click', (e) => {
      if (e.target.id === 'reset-btn' || e.target.closest('#reset-btn')) {
        if (confirm(T_resetConfirm)) {
          state.reset();
          window.location.reload();
        }
      }
    });

    await render(caseData);

  } catch (e) {
    document.getElementById('app').innerHTML = `
      <div style="padding:40px;max-width:600px;margin:0 auto">
        <div class="error-card">
          <div class="error-title">Error al cargar el caso</div>
          <p style="margin-top:8px;">${escapeForHtml(e.message)}</p>
          <p style="margin-top:16px;font-size:13px;color:#666">
            Verifique que el archivo del caso existe en <code>cases/v1/</code>
            y sigue el esquema v1.0. Consulte <code>cases/v1/schema.md</code>.
          </p>
        </div>
      </div>
    `;
  }
}

const T_resetConfirm = '¿Reiniciar la sesión? Se perderá todo el progreso no exportado.';

function escapeForHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

boot();
