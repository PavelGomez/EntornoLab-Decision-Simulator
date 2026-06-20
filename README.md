# EntornoLab — Simulador de decisión bajo incertidumbre

Simulador web **estático** que da soporte estructurado a una decisión gerencial bajo incertidumbre, para el curso **Análisis del Entorno** (PAG Global Online · IESA · Venezuela). Es parte de la familia de simuladores educativos de [@PavelGomez](https://github.com/PavelGomez), junto a [MacroLab-Shock-Simulator](https://github.com/PavelGomez/MacroLab-Shock-Simulator) y [MercaLab-Equilibrium-Simulator](https://github.com/PavelGomez/MercaLab-Equilibrium-Simulator).

**El simulador no es un juego y no produce puntaje.** Acompaña al participante por un ciclo de decisión bajo el marco **E-BTA/R**, captura su razonamiento en campos de texto estructurados, lo somete a un *inject* que reabre la decisión, y exporta todo a PDF. La evaluación ocurre **fuera del motor**, a cargo de un facilitador con una rúbrica.

> **Estado del repositorio.** Esta es la base de datos y documentación del simulador: los tres casos calibrados (`cases/v1/`), el esquema y las guías. La aplicación web (las 10 pantallas) se construye a partir del prompt de desarrollo que acompaña a la entrega (`PROMPT_Claude_Code_EntornoLab.md`). Mientras el motor no exista, los casos se pueden ejecutar en papel sin perder nada esencial: el marco es independiente del simulador.

## Estructura

```
EntornoLab-Decision-Simulator/
├── index.html              # (lo crea el build) punto de entrada, rutas relativas
├── .nojekyll               # evita que GitHub Pages procese con Jekyll
├── LICENSE
├── src/                    # (lo crea el build) motor y 10 pantallas
├── styles/                 # (lo crea el build) tokens tipográficos + layout mobile-first
├── cases/
│   └── v1/
│       ├── caso-A.json     # Vala Pagos (fintech, ancla)
│       ├── caso-B.json     # Provista (consumo, transferencia)
│       ├── caso-C.json     # Rauda (plataforma, portable)
│       └── schema.md       # esquema del caso v1 y reglas de validación
└── docs/
    ├── guia-facilitador.md
    ├── guia-participante.md
    ├── plantilla-memo.md
    └── checklist-piloto.md
```

## Cómo correr local

El simulador carga los casos con `fetch`, así que **necesita un servidor estático**: abrir el `index.html` con doble clic (`file://`) no funciona. Desde la raíz del repo:

```bash
python3 -m http.server 8000
# luego abrir http://localhost:8000/
```

(o la extensión *Live Server* de VS Code).

## Cómo desplegar en GitHub Pages

Mismo patrón que los repos hermanos: estático, sin bundler, servido desde `main`.

1. Subir el contenido a la rama `main`.
2. *Settings → Pages* → **Source: `main` / `(root)`**.
3. El sitio queda en `https://pavelgomez.github.io/EntornoLab-Decision-Simulator/`.
4. El archivo `.nojekyll` (incluido) asegura que Pages no ignore `src/`, `styles/` ni `cases/`.
5. Verificar el `fetch` de los casos **en la URL pública**, no solo en `localhost` (con rutas relativas debe resolver bien bajo la subruta del project page).

Dominio institucional opcional: añadir un archivo `CNAME` con el subdominio que provea el IESA.

## Cómo añadir un caso nuevo

1. Copiar un JSON existente de `cases/v1/` y editarlo siguiendo `cases/v1/schema.md`.
2. Respetar las taxonomías cerradas (4 tipos de evento, 5 canales, 4 fuentes de incertidumbre, 4 unidades de costo) y la regla de los 3 injects, cada uno referenciando un `§` del briefing.
3. Registrarlo donde el motor lista los casos. **No hace falta tocar el código del motor**: los casos son datos.

## Principios de diseño (no negociables)

- Soporte, no adversario: el motor no puntúa, no recomienda, no usa IA.
- Sin backend: HTML/CSS/JS estático, sin login ni base de datos.
- Casos como datos: cero acoplamiento al dominio.
- Corazón pedagógico (no se corta nunca): **inject + revisión forzada**. El inject revela información que el briefing ya contenía; tras revelarlo no hay retroceso.

## Créditos

Diseño y dirección: Pável Gómez · IESA. Marco E-BTA/R y especificación v1.0 (junio 2026).
