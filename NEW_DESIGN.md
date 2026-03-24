```markdown
# Design System Specification: Architectural Minimalism

## 1. Overview & Creative North Star
**Creative North Star: The Monolith & The Void**

This design system is inspired by high-end architectural practice: the tension between heavy, permanent structures and the light that flows through them. It is designed to feel professional, avant-garde, and meticulously structured. We move beyond "standard" UI by treating the digital canvas as a physical site where content is "constructed" rather than just placed.

To break the "template" look, we employ **Intentional Asymmetry**. By utilizing a rigid grid but purposefully leaving entire columns or quadrants empty, we create a sense of luxury through "wasted" space. The system rejects the clutter of traditional UI in favor of a bold, editorial impact where the void is as important as the substance.

---

## 2. Colors & Tonal Depth

### The Palette
The core experience is driven by **Primary (#000000)** and **Background (#FCF9F8)**. We use a warm-neutral base to prevent the interface from feeling "hospital cold," providing a sophisticated, paper-like quality.

### The "No-Line" Rule
Traditional 1px borders are largely prohibited for sectioning. Boundaries are defined by the structural integrity of color shifts. 
- **Sectioning:** Transition from `surface` to `surface-container-low` to define new content areas. 
- **The Tonal Anchor:** Use `secondary` (#6D5A51) sparingly as a grounding accent for interactive elements or subtle textural shifts.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked architectural planes:
- **Level 0 (Base):** `surface` (#FCF9F8) – The site foundation.
- **Level 1 (Sections):** `surface-container-low` (#F6F3F2) – For broad content blocks.
- **Level 2 (Objects):** `surface-container-lowest` (#FFFFFF) – For cards or elevated modules that need to "pop" against the warm base.

### Signature Textures
Main CTAs or Hero backgrounds should utilize a subtle gradient from `primary` (#000000) to `primary_container` (#1C1B1B). This 10-degree linear shift adds "soul" and prevents the black from appearing flat or "dead" on digital screens.

---

## 3. Typography: The Editorial Voice

We utilize a high-contrast pairing that balances technical precision with heritage elegance.

- **Display & Headline (TWK Lausanne Pan / Inter):** These are the "structural beams." Set these with tight tracking (-2% to -4%) and heavy weights. They should feel massive, authoritative, and unapologetically bold.
- **Title & Body (Tartuffo / Inter):** Use **Tartuffo** for titles where a touch of avant-garde serif sophistication is needed (30% usage). Use **Inter** for body copy to ensure maximum legibility against the high-contrast background.
- **Label & Utility (Inter Mono/Small Caps):** Use `label-md` and `label-sm` for technical data, metadata, or navigation. These should be set in all-caps with generous letter spacing (+5% to +10%) to contrast with the dense headings.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved through **Tonal Layering** rather than drop shadows.
- To create a "lifted" effect, place a `surface-container-lowest` card on top of a `surface-container` background. The slight shift from off-white to pure white creates a clean, architectural edge.

### Ambient Shadows
When an element must float (e.g., a modal or floating menu), use an **Ambient Shadow**:
- **Shadow:** `0px 24px 48px rgba(28, 27, 27, 0.06)`
- This creates a soft, natural diffusion that mimics light hitting a physical surface, rather than a digital "glow."

### The "Ghost Border"
While 1px solid borders are generally avoided, a **Ghost Border** may be used for interactive inputs. 
- **Token:** `outline-variant` (#C4C7C7) at **20% opacity**. 
- This provides a whisper of structure without interrupting the flow of negative space.

---

## 5. Components

### Buttons
- **Primary:** Solid `primary` (#000000) with `on-primary` (#FFFFFF) text. Rectangular (0px radius). High padding: `spacing-4` (horizontal) and `spacing-3` (vertical).
- **Secondary:** Ghost Border (`outline-variant` at 20%) with `primary` text.
- **Tertiary:** Underlined text using `spacing-px` height, offset by `spacing-1`.

### Input Fields
- **Architecture:** No background fill. Only a bottom border (1px) using `outline`.
- **States:** On focus, the bottom border thickens to 2px `primary`. Helper text uses `label-sm` in `on-surface-variant`.

### Cards & Lists
- **Prohibition:** No divider lines between list items.
- **Separation:** Use `spacing-6` or `spacing-8` vertical white space to separate items.
- **Hover State:** Entire item background shifts to `surface-container-high` (#EBE7E7) with a 0px radius.

### Navigation (The Minimalist Bar)
- **Style:** Transparent background. 
- **Items:** `label-md` all-caps.
- **Active State:** A small `primary` dot (2px) centered beneath the label, or a simple weight shift.

---

## 6. Do’s and Don’ts

### Do
- **Embrace the Grid:** Align text to specific grid columns, but leave adjacent columns entirely empty to create "The Void."
- **Use "Hard" Edges:** All corners must be **0px (Sharp)**. This reinforces the architectural studio aesthetic.
- **Type as Hero:** Let the typography scale do the work. A massive `display-lg` headline is often better than an unnecessary icon.

### Don’t
- **No Rounded Corners:** Never use `border-radius`. It breaks the avant-garde, "constructed" feel.
- **No Gray Shadows:** Avoid high-opacity, muddy shadows. If it’s not ambient and light, don't use it.
- **No Decorative Icons:** Icons should be functional and minimal (thin strokes). Never use icons for "flair."
- **No Crowding:** If a layout feels busy, increase the spacing scale by two increments (e.g., move from `spacing-10` to `spacing-16`).

---

## 7. Spacing Scale Implementation
Precision is mandatory. Use the spacing scale to create "Rhythm."
- **Micro-margin:** `spacing-2` (0.7rem) for internal component elements.
- **Macro-margin:** `spacing-20` (7rem) or `spacing-24` (8.5rem) for section breathing room. 
- **The "Hero Gap":** Use `spacing-24` between the headline and the first line of body copy to emphasize the scale of the typography.```