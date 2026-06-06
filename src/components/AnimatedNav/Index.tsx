import { useState, useEffect } from 'react'
import styles from './AnimatedNav.module.css'

export const AnimatedNav = () => {
    const [scrollY, setScrollY] = useState(0);
    
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    console.log(scrollY);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.headerWrapper}>header [ScrollY: {scrollY}]</div>
      </div>
        <div className={styles.mainLogo}>Main Logo</div>
      <div className={styles.spacer} aria-hidden="true" />
    </div>
  )
}