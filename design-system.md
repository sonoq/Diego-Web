# Design System — Diego Peribañez Villalba
# Architectural Minimalism

## Paleta de Colores

| Token                     | Hex       | Uso                              |
|---------------------------|-----------|----------------------------------|
| Primary                   | `#000000` | Texto principal, CTAs            |
| Primary Container         | `#1C1B1B` | Gradientes hero, hover           |
| Secondary                 | `#6D5A51` | Acentos cálidos, elementos sutil |
| Background / Surface      | `#FCF9F8` | Fondo base (papel cálido)        |
| Surface Container Low     | `#F6F3F2` | Secciones alternas               |
| Surface Container Lowest  | `#FFFFFF` | Tarjetas elevadas                |
| Surface Container High    | `#EBE7E7` | Hover state                      |
| On Primary                | `#FFFFFF` | Texto sobre negro                |
| On Surface                | `#000000` | Texto principal                  |
| On Surface Variant        | `#49454F` | Texto secundario, labels         |
| Outline                   | `#79747E` | Bordes inputs                    |
| Outline Variant            | `#C4C7C7` | Ghost borders (20% opacidad)     |

## Tipografía

| Elemento     | Fuente | Peso | Tracking  |
|--------------|--------|------|-----------|
| Display/Hero | Inter  | 900  | -4%       |
| H2 Sección   | Inter  | 800  | -3%       |
| Body         | Inter  | 400  | Normal    |
| Label        | Inter  | 500  | +10% caps |

## Reglas de Estilo

1. **0px border-radius** — Todo esquina recta, estética arquitectónica
2. **Fondo cálido** — Off-white (#FCF9F8), nunca blanco frío
3. **Sin bordes 1px** — Separación mediante cambios tonales de superficie
4. **Sombras ambient** — `0px 24px 48px rgba(28, 27, 27, 0.06)`
5. **Tipografía como héroe** — Headlines masivos, tracking comprimido
6. **Espacio generoso** — Macro-margin de 7-8.5rem entre secciones
7. **Mobile-first** — Responsive en todo momento
