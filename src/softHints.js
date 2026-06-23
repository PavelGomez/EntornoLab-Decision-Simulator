/*
 * softHints.js — Validaciones blandas, keyword-based, en cliente (v1.5).
 *
 * Principio: NO bloquea, NO puntúa, NO usa IA. Cuando un campo contiene un
 * término vago, muestra una pista inline pidiendo especificar. Las pistas son
 * orientación pedagógica; el participante puede ignorarlas y avanzar igual.
 *
 * Cada regla declara los "scopes" (contextos de campo) en los que aplica.
 * Una regla con scope '*' aplica en cualquier campo donde se enganche.
 */

// Reglas término → pista. `match(v)` recibe el texto del campo (string).
const RULES = [
  {
    scopes: ['evento', 'incertidumbre'],
    match: (v) => /\bvuca\b/i.test(v) || /\bincertidumbre\b/i.test(v),
    hint: 'VUCA es vocabulario, no diagnóstico. Traduce a una fuente: ocurrencia, magnitud, duración o actor.',
  },
  {
    scopes: ['evento'],
    match: (v) => /\binflaci[oó]n\b/i.test(v) || /\bel entorno\b/i.test(v) || /\bla crisis\b/i.test(v),
    hint: '¿Es factor o evento? Nombra el hecho o umbral que obliga a decidir ahora.',
  },
  {
    scopes: ['buffer'],
    match: (v) => /\bmarca\b/i.test(v) || /\bexperiencia\b/i.test(v) || /\bcontactos\b/i.test(v) || /\bequipo\b/i.test(v),
    hint: 'Un recurso no es buffer hasta que nombras canal, mecanismo, potencia, duración y costo.',
  },
  {
    scopes: ['impacto'],
    match: (v) => /afecta\s+(a\s+)?todo/i.test(v) || /afecta\s+a\s+toda\s+la\s+empresa/i.test(v),
    hint: 'Jerarquiza: ¿cuál es el canal dominante?',
  },
  {
    scopes: ['accion'],
    match: (v) => /\besperar\b/i.test(v) || /esperar\s+y\s+ver/i.test(v),
    hint: '¿Esperar protegiendo qué, hasta qué señal? Si no, no es decisión.',
  },
  {
    // Umbral sin número/condición: si hay texto pero ningún dígito, falta valor.
    scopes: ['umbral'],
    match: (v) => v.trim().length > 0 && !/\d/.test(v),
    hint: 'Un umbral necesita valor y ventana de tiempo (p. ej. "si cae >15% en 3 semanas").',
  },
  {
    // Aplica en cualquier campo donde se enganche.
    scopes: ['*'],
    match: (v) => /cisne\s+negro/i.test(v),
    hint: '¿Había señales previas? Si sí, es rinoceronte gris, no cisne negro.',
  },
];

// Alertas fijas de "error frecuente" (nota breve junto a los campos).
export const FREQUENT_ERRORS_NOTE =
  'factor ≠ evento · recurso ≠ buffer · esperar ≠ opción real · indicador sin umbral no sirve.';

/**
 * Calcula las pistas activas para un valor de campo dado y un conjunto de scopes.
 * Devuelve un array de strings (sin duplicados).
 */
export function computeSoftHints(value, scopes = []) {
  const v = String(value || '');
  if (!v.trim()) return [];
  const out = [];
  RULES.forEach((r) => {
    const inScope = r.scopes.includes('*') || r.scopes.some((s) => scopes.includes(s));
    if (inScope && r.match(v) && !out.includes(r.hint)) out.push(r.hint);
  });
  return out;
}

/**
 * Crea (y devuelve) el contenedor donde se renderizan las pistas blandas.
 * Insértalo en el DOM justo debajo del campo correspondiente.
 */
export function makeSoftHintBox() {
  const box = document.createElement('div');
  box.className = 'soft-hints';
  box.setAttribute('aria-live', 'polite');
  return box;
}

/**
 * Engancha pistas blandas a un input/textarea. Renderiza en `box` (si se pasa)
 * o crea uno nuevo y lo devuelve. No bloquea ni puntúa: solo muestra/oculta.
 * Devuelve el contenedor de pistas para que el llamador lo posicione.
 */
export function attachSoftHints(inputEl, scopes = [], box = null) {
  const target = box || makeSoftHintBox();
  function update() {
    const hints = computeSoftHints(inputEl.value, scopes);
    target.innerHTML = '';
    hints.forEach((h) => {
      const p = document.createElement('p');
      p.className = 'soft-hint';
      p.textContent = h;
      target.appendChild(p);
    });
  }
  inputEl.addEventListener('input', update);
  inputEl.addEventListener('change', update);
  update();
  return target;
}

/**
 * Crea una nota breve de "error frecuente" para mostrar junto a un grupo de
 * campos. Es estática (no reactiva): solo recuerda las distinciones del marco.
 */
export function makeFrequentErrorsNote(text = FREQUENT_ERRORS_NOTE) {
  const note = document.createElement('p');
  note.className = 'soft-alert';
  note.textContent = text;
  return note;
}
