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
