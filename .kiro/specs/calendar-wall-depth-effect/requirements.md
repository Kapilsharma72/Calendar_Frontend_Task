# Requirements Document

## Introduction

The calendar app currently renders on a wall-textured background with a basic perspective tilt and drop shadow, but lacks the convincing physical depth cues that make it feel like a real wall calendar. This feature enhances the visual presentation so the calendar reads as a physical object mounted on a wall — with realistic mounting hardware, layered shadows that respond to a simulated light source, paper-edge thickness, and subtle environmental details that reinforce the illusion of depth.

The changes are purely presentational (CSS/SVG/React) and must not affect calendar functionality, accessibility, or performance in a meaningful way.

## Glossary

- **Wall_Scene**: The full-viewport background element that simulates a painted plaster wall.
- **Calendar_Wrapper**: The outermost container div that positions and tilts the calendar in 3-D space.
- **Mounting_Hardware**: The visual nail/screw and hanging-wire or hook element rendered above the spiral binding.
- **Spiral_Binding**: The existing SVG coil component at the top of the calendar body.
- **Calendar_Card**: The paper body of the calendar below the spiral binding.
- **Drop_Shadow**: The CSS `filter: drop-shadow(…)` or `box-shadow` layers that simulate the calendar casting a shadow on the wall.
- **Page_Edge**: The visible thickness of the calendar page stack rendered on the left and right sides of the Calendar_Card.
- **Light_Source**: A simulated upper-left directional light used consistently across all depth cues.
- **Reduced_Motion**: The `prefers-reduced-motion: reduce` media query preference.

---

## Requirements

### Requirement 1: Wall Surface Realism

**User Story:** As a viewer, I want the background wall to look like a real painted surface, so that the calendar appears to be hanging in a physical room.

#### Acceptance Criteria

1. THE Wall_Scene SHALL render a warm neutral base color consistent with painted plaster (approximately `#c9bfb2`).
2. THE Wall_Scene SHALL display a subtle noise/grain texture overlay with opacity no greater than 0.15 so the texture reads as surface imperfection rather than pattern.
3. THE Wall_Scene SHALL include a directional light gradient originating from the upper-left quadrant to simulate a single ambient light source.
4. THE Wall_Scene SHALL include a soft darkening vignette at the lower-right corner to reinforce the Light_Source direction.
5. WHEN the viewport width is less than 640 px, THE Wall_Scene SHALL maintain the same color and texture without layout-breaking overflow.

---

### Requirement 2: Mounting Hardware

**User Story:** As a viewer, I want to see a nail or hook at the top of the calendar, so that it is visually clear the calendar is physically hung on the wall.

#### Acceptance Criteria

1. THE Mounting_Hardware SHALL render a nail or screw head SVG element centered horizontally above the Spiral_Binding.
2. THE Mounting_Hardware SHALL include a highlight on the upper-left face and a shadow on the lower-right face consistent with the Light_Source direction.
3. THE Mounting_Hardware SHALL cast a small drop shadow onto the Wall_Scene behind it.
4. THE Mounting_Hardware SHALL be marked `aria-hidden="true"` so screen readers ignore it.
5. THE Mounting_Hardware SHALL render at a fixed size between 16 px and 28 px in diameter regardless of calendar width.
6. IF the calendar width is less than 320 px, THEN THE Mounting_Hardware SHALL remain visible and shall not overflow its container.

---

### Requirement 3: Realistic Drop Shadow

**User Story:** As a viewer, I want the calendar to cast a convincing shadow on the wall behind it, so that it appears to have physical depth and distance from the wall surface.

#### Acceptance Criteria

1. THE Drop_Shadow SHALL consist of at least three layered shadow values: a tight contact shadow, a mid-range ambient shadow, and a wide soft shadow.
2. THE Drop_Shadow SHALL be offset slightly to the right and downward (positive X and Y) to be consistent with the upper-left Light_Source.
3. THE Drop_Shadow SHALL use decreasing opacity values from the contact shadow (≥ 0.45) to the wide shadow (≤ 0.12).
4. WHEN the calendar page flip animation is active, THE Drop_Shadow SHALL remain stable and SHALL NOT flicker or disappear.
5. THE Calendar_Wrapper SHALL apply the Drop_Shadow via CSS `filter: drop-shadow(…)` so the shadow follows the silhouette of the entire calendar including the Spiral_Binding.

---

### Requirement 4: Page-Edge Thickness

**User Story:** As a viewer, I want to see the stacked edge of calendar pages on the sides of the calendar, so that it looks like a physical multi-page booklet rather than a flat image.

#### Acceptance Criteria

1. THE Page_Edge SHALL be rendered as a visible band on the right side of the Calendar_Card using a CSS pseudo-element or an absolutely-positioned element.
2. THE Page_Edge SHALL use a gradient from a mid-tone color at the top to a darker tone at the bottom to simulate pages stacked in depth.
3. THE Page_Edge SHALL have a width between 4 px and 10 px.
4. THE Page_Edge SHALL be consistent with the Light_Source: the left edge SHALL appear lighter and the right edge SHALL appear darker.
5. THE Page_Edge SHALL not obscure any calendar content or interactive controls.

---

### Requirement 5: Perspective Tilt and 3-D Positioning

**User Story:** As a viewer, I want the calendar to appear slightly tilted away from me at the top, so that it looks like it is hanging flat against a wall rather than floating in 2-D space.

#### Acceptance Criteria

1. THE Calendar_Wrapper SHALL apply a CSS `perspective` value between 1200 px and 2000 px.
2. THE Calendar_Wrapper SHALL apply a `rotateX` value between 1 deg and 4 deg with `transform-origin: top center` so the top edge appears farther away.
3. THE Calendar_Wrapper SHALL NOT apply any `rotateY` or `rotateZ` tilt that would make the calendar appear crooked on the wall.
4. WHEN the `Reduced_Motion` preference is active, THE Calendar_Wrapper SHALL maintain the static perspective tilt because it is a non-animated visual effect.
5. THE Calendar_Wrapper SHALL apply `transform-style: flat` to prevent child 3-D transforms from compounding with the wrapper tilt.

---

### Requirement 6: Paper Surface and Lighting

**User Story:** As a viewer, I want the calendar page body to look like real paper with subtle surface shading, so that it reinforces the physical material feel.

#### Acceptance Criteria

1. THE Calendar_Card SHALL display inset box-shadow values on its left and right edges to simulate the curvature of paper near the binding.
2. THE Calendar_Card SHALL render a subtle paper grain texture overlay using an SVG `feTurbulence` filter with opacity no greater than 0.06.
3. THE Calendar_Card SHALL show a bottom-edge shadow gradient of height between 12 px and 24 px to simulate the thickness of the page stack below the current page.
4. WHEN the theme changes between light and dark mode, THE Calendar_Card SHALL update its surface color within 700 ms consistent with the existing theme transition duration.
5. THE Calendar_Card SHALL NOT display any texture or shadow that reduces the contrast ratio of text content below 4.5:1 for normal text.

---

### Requirement 7: Spiral Binding Depth

**User Story:** As a viewer, I want the spiral binding coils to look like real metal rings with cylindrical depth, so that the binding reinforces the physical calendar illusion.

#### Acceptance Criteria

1. THE Spiral_Binding SHALL render each coil with at least three stroke layers: a dark outer edge, a mid-tone base, and a bright highlight on the upper-left arc.
2. THE Spiral_Binding rod SHALL render with a highlight on its upper face and a shadow on its lower face consistent with the Light_Source.
3. THE Spiral_Binding SHALL use a `ResizeObserver` to adapt the coil count to the current calendar width so coils are never clipped or spaced too far apart.
4. THE Spiral_Binding SHALL be marked `aria-hidden="true"`.
5. WHEN the calendar width changes, THE Spiral_Binding SHALL update the coil count within one animation frame.

---

### Requirement 8: Reduced Motion Compliance

**User Story:** As a user who prefers reduced motion, I want all animated depth effects to be suppressed, so that I am not affected by motion I find uncomfortable.

#### Acceptance Criteria

1. WHEN the `Reduced_Motion` preference is active, THE Calendar_Wrapper SHALL suppress any CSS transition or animation applied to the transform property.
2. WHEN the `Reduced_Motion` preference is active, THE Calendar_Card SHALL suppress any transition on box-shadow or filter properties.
3. WHEN the `Reduced_Motion` preference is active, THE page flip animation SHALL be skipped entirely, consistent with existing behavior.
4. THE static depth cues (shadows, perspective tilt, grain texture, page edge) SHALL remain visible when `Reduced_Motion` is active because they are non-animated.
