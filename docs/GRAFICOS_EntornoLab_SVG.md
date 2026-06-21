# Gráficos de EntornoLab — SVG inline (autoría canónica)

> Todos los gráficos son **SVG inline** (sin imágenes externas, sin fotos). Usan la paleta de la familia y deben llevar `role="img"` + `aria-label`. En la página, los colores pueden cambiarse por `var(--navy)`, `var(--steel)`, etc.; aquí van en hex para que sean autocontenidos. En móvil, los diagramas anchos escalan con su `viewBox`; si quedan muy pequeños, permite **scroll horizontal** en su contenedor (`overflow-x:auto`) en vez de deformarlos. Nada de esto implica que el simulador puntúe: son diagramas que explican, no miden al usuario.
>
> Paleta: navy `#0F2740` · steel `#2D6EA3` · tinta `#1C2A35` · línea `#D8E0EA` · muted `#5A6B79` · canvas `#F3F6FA`. Acentos de los componentes: E `#0F2740` · B `#2D6EA3` · T `#2E7D6A` · A `#B26A00` · R `#6A4C93` · Inject `#B26A00`.

---

## 1. Diagrama del ciclo E-BTA/R  → home y sección "El marco E-BTA/R"

```html
<svg viewBox="0 0 1040 230" role="img" aria-label="Ciclo E-BTA/R: Evento, Incertidumbre y Canal, Buffer, Trade-off, Acción e Indicadores, Inject y Revisión; la Revisión reabre el encuadre por rondas." xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif">
  <defs>
    <marker id="arrF" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#2D6EA3"/></marker>
    <marker id="arrR" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#6A4C93"/></marker>
  </defs>
  <!-- nodos: x = 20,162,304,446,588,730,872 ; rect w120 h46 y58 -->
  <g font-size="12.5" text-anchor="middle">
    <g><rect x="20"  y="58" width="120" height="46" rx="9" fill="#FFFFFF" stroke="#2D6EA3" stroke-width="1.4"/><text x="80"  y="85" fill="#0F2740" font-weight="700">Evento</text></g>
    <g><rect x="162" y="58" width="120" height="46" rx="9" fill="#F3F6FA" stroke="#9DB2C9" stroke-width="1.2"/><text x="222" y="81" fill="#1C2A35">Incertidumbre</text><text x="222" y="95" fill="#1C2A35">/ Canal</text></g>
    <g><rect x="304" y="58" width="120" height="46" rx="9" fill="#FFFFFF" stroke="#2D6EA3" stroke-width="1.4"/><text x="364" y="85" fill="#0F2740" font-weight="700">Buffer</text></g>
    <g><rect x="446" y="58" width="120" height="46" rx="9" fill="#FFFFFF" stroke="#2D6EA3" stroke-width="1.4"/><text x="506" y="85" fill="#0F2740" font-weight="700">Trade-off</text></g>
    <g><rect x="588" y="58" width="120" height="46" rx="9" fill="#FFFFFF" stroke="#2D6EA3" stroke-width="1.4"/><text x="648" y="81" fill="#0F2740" font-weight="700">Acción</text><text x="648" y="95" fill="#1C2A35">+ Indicadores</text></g>
    <g><rect x="730" y="58" width="120" height="46" rx="9" fill="#B26A00" stroke="#8A5200" stroke-width="1.2"/><text x="790" y="85" fill="#FFFFFF" font-weight="700">Inject</text></g>
    <g><rect x="872" y="58" width="120" height="46" rx="9" fill="#FFFFFF" stroke="#6A4C93" stroke-width="1.6"/><text x="932" y="85" fill="#6A4C93" font-weight="700">Revisión</text></g>
  </g>
  <!-- flechas hacia adelante (y=81) -->
  <g stroke="#2D6EA3" stroke-width="1.6" marker-end="url(#arrF)">
    <line x1="142" y1="81" x2="160" y2="81"/><line x1="284" y1="81" x2="302" y2="81"/>
    <line x1="426" y1="81" x2="444" y2="81"/><line x1="568" y1="81" x2="586" y2="81"/>
    <line x1="710" y1="81" x2="728" y2="81"/><line x1="852" y1="81" x2="870" y2="81"/>
  </g>
  <!-- arco punteado de retorno: Revisión -> Evento -->
  <path d="M 932 106 C 932 196, 80 196, 80 106" fill="none" stroke="#6A4C93" stroke-width="1.6" stroke-dasharray="5 4" marker-end="url(#arrR)"/>
  <text x="506" y="150" text-anchor="middle" font-size="12" fill="#6A4C93">La R reabre el encuadre · revisión por rondas</text>
  <text x="790" y="40" text-anchor="middle" font-size="10.5" fill="#8A5200">revela información latente</text>
  <text x="80"  y="128" text-anchor="middle" font-size="10.5" fill="#5A6B79">el hecho que abre incertidumbre</text>
</svg>
```

---

## 2. Tira de la ruta de 10 pasos (lineal, con inject y no-retorno)  → home y "Guía de uso"

```html
<svg viewBox="0 0 1010 110" role="img" aria-label="Ruta de 10 pantallas: Briefing, Clasificación, Impacto, Buffers, Trade-off, Decisión, Indicadores, Inject (paso 8, punto de no retorno), Revisión y Export (PDF)." xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif">
  <!-- línea base -->
  <line x1="40" y1="40" x2="970" y2="40" stroke="#D8E0EA" stroke-width="2"/>
  <!-- 10 nodos: cx = 40 + i*103.3 -->
  <g text-anchor="middle">
    <!-- helper visual: cada nodo = círculo r16 + número + etiqueta -->
    <g><circle cx="40"  cy="40" r="16" fill="#2D6EA3"/><text x="40"  y="45" fill="#fff" font-size="13" font-weight="700">1</text><text x="40"  y="74" fill="#1C2A35" font-size="9">Briefing</text></g>
    <g><circle cx="143" cy="40" r="16" fill="#2D6EA3"/><text x="143" y="45" fill="#fff" font-size="13" font-weight="700">2</text><text x="143" y="74" fill="#1C2A35" font-size="9">Clasif.</text></g>
    <g><circle cx="246" cy="40" r="16" fill="#2D6EA3"/><text x="246" y="45" fill="#fff" font-size="13" font-weight="700">3</text><text x="246" y="74" fill="#1C2A35" font-size="9">Impacto</text></g>
    <g><circle cx="349" cy="40" r="16" fill="#2D6EA3"/><text x="349" y="45" fill="#fff" font-size="13" font-weight="700">4</text><text x="349" y="74" fill="#1C2A35" font-size="9">Buffers</text></g>
    <g><circle cx="452" cy="40" r="16" fill="#2D6EA3"/><text x="452" y="45" fill="#fff" font-size="13" font-weight="700">5</text><text x="452" y="74" fill="#1C2A35" font-size="9">Trade-off</text></g>
    <g><circle cx="555" cy="40" r="16" fill="#2D6EA3"/><text x="555" y="45" fill="#fff" font-size="13" font-weight="700">6</text><text x="555" y="74" fill="#1C2A35" font-size="9">Decisión</text></g>
    <g><circle cx="658" cy="40" r="16" fill="#2D6EA3"/><text x="658" y="45" fill="#fff" font-size="13" font-weight="700">7</text><text x="658" y="74" fill="#1C2A35" font-size="9">Indic.</text></g>
    <g><circle cx="761" cy="40" r="17" fill="#B26A00"/><text x="761" y="45" fill="#fff" font-size="13" font-weight="700">8</text><text x="761" y="75" fill="#8A5200" font-size="9" font-weight="700">Inject</text></g>
    <g><circle cx="864" cy="40" r="16" fill="#6A4C93"/><text x="864" y="45" fill="#fff" font-size="13" font-weight="700">9</text><text x="864" y="74" fill="#1C2A35" font-size="9">Revisión</text></g>
    <g><circle cx="967" cy="40" r="16" fill="#0F2740"/><text x="967" y="45" fill="#fff" font-size="12" font-weight="700">10</text><text x="967" y="74" fill="#1C2A35" font-size="9">Export · PDF</text></g>
  </g>
  <!-- barrera de no-retorno tras el inject -->
  <line x1="709" y1="20" x2="709" y2="66" stroke="#B26A00" stroke-width="1.4" stroke-dasharray="4 3"/>
  <g><rect x="703" y="9" width="12" height="9" rx="1.5" fill="#B26A00"/><path d="M705.5 9 V6.5 a3.5 3.5 0 0 1 7 0 V9" fill="none" stroke="#B26A00" stroke-width="1.2"/></g>
  <text x="709" y="100" text-anchor="middle" font-size="9.5" fill="#8A5200">desde el inject no se vuelve atrás</text>
</svg>
```

---

## 3. Anatomía de la frase E-BTA/R (HTML, no SVG — es texto, debe ser accesible)  → home y "El marco"

> Render como HTML con "chips" de color por componente y una leyenda. Las letras E/B/T/A/R usan los acentos de componente.

```html
<p class="ebta-frase" style="line-height:1.9;font-size:1.05rem">
  Dado el <span class="chip" style="background:#0F2740;color:#fff">evento (E)</span>,
  que abre la <span class="chip" style="background:#E7EDF4;color:#0F2740">incertidumbre sobre el canal (C)</span>,
  protejo X mediante el <span class="chip" style="background:#2D6EA3;color:#fff">buffer (B)</span>,
  sacrifico parcialmente Y <span class="chip" style="background:#2E7D6A;color:#fff">(trade-off, T)</span>,
  monitoreo I1 e I2 con un umbral <span class="chip" style="background:#B26A00;color:#fff">(acción + indicadores, A)</span>,
  y <span class="chip" style="background:#6A4C93;color:#fff">reviso (R)</span> si llega nueva información.
</p>
<!-- .chip { padding:2px 8px; border-radius:999px; font-weight:600; white-space:nowrap } -->
<p class="ebta-leyenda" style="color:#5A6B79;font-size:.9rem">
  <b>E</b> Evento · <b>B</b> Buffer · <b>T</b> Trade-off · <b>A</b> Acción táctica + indicadores · <b>R</b> Revisión
</p>
```

---

## 4. Los 5 canales de impacto  → componente "Canales"

```html
<svg viewBox="0 0 460 230" role="img" aria-label="Un evento se transmite por cinco canales: operacional, financiero, regulatorio-legal, legitimidad y modelo de negocio; uno es el dominante." xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif" font-size="12">
  <circle cx="230" cy="115" r="34" fill="#0F2740"/><text x="230" y="112" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">Evento</text><text x="230" y="127" text-anchor="middle" fill="#cfe0f0" font-size="9">5 canales</text>
  <g stroke="#9DB2C9" stroke-width="1.4">
    <line x1="196" y1="95" x2="92" y2="46"/><line x1="196" y1="108" x2="80" y2="115"/>
    <line x1="200" y1="130" x2="96" y2="186"/><line x1="264" y1="100" x2="372" y2="56"/>
    <line x1="264" y1="125" x2="372" y2="172"/>
  </g>
  <g text-anchor="middle">
    <g><rect x="8"   y="30"  width="128" height="30" rx="8" fill="#FFFFFF" stroke="#2D6EA3"/><text x="72"  y="49" fill="#0F2740">Operacional</text></g>
    <g><rect x="6"   y="100" width="120" height="30" rx="8" fill="#2D6EA3" stroke="#245A86"/><text x="66"  y="119" fill="#fff" font-weight="700">Financiero ★</text></g>
    <g><rect x="14"  y="172" width="150" height="30" rx="8" fill="#FFFFFF" stroke="#2D6EA3"/><text x="89"  y="191" fill="#0F2740">Regulatorio-legal</text></g>
    <g><rect x="330" y="40"  width="124" height="30" rx="8" fill="#FFFFFF" stroke="#2D6EA3"/><text x="392" y="59" fill="#0F2740">Legitimidad</text></g>
    <g><rect x="320" y="158" width="140" height="30" rx="8" fill="#FFFFFF" stroke="#2D6EA3"/><text x="390" y="177" fill="#0F2740">Modelo de negocio</text></g>
  </g>
  <text x="66" y="146" text-anchor="middle" font-size="9.5" fill="#245A86">★ dominante (ejemplo)</text>
</svg>
```

---

## 5. El buffer en 3 ejes  → componente "Buffer"

```html
<svg viewBox="0 0 460 170" role="img" aria-label="Un buffer se caracteriza por tres ejes: potencia (baja, media, alta), duración (una ronda, varias, persistente) y costo (bajo, medio, alto) en una unidad: caja, tiempo, capital político o legitimidad." xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif" font-size="11.5">
  <g>
    <text x="12" y="30" fill="#0F2740" font-weight="700">Potencia</text>
    <g><rect x="120" y="18" width="96" height="18" rx="4" fill="#E7EDF4"/><rect x="216" y="18" width="96" height="18" rx="4" fill="#2D6EA3"/><rect x="312" y="18" width="96" height="18" rx="4" fill="#E7EDF4"/></g>
    <text x="168" y="31" text-anchor="middle" fill="#5A6B79">baja</text><text x="264" y="31" text-anchor="middle" fill="#fff">media</text><text x="360" y="31" text-anchor="middle" fill="#5A6B79">alta</text>
  </g>
  <g>
    <text x="12" y="74" fill="#0F2740" font-weight="700">Duración</text>
    <g><rect x="120" y="62" width="96" height="18" rx="4" fill="#2D6EA3"/><rect x="216" y="62" width="96" height="18" rx="4" fill="#E7EDF4"/><rect x="312" y="62" width="96" height="18" rx="4" fill="#E7EDF4"/></g>
    <text x="168" y="75" text-anchor="middle" fill="#fff">1 ronda</text><text x="264" y="75" text-anchor="middle" fill="#5A6B79">varias</text><text x="360" y="75" text-anchor="middle" fill="#5A6B79">persistente</text>
  </g>
  <g>
    <text x="12" y="118" fill="#0F2740" font-weight="700">Costo</text>
    <g><rect x="120" y="106" width="96" height="18" rx="4" fill="#E7EDF4"/><rect x="216" y="106" width="96" height="18" rx="4" fill="#E7EDF4"/><rect x="312" y="106" width="96" height="18" rx="4" fill="#B26A00"/></g>
    <text x="168" y="119" text-anchor="middle" fill="#5A6B79">bajo</text><text x="264" y="119" text-anchor="middle" fill="#5A6B79">medio</text><text x="360" y="119" text-anchor="middle" fill="#fff">alto</text>
  </g>
  <text x="12" y="145" fill="#5A6B79" font-size="10.5">Unidad de costo: caja · tiempo · capital político · legitimidad.</text>
  <text x="12" y="160" fill="#5A6B79" font-size="10.5">(Los rellenos son ilustrativos, no una medición del usuario.)</text>
</svg>
```

---

## 6. Mapa de actores (esquema)  → componente "Incertidumbre" (fuente "actor") y dossier

```html
<svg viewBox="0 0 460 220" role="img" aria-label="Mapa de actores: la organización en el centro y los actores alrededor, con su palanca y postura; algunos pueden cambiar el escenario." xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif" font-size="11">
  <g stroke="#9DB2C9" stroke-width="1.3">
    <line x1="230" y1="110" x2="96" y2="42"/><line x1="230" y1="110" x2="364" y2="42"/>
    <line x1="230" y1="110" x2="70" y2="150"/><line x1="230" y1="110" x2="390" y2="150"/>
    <line x1="230" y1="110" x2="230" y2="196"/>
  </g>
  <circle cx="230" cy="110" r="40" fill="#0F2740"/><text x="230" y="107" text-anchor="middle" fill="#fff" font-weight="700">Organización</text><text x="230" y="122" text-anchor="middle" fill="#cfe0f0" font-size="9">tú decides</text>
  <g text-anchor="middle">
    <g><rect x="34" y="22" width="124" height="34" rx="8" fill="#FFFFFF" stroke="#2D6EA3"/><text x="96" y="38" fill="#0F2740" font-weight="700">Regulador</text><text x="96" y="50" fill="#5A6B79" font-size="9">palanca alta</text></g>
    <g><rect x="302" y="22" width="124" height="34" rx="8" fill="#FFFFFF" stroke="#2D6EA3"/><text x="364" y="38" fill="#0F2740" font-weight="700">Competidor</text><text x="364" y="50" fill="#5A6B79" font-size="9">palanca media</text></g>
    <g><rect x="8" y="134" width="124" height="34" rx="8" fill="#FFFFFF" stroke="#2D6EA3"/><text x="70" y="150" fill="#0F2740" font-weight="700">Actor político</text><text x="70" y="162" fill="#5A6B79" font-size="9">postura ambivalente</text></g>
    <g><rect x="328" y="134" width="124" height="34" rx="8" fill="#FFFFFF" stroke="#2D6EA3"/><text x="390" y="150" fill="#0F2740" font-weight="700">Usuario / base</text><text x="390" y="162" fill="#5A6B79" font-size="9">puede "correr"</text></g>
    <g><rect x="168" y="186" width="124" height="30" rx="8" fill="#FFFFFF" stroke="#2D6EA3"/><text x="230" y="205" fill="#0F2740" font-weight="700">Aliado clave</text></g>
  </g>
</svg>
```

---

## 7. Glifos de sector (tarjetas de caso)  → 24×24, trazo `currentColor`, sin relleno

```html
<!-- A · Fintech (tarjeta + moneda) -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="6" width="14" height="10" rx="2"/><line x1="2.5" y1="9.5" x2="16.5" y2="9.5"/><circle cx="18" cy="15" r="4"/></svg>

<!-- B · Consumo masivo (caja/paquete) -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><line x1="12" y1="11" x2="12" y2="21"/></svg>

<!-- C · Reparto (bolsa de delivery) -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>
```

---

## 8. Íconos de sección de la barra  → mismo estilo: 20–24px, `fill="none" stroke="currentColor" stroke-width="1.6"`

Autoría: usa un set de íconos de línea **coherente** (estilo Lucide/Feather), uno por sección, con el mismo trazo y tamaño. Asignación sugerida: **Inicio** casa · **El marco E-BTA/R** diagrama/nodos conectados · **Componentes** cuadrícula (grid) · **Ejemplos** bombilla · **Casos** carpeta · **Guía de uso** libro abierto · **Glosario** lista A-Z · **Referencias** comillas/marcador · **Iniciar recorrido** flecha en círculo. Ejemplos:

```html
<!-- Inicio -->
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></svg>
<!-- Componentes (grid) -->
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
<!-- Glosario (A-Z) -->
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="7" x2="14" y2="7"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="17" x2="11" y2="17"/><path d="M17 8l3 8M18.2 13h3.6"/></svg>
```

(Completa los demás en el mismo estilo. Si prefieres no incrustar 9 SVG a mano, puedes cargar el set de iconos de línea como fuente/SVG sprite, manteniendo trazo 1.6 y `currentColor`.)
