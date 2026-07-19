# Checklist de piloto — EntornoLab v1

Lista verificable que el motor debe pasar antes del piloto. Cada criterio se prueba en la **URL pública** (GitHub Pages), en móvil y escritorio, no solo en `localhost`.

## Criterios de aceptación del motor

- [ ] **C1 — Usabilidad.** Un usuario nuevo completa las 10 pantallas del Caso A sin instrucción técnica. Ninguna pantalla permite avanzar con campos obligatorios vacíos; ninguna se traba. (Apunta al criterio del piloto: 80 % completa el ciclo sin asistencia.)
- [ ] **C2 — Integridad del mecanismo.** Tras la Pantalla 8 es imposible volver a las pantallas 1–7 (botón atrás del navegador, gestos, recarga). El inject mostrado es el seleccionado por el profesor o el por defecto.
- [ ] **C3 — Captura completa para la rúbrica.** El export contiene, legible y ordenado: clasificación + criterio, incertidumbre, mapa de impacto (1.ª y 2.ª ronda), buffers con los 3 ejes y unidad de costo, trade-off con riesgo residual, frase E-BTA/R inicial, inject, supuestos mantenido/abandonado/invertido y frase E-BTA/R revisada.
- [ ] **C4 — Honestidad.** Ninguna pantalla puntúa, recomienda ni corrige. Búsqueda de texto: no aparecen "puntaje", "score", "correcto", "incorrecto", "ganaste".
- [ ] **C5 — Portabilidad.** Cargar el Caso B o C sin tocar código. Un caso malformado produce un error claro, no una pantalla en blanco.
- [ ] **C6 — PDF en español.** Acentos, ñ, ¿/¡ y comillas se renderizan bien en el PDF; si no, la vista imprimible funciona como fallback.
- [ ] **C7 — Navegadores.** Smoke test OK en Chrome, Edge, Safari y Firefox (últimas dos versiones), móvil y escritorio.

## Criterios de éxito del piloto (se miden con participantes reales)

- [ ] El 80 % de los participantes completa el ciclo del Caso A en el simulador **sin asistencia técnica**.
- [ ] El 70 % de los memos alcanza nivel "Sólido" o superior en al menos **3 de las 4 dimensiones** de la rúbrica.
- [ ] Dos evaluadores independientes coinciden absolutamente en el nivel asignado en al menos el **70 %** de las dimensiones.

## Lo que NO se mide en el piloto

Impacto en la decisión real del participante en su organización · retención a 6 meses · transferencia a casos no presentes en el curso. Medirlos sería incoherente con la promesa del curso.

## Plan B

Fechas de esta cohorte: **lunes 20 y miércoles 22 de julio de 2026**. El motor está desplegado (TTX, v1.8). Plan B si falla un P0 en el smoke test preclase: ejecutar la sesión con el **sitio público e inject por defecto**; si el motor completo falla, usar **plantillas en papel para el Caso A** y la plantilla E-BTA/R. El marco pedagógico es independiente del simulador.
