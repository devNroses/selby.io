import { useState } from 'react'
import { motion, AnimatePresence } from "motion/react";
import { InfoIcon } from "../../../assets/icons/infoIcon";
import { GalleryIcon } from '../../../assets/icons/galleryIcon'
import { ExpandIcon } from '../../../assets/icons/expandIcon'
import styles from './FeatureNav.module.css'

interface NavItem {
  id: string
  icon: React.ReactNode
  tooltip: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'info', icon: <InfoIcon width={24} height={24} />, tooltip: 'Project Info' },
  { id: 'gallery', icon: <GalleryIcon width={40} height={20} />, tooltip: 'View Gallery' },
  { id: 'expand', icon: <ExpandIcon width={20} height={20} />, tooltip: 'Expand View' },
]

export const FeatureNav = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  return (
    <motion.div
      className={styles.hoverOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <motion.div
        className={styles.featureNav}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
      >
        {NAV_ITEMS.map((item) => (
  <div
    key={item.id}
    className={styles.featureNavItemWrapper}
    onMouseEnter={() => setActiveTooltip(item.id)}
    onMouseLeave={() => setActiveTooltip(null)}
  >
    <AnimatePresence>
      {activeTooltip === item.id && (
        <motion.span
          className={styles.tooltip}
          initial={{ opacity: 0, y: 6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.9 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {item.tooltip}
        </motion.span>
      )}
    </AnimatePresence>
    <div className={styles.featureNavItem}>
      {item.icon}
    </div>
  </div>
))}
      </motion.div>
    </motion.div>
  )
}