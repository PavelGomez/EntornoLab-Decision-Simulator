---
title: "Caso 3 — Envases del Centro (caso final)"
subtitle: "Versión legible para el equipo docente · Análisis del Entorno · IESA · Pável Gómez · 2026"
---

# Caso 3 — Envases del Centro: tres frentes a la vez

*Caso final, individual y deliberadamente más complejo. La versión canónica es `cases/v1/caso-3.json` (se carga en EntornoLab). Esta es la versión legible para el equipo docente. La empresa es de ficción con fines didácticos; sector neutral (empaques industriales).*

**Sector:** manufactura de empaques (preformas PET y tapas) · **País:** VE · **Tamaño:** mediana · **Tiempo estimado:** 120 min · **Rol:** entrega final (individual).

## Señal inicial
En una misma semana se juntan tres cosas. **Lunes:** una resolución modifica el régimen de importación de la resina PET (insumo crítico), con sobrecosto inmediato y demoras de aduana de varias semanas. **Miércoles:** el cliente ancla (una embotelladora, 45% de las ventas) vuelve a recortar su pedido —cuarto recorte consecutivo— y desliza que "está evaluando opciones". **Jueves:** vecinos publican un video sobre los efluentes de la planta y convocan a una asamblea. La dirección debe presentar un plan a la junta el lunes siguiente.

## Briefing (resumen por secciones)
- **§1 La empresa.** Fabricante de empaques (220 empleados); negocio de volumen, márgenes estrechos; tres relaciones la sostienen (resina, clientes, licencia para operar); caja para 1–2 movimientos, no tres.
- **§2 El insumo crítico.** Resina PET importada (~60% del costo), proveedor único, sin sustituto nacional suficiente; divisas limitadas vía una sola banca. *(Latente para el inject de resina.)*
- **§3 El cliente ancla.** Embotelladora = 45% de ventas; demanda propia deprimida; estudia internalizar o migrar; el pedido se acerca al punto donde no cubre los fijos de su línea. *(Latente para el inject del cliente.)*
- **§4 La controversia comunitaria.** Efluentes al cauce en contexto de escasez de agua; reclamo que se organiza; ente ambiental "observa"; remediación posible pero cuesta caja y tiempo. *(Latente para el inject ambiental.)*
- **§5 Contexto y actores.** Proveedor extranjero, banca frágil, competidor que aseguró resina, ente ambiental, junta que exige plan. *(Latente para las réplicas.)*
- **§6 La decisión.** Jerarquizar los tres frentes con una sola caja y una semana; formular frase E-BTA/R defendible ante la junta.

## Buffers disponibles (cinco; el participante elige hasta 2)

| Buffer | Canal(es) | Unidad de costo |
|---|---|---|
| Inventario de seguridad de resina | operacional / modelo de negocio | tiempo |
| Reserva de caja en divisas | financiero / operacional | caja |
| Relación y contrato con el cliente ancla | modelo de negocio | capital político (comercial) |
| Relación con el ente ambiental | regulatorio-legal / legitimidad | capital político |
| Confianza de la comunidad | legitimidad | legitimidad |

**Buffers-trampa:** "sustituir la resina por proveedor nacional" (ilusorio: calidad/volumen insuficientes) y "usar el contrato para presionar al cliente" (perverso: acelera su salida).

## Injects (el facilitador elige) y réplicas (segunda etapa)

| Inject | Qué revela | § latente | Mueve el canal a |
|---|---|---|---|
| `anchor_client_exit` | La embotelladora internaliza y recorta 40% más | §3 | modelo de negocio |
| `environmental_inquiry` | El ente abre inspección; peligra el permiso | §4 | regulatorio-legal / legitimidad |
| `resin_shock` | El proveedor sube precio y retrasa; el inventario se vuelve cuenta regresiva | §2 | operacional |
| **Réplica** `competitor_captures_client` | Un competidor con resina asegurada se perfila a quedarse con el cliente | §5 | modelo de negocio (2.ª etapa) |
| **Réplica** `community_politicized` | Una autoridad local toma el caso como bandera | §4–§5 | legitimidad → político (2.ª etapa) |

## Incertidumbre del caso
Fuentes en juego: **actor** (¿el cliente se va? ¿la comunidad escala?), **magnitud** (¿cuánto encarece/retrasa la resina?), **ocurrencia** y **duración**. El dossier incluye escenarios con bandas de probabilidad.

## Notas para el facilitador (no mostrar al participante)
- **Sin opción dominante:** la caja no cubre los tres frentes; el participante debe jerarquizar y defender cuál es EL evento. Varias respuestas son válidas si el criterio es sólido.
- **Error central:** intentar cubrir los tres por igual, o no jerarquizar.
- **Interacción con injects:** el inject del cliente vuelve dominante el modelo de negocio; el ambiental, lo regulatorio (puede parar la planta); el de resina, lo operacional (sin insumo no hay nada que vender).
- **Calibración "Sobresaliente":** demarca EL evento, jerarquiza canales en competencia, cuantifica el buffer contra la caja, nombra el riesgo residual en los frentes no priorizados, y tras inject + réplica hace una revisión de **doble bucle** (cambia la jerarquía, no solo la táctica), con la ética comunitaria como sustancia.

*El detalle cuantitativo completo (estados financieros, mapa de actores con palanca/postura, economía de cada buffer, restricciones y cursos de acción) está en el dossier de `cases/v1/caso-3.json` y se muestra al participante en el simulador.*
