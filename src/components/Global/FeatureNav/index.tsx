import { useState, useRef } from 'react'
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
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activeItem = NAV_ITEMS.find(item => item.id === activeTooltip)

  const handleTouchStart = (id: string) => {
    longPressTimer.current = setTimeout(() => {
      setActiveTooltip(id)
    }, 500)
  }

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }
    setTimeout(() => setActiveTooltip(null), 1500)
  }

  return (
    <motion.div
      className={styles.hoverOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
  
      {/* persistent tooltip container — always visible, text slides inside */}
      <div className={styles.tooltipAnchor}>
        <div className={`${styles.tooltipContainer} ${activeItem ? styles.tooltipVisible : ''}`}>
          <motion.span
            key={activeTooltip}
            className={styles.tooltipText}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: activeItem ? 1 : 0, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {activeItem?.tooltip ?? '\u00A0'}
          </motion.span>
        </div>
      </div>

      <motion.div
        className={styles.featureNav}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
      >
        <AnimatePresence>
          {NAV_ITEMS.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeInOut' }}
                key={item.id}
                className={`${styles.featureNavItem} ${activeTooltip === item.id ? styles.featureNavItemActive : ''}`}
                onMouseEnter={() => setActiveTooltip(item.id)}
                onMouseLeave={() => setActiveTooltip(null)}
                onTouchStart={() => handleTouchStart(item.id)}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
                whileTap={{ 
                  scale: .85,
                  transition: { duration: 0.45 },
                }} 
                >
                  {item.icon}
                </motion.div>
              ))}
          </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}