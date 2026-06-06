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

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.headerWrapper}>header [ScrollY: {scrollY}]</div>
      </div>
        <motion.div 
          className={styles.mainLogo}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { duration: .8, delay: 1 } }}
        >
          Main Logo
        </motion.div>
      <div className={styles.spacer} aria-hidden="true" />
    </div>
  )
}