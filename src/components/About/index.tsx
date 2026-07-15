import { motion } from 'motion/react'
import styles from './About.module.css'

export const AboutPage = () => {
  return (
    <div className={styles.aboutWrapper}>
      <div className={styles.contentContainer}>
        container 1
      </div>

      <motion.div
        className={styles.contentContainer}
        initial={{ opacity: .5, x: 500 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease: 'easeOut', delay: 0.325 }}
      >
        <div className={styles.aboutBlackWhite}>
            <motion.img 
                src="/imgs/about/selbyBW.jpg" alt="selby black and white"
            />
        </div>
      </motion.div>

      <motion.div
        className={styles.contentContainer}
      >
        <div className={styles.aboutProfileImg}>
            <motion.img 
                src="/imgs/about/selby_aboutProfile.jpg" alt="selby headshot"
                initial={{ x: 250 }}
                whileInView={{ x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
            />
        </div>
        <div className={styles.aboutContact}>
            Contact section
        </div>
      </motion.div>
    </div>
  )
}