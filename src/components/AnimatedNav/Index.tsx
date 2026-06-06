import { useState, useEffect, useLayoutEffect } from 'react'
import { motion } from "motion/react"
import styles from './AnimatedNav.module.css'

export const AnimatedNav = () => {
    const [scrollY, setScrollY] = useState(0);
    // Prevent scroll restoration on page load and reload
    useLayoutEffect(() => {
        if (typeof window !== 'undefined') {
            window.history.scrollRestoration = 'manual';
            window.scrollTo(0, 0);
        }
    }, []);

    // Handles scroll event to update scrollY state
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        }

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const logoScale = Math.max(0.6, 1 - scrollY / 1000);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.headerWrapper}>header [ScrollY: {scrollY}]</div>
      </div>
        <motion.div 
          className={styles.mainLogo}
          initial={{ scale: 1 }}
          animate={{ scale: logoScale, transition: { duration: 0.2 } }}
        >
          Main Logo
        </motion.div>
      <div className={styles.spacer} aria-hidden="true" />
    </div>
  )
}