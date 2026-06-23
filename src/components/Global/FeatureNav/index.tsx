import { motion } from "motion/react";
import styles from './FeatureNav.module.css'

export const FeatureNav = () => {
    return (
        <motion.div
            className={styles.hoverOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
         <motion.div
              className={styles.featureNav}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
            >
              <div className={styles.featureNavItmes}>
                <div className={styles.featureNavItem}>
                    <img src="./ifoIcon.svg" alt="about the project" />
                </div>
                <div className={styles.featureNavItem}>
                </div>
                <div className={styles.featureNavItem}>
                </div>
              </div>
            </motion.div>
          </motion.div>
    )
}