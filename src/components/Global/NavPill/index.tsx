import { createPortal } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import styles from './NavPill.module.css'

const CloseIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L12 12M12 1L1 12" stroke="#111111" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

// Down-left diagonal arrow — reads as "step back down to the dashboard"
// rather than a plain horizontal back arrow.
const BackIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 2.5L2.5 10.5M2.5 10.5H8.5M2.5 10.5V4.5" stroke="#111111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/**
 * Persistent, contextual wayfinding pill for the "dashboard experience"
 * (Dashboard + About + ProjectView — everywhere except the Hero landing
 * page). Modeled on 363sudbury.com's bottom-center pill: one component,
 * two states, both driven off the current route rather than by props —
 * drop <NavPill /> into a page and it figures out what it should say.
 *
 * - On the top-level dashboard, there's nowhere "up" to go, so it reads
 *   "Close" and exits the whole experience back to the Hero landing page.
 * - On anything nested under /dashboard (About, a project detail view),
 *   it reads "Back to Dashboard" and steps back up one level.
 *
 * The actual exit/enter animation is the fade already wired into each
 * page's top-level motion.div via the route-level AnimatePresence in
 * AnimatedRoutes — this component just needs to render as a motion node
 * so it participates in that same fade rather than snapping away.
 *
 * Rendered via a portal straight onto document.body rather than inline
 * where it's used. Dashboard.module.css puts `backdrop-filter: blur()`
 * on .dashboard — any ancestor with a filter (or transform, perspective,
 * will-change: transform) becomes the containing block for its
 * position: fixed descendants, per spec. So without the portal, this
 * pill's `bottom: 0` was resolving against .dashboard's box instead of
 * the real viewport, and .dashboard + fixed is also a known recipe for
 * compositor scroll jank — both of which line up with this only ever
 * showing up on the Dashboard page, never About/ProjectView (neither
 * has a filtered ancestor). Portaling to body sidesteps the whole
 * category of bug: its containing block is unambiguously the viewport,
 * full stop, regardless of what any page wraps it in.
 */
export const NavPill = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // Hero isn't part of the dashboard experience — no pill there.
  if (pathname === '/') return null

  const isTopLevel = pathname === '/dashboard'
  const destination = isTopLevel ? '/' : '/dashboard'
  const label = isTopLevel ? 'Close' : 'Back to Dashboard'

  return createPortal(
    <motion.button
      key={isTopLevel ? 'close' : 'back'}
      type="button"
      className={styles.pill}
      onClick={() => navigate(destination)}
      initial={{ y: 48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      <span className={styles.label}>{label}</span>
      <span className={styles.iconChip}>
        {isTopLevel ? <CloseIcon /> : <BackIcon />}
      </span>
    </motion.button>,
    document.body
  )
}
