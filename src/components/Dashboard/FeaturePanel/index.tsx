import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "motion/react"
import styles from './FeaturePanel.module.css'

export interface FeatureImage {
  label: string
  alt: string
  src: string
}

interface FeaturePanelProps {
  images: FeatureImage[]
  interval?: number
}

export const FeaturePanel = ({ images, interval = 4000 }: FeaturePanelProps) => {
  const [current, setCurrent] = useState(0)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (hovered) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length)
    }, interval)
    return () => clearInterval(timer)
  }, [images.length, interval, hovered])

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } }}
      className={styles.featureWrapper}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
            key={current}
            className={styles.slide}
            initial={{ opacity: 0, zIndex: 2 }}
            animate={{
            opacity: 1,
            scale: 1.03,
            zIndex: 2,
            transition: {
                opacity: { duration: 1.5, ease: 'easeInOut' },
                scale: { duration: interval / 1000, ease: 'linear' }
            }
            }}
            exit={{
            opacity: 0,
            zIndex: 1,
            transition: { duration: 1.5, ease: 'easeInOut' }
            }}
        >
          <img
            src={images[current].src}
            alt={images[current].alt}
          />
        </motion.div>
      </AnimatePresence>

      {/* hover overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className={styles.hoverOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <motion.span
              className={styles.viewProject}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
            >
              View Project
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}