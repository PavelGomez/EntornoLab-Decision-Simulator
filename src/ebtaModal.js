/**
 * Modal singleton "¿Qué es E-BTA/R?"
 * Se inicializa la primera vez que se abre y persiste en el DOM
 * sin tocar el estado ni el router (no pierde el progreso).
 */

let _modal = null;
let _focusTrap = null;

function buildModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'ebta-modal-title');
  overlay.style.display = 'none';

  overlay.innerHTML = `
    <div class="modal-box" role="document">
      <button class="modal-close" aria-label="Cerrar modal">&#x2715;</button>

      <h2 class="modal-title" id="ebta-modal-title">El marco E-BTA/R</h2>

      <div class="modal-section">
        <p>E-BTA/R es una gramática para tomar y defender una decisión cuando aparece un evento que abre incertidumbre. No es una fórmula para "acertar": es una disciplina para hacer explícito qué decides, qué proteges, qué sacrificas y cómo revisarás la apuesta.</p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">El ciclo completo</div>
        <svg viewBox="0 0 680 110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagrama del ciclo E-BTA/R" style="width:100%;height:auto;display:block;margin:var(--sp-3) 0;">
          <!-- Evento -->
          <rect x="0" y="32" width="76" height="40" rx="6" fill="#0F2740"/>
          <text x="38" y="57" text-anchor="middle" fill="#fff" font-size="12" font-family="Inter,system-ui,sans-serif" font-weight="600">Evento</text>
          <!-- Arrow 1 -->
          <line x1="76" y1="52" x2="96" y2="52" stroke="#5A6B79" stroke-width="1.5"/>
          <polygon points="96,47 104,52 96,57" fill="#5A6B79"/>
          <!-- Incertidumbre/Canal -->
          <rect x="104" y="22" width="88" height="60" rx="6" fill="#2D6EA3"/>
          <text x="148" y="48" text-anchor="middle" fill="#fff" font-size="11" font-family="Inter,system-ui,sans-serif">Incertidumbre</text>
          <text x="148" y="64" text-anchor="middle" fill="#DCE9F4" font-size="11" font-family="Inter,system-ui,sans-serif">Canal</text>
          <!-- Arrow 2 -->
          <line x1="192" y1="52" x2="212" y2="52" stroke="#5A6B79" stroke-width="1.5"/>
          <polygon points="212,47 220,52 212,57" fill="#5A6B79"/>
          <!-- Buffer -->
          <rect x="220" y="32" width="72" height="40" rx="6" fill="#0F2740"/>
          <text x="256" y="57" text-anchor="middle" fill="#fff" font-size="12" font-family="Inter,system-ui,sans-serif" font-weight="600">Buffer</text>
          <!-- Arrow 3 -->
          <line x1="292" y1="52" x2="312" y2="52" stroke="#5A6B79" stroke-width="1.5"/>
          <polygon points="312,47 320,52 312,57" fill="#5A6B79"/>
          <!-- Trade-off -->
          <rect x="320" y="32" width="80" height="40" rx="6" fill="#2D6EA3"/>
          <text x="360" y="57" text-anchor="middle" fill="#fff" font-size="12" font-family="Inter,system-ui,sans-serif">Trade-off</text>
          <!-- Arrow 4 -->
          <line x1="400" y1="52" x2="420" y2="52" stroke="#5A6B79" stroke-width="1.5"/>
          <polygon points="420,47 428,52 420,57" fill="#5A6B79"/>
          <!-- Acción + Indicadores -->
          <rect x="428" y="22" width="88" height="60" rx="6" fill="#0F2740"/>
          <text x="472" y="47" text-anchor="middle" fill="#fff" font-size="11" font-family="Inter,system-ui,sans-serif">Acción táctica</text>
          <text x="472" y="63" text-anchor="middle" fill="#DCE9F4" font-size="11" font-family="Inter,system-ui,sans-serif">+ Indicadores</text>
          <!-- Arrow 5 — INJECT (violeta, reservado semánticamente) -->
          <line x1="516" y1="52" x2="540" y2="52" stroke="#7b2d8b" stroke-width="2"/>
          <polygon points="540,46 550,52 540,58" fill="#7b2d8b"/>
          <text x="528" y="42" text-anchor="middle" fill="#7b2d8b" font-size="9" font-family="Inter,system-ui,sans-serif" font-weight="700">INJECT</text>
          <!-- Revisión -->
          <rect x="550" y="32" width="76" height="40" rx="6" fill="#2D6EA3"/>
          <text x="588" y="55" text-anchor="middle" fill="#fff" font-size="12" font-family="Inter,system-ui,sans-serif" font-weight="600">Revisi&#xF3;n</text>
          <!-- Feedback arc (vuelta) -->
          <path d="M 626 52 Q 648 90 588 98 Q 38 110 38 72" fill="none" stroke="#5A6B79" stroke-width="1" stroke-dasharray="4 3"/>
          <polygon points="34,67 38,77 42,67" fill="#5A6B79"/>
        </svg>
        <p style="font-size:var(--text-xs);color:var(--color-muted);text-align:center;margin-top:var(--sp-1)">El inject revela informaci&#xF3;n latente que no estaba disponible al momento de la decisi&#xF3;n inicial.</p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">E &mdash; Evento</div>
        <p>El hecho que abre la incertidumbre. Cuatro tipos (puede ser más de uno a la vez):</p>
        <ul class="modal-list">
          <li><strong>Súbito-discreto:</strong> ocurre en una ventana corta, con inicio identificable.</li>
          <li><strong>Acumulativo:</strong> una variable cruza un umbral tras meses de evolución: el evento es el cruce, no la evolución.</li>
          <li><strong>Cascada:</strong> un golpe en un canal dispara otros en secuencia y el efecto secundario supera al primero.</li>
          <li><strong>Legitimidad:</strong> altera la licencia social, política o institucional para operar.</li>
        </ul>
        <p class="modal-note">Un hecho que no entra en ninguno todavía no es evento: es un factor.</p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">Canales de impacto (por dónde golpea)</div>
        <p>Cinco: operacional, financiero, regulatorio-legal, legitimidad y modelo de negocio. Casi todo evento viaja por al menos dos; uno es el dominante, y nombrarlo es parte de entender el impacto.</p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">B &mdash; Buffer</div>
        <p>Una capacidad que te protege. Para que cuente como buffer debe cumplir dos cosas a la vez: operar sobre un canal nombrable (no "protege en general") y tener un costo de activación medible, en una de cuatro unidades: <strong>caja, tiempo, capital político o legitimidad</strong>. Si no cumple ambas, no es buffer: es contexto.</p>
        <p>Cada buffer se describe en tres ejes: <strong>potencia</strong> (cuánto absorbe), <strong>duración</strong> (cuánto dura antes de agotarse) y <strong>costo</strong> (qué pagas y en qué unidad).</p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">T &mdash; Trade-off</div>
        <p>Toda decisión protege algo a costa de otra cosa. Nombra qué proteges (X), qué sacrificas (Y) y qué riesgo residual queda en pie.</p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">A &mdash; Acción táctica (la decisión) + indicadores</div>
        <p>Formula la decisión y define cómo sabrás si va bien o si hay que revisar: dos indicadores (I1, I2) y un umbral T que, al cruzarse, dispara la revisión. La incertidumbre que pesa sobre la decisión tiene cuatro fuentes posibles &mdash;ocurrencia, magnitud, duración y actor&mdash;; nombra la principal.</p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">R &mdash; Revisión</div>
        <p>Cuando llega nueva información no ajustas al margen: reabres. Declara qué supuesto mantienes, cuál abandonas y cuál inviertes. Es lo que más distingue una decisión robusta de una terca.</p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">La frase completa (defendible ante un comité)</div>
        <div class="modal-phrase-box">
          "Dado el evento E, que abre la incertidumbre U sobre el canal C, protejo X mediante el buffer B (potencia, duración, costo), sacrifico parcialmente Y, monitoreo I1 e I2, y reviso la decisión si se cruza el umbral T."
        </div>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">Un ejemplo (de juguete)</div>
        <p>Una cafetería de barrio se entera un lunes de que el dueño del local le subirá el alquiler 40&nbsp;% en 30 días:</p>
        <div class="modal-example">
          "Dado el evento (alza súbita del alquiler), que abre incertidumbre de magnitud sobre el canal financiero, protejo el flujo de caja mediante un buffer de reserva (potencia media, dura ~2 meses, costo en caja), sacrifico parcialmente margen subiendo precios con moderación, monitoreo las ventas semanales y las quejas de clientes, y reviso si las ventas caen más de 15&nbsp;% en tres semanas."
        </div>
        <p class="modal-note" style="margin-top:var(--sp-3)">El ejemplo no es "la respuesta correcta": es la forma de una decisión que se puede defender y revisar.</p>
      </div>

      <div class="modal-footer">
        <button class="btn btn-primary modal-confirm">Entendido</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Close handlers
  overlay.querySelector('.modal-close').addEventListener('click', closeEbtaModal);
  overlay.querySelector('.modal-confirm').addEventListener('click', closeEbtaModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeEbtaModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.style.display !== 'none') closeEbtaModal();
  });

  return overlay;
}

export function openEbtaModal() {
  if (!_modal) _modal = buildModal();
  _modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  // Focus the close button for keyboard accessibility
  const closeBtn = _modal.querySelector('.modal-close');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
}

export function closeEbtaModal() {
  if (!_modal) return;
  _modal.style.display = 'none';
  document.body.style.overflow = '';
}
