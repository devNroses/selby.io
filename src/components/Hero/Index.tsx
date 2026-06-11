import { useState, useEffect, useRef } from 'react'
import { motion } from "motion/react"
import { Button } from '../Global/Button'
import styles from './Hero.module.css'

export const Hero = () => {
    const [scrollY, setScrollY] = useState(0);
    const [showDashboard, setShowDashboard] = useState(false);
    const savedScrollY = useRef(0);
    const hasMounted = useRef(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (!hasMounted.current) {
            window.history.scrollRestoration = 'manual';
            window.scrollTo(0, 0);
            hasMounted.current = true;
        }

        const handleScroll = () => {
            setScrollY(window.scrollY);
        }

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        if (showDashboard) {
            savedScrollY.current = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${savedScrollY.current}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
            document.body.style.width = '100%';
        } else {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            document.body.style.width = '';
            if (savedScrollY.current) {
                window.scrollTo(0, savedScrollY.current);
            }
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            document.body.style.width = '';
        }
    }, [showDashboard]);

    const logoScale = Math.max(0.6, 1 - scrollY / 1000);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.headerWrapper}>header [ScrollY: {scrollY}]</div>
      </div>
        <motion.div 
          className={styles.mainLogo}
          initial={{ scale: 1 }}
          animate={{ scale: logoScale > 0.5 ? logoScale : 0.5, transition: { duration: 0.65 } }}
        >
          Main Logo
        </motion.div>
        <motion.div
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}
        >
          <Button buttonAction={() => setShowDashboard(true)} />
        </motion.div>
      <div className={styles.spacer} aria-hidden="true" />
      {showDashboard && (
        <motion.div className={styles.dashboard} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.25 } }}>
          <div className={styles.dashboardContent}>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.25 } }}
              style={{ background: '#04d4fd', padding: '1rem'}}
            >
              panel 1
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.35 } }}
              style={{ background: '#04f94d', padding: '1rem'}}
            >
              panel 2
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.45 } }}
              style={{ transformOrigin: 'bottom', background: '#f62900', padding: '1rem'}}
            >
              <div className={styles.profileSection}>
                [Profile] 
                <div className={styles.profileResume}>
                  [ Resume CTA ]
                </div>
                <div className={styles.profileSocials}>
                  [ Socials CTA Container ]
                </div>
              </div>

               <div className={styles.skillsSection}>
               [ Skills ]
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}