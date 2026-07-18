/*
 * canon.js — Fuente ÚNICA del contrato de esta edición (jul 2026).
 *
 * Landing, Centro de Aprendizaje, P10/Export y cualquier guía incluida en el
 * producto deben CONSUMIR estas constantes en lugar de repetir el contrato con
 * sus propias palabras. Cambiar la edición = cambiar aquí, una sola vez.
 *
 * Decisiones canónicas (no reabrir): edición TTX; A–C práctica/transferencia;
 * Caso 3 es la entrega evaluable; el recorrido produce PDF + JSON con el mismo
 * verifyCode; el memo (1.200–1.500 palabras) es el único producto calificado;
 * el simulador no puntúa; el verifyCode no certifica autoría ni calidad.
 */

// Versión única del simulador. NO hardcodear otra versión en ningún archivo.
export const SIM_VERSION = 'v1.8';

// Modalidad de esta edición. Wargame y réplica adversarial quedan fuera.
export const MODALITY = 'ttx';
export const MODALITY_LABEL = 'Tabletop (TTX)';

// Roles de los casos.
export const CASE_ROLES = {
  A: 'práctica (ancla)',
  B: 'práctica (transferencia)',
  C: 'práctica (portable)',
  '3': 'entrega individual evaluable',
};

// Contrato canónico (Entregable 12). Un solo texto, reutilizable.
export const CONTRACT_TEXT =
  'Practica con los casos A, B y C; la entrega individual es sobre el Caso 3. ' +
  'El recorrido genera un PDF ejecutivo y un JSON de cotejo con el mismo verifyCode: ' +
  'descarga y adjunta ambos como evidencia de proceso. El memo de 1.200–1.500 palabras ' +
  'es el único producto calificado. La modalidad de esta edición es TTX: un inject y una ' +
  'revisión. El simulador no puntúa y el verifyCode no certifica autoría.';

// Versión corta para píes de página / chips.
export const CONTRACT_SHORT =
  'A–C práctica · Caso 3 entrega · PDF + JSON (mismo verifyCode) · el memo es lo único calificado · TTX.';

// Límite honesto del verifyCode (leyenda de integridad).
export const VERIFYCODE_LIMIT =
  'El verifyCode confirma que el PDF y el JSON son consistentes entre sí; ' +
  'no prueba autoría humana ni calidad del trabajo.';
