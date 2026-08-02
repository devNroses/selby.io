// Shared design tokens for places that can't consume CSS custom
// properties directly — framer-motion's `animate` prop needs to parse
// colors to interpolate them (a raw `var(--x)` string won't tween
// smoothly), and inline SVG props don't read the stylesheet cascade.
// Keep these in sync with --ink / --cream / --accent-lime in src/index.css.
export const INK = '#111111'
export const CREAM = '#FFFFD6'
export const ACCENT_LIME = '#E2FFC1'
