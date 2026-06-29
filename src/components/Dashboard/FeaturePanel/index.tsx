import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from "motion/react"
import { FeatureNav } from '../../Global/FeatureNav'
import styles from './FeaturePanel.module.css'

export interface FeatureMedia {
  label: string
  alt?: string
  src: string
  type?: 'image' | 'video'
  playbackRate?: number
}

interface FeaturePanelProps {
  images: FeatureMedia[]
  interval?: number
}

const isVideoSrc = (item: FeatureMedia) =>
  item.type === 'video' ||
  item.src.endsWith('.mp4') ||
  item.src.endsWith('.webm')

const MediaItem = ({ item }: { item: FeatureMedia }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoLoad = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = item.playbackRate ?? 4.5
    }
  }

  if (isVideoSrc(item)) {
    return (
      <video
        ref={videoRef}
        src={item.src}
        autoPlay
        loop
        muted
        playsInline
        className={styles.media}
        onLoadedMetadata={handleVideoLoad}
      />
    )
  }

  return (
    <img
      src={item.src}
      alt={item.alt ?? item.label}
      className={styles.media}
    />
  )
}

export const FeaturePanel = ({ images, interval = 4000 }: FeaturePanelProps) => {
  const [current, setCurrent] = useState(0)
  const [hovered, setHovered] = useState(false)

  const currentItem = images[current]
  const isCurrentVideo = isVideoSrc(currentItem)

  useEffect(() => {
    if (hovered) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length)
    }, interval)
    return () => clearInterval(timer)
  }, [images.length, interval, hovered, isCurrentVideo])

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
            scale: isCurrentVideo ? 1 : 1.03,
            zIndex: 2,
            transition: {
              opacity: { duration: 1.4, ease: 'easeInOut' },
              scale: { duration: interval / 4000, ease: 'linear' }
            }
          }}
          exit={{
            opacity: 0,
            zIndex: 1,
            transition: { duration: 1.5, ease: 'easeInOut' }
          }}
        >
          <MediaItem item={currentItem} />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {hovered && <FeatureNav />}
      </AnimatePresence>
    </motion.div>
  )
}