import type { RefObject } from 'react';

import { motion } from "motion/react"
import styles from './Dashboard.module.css';

interface DashbaordProps {
    dashboardPropRef?: RefObject<HTMLDivElement | null>,

}

export const Dashboard = ({ dashboardPropRef }:DashbaordProps ) => {
    return (
         <div ref={dashboardPropRef} className={styles.dashboard}>
          <div className={styles.dashboardContent}>
            <motion.div
              className='panel'
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.25 } }}
              style={{ background: '#04d4fd', padding: '1rem'}}
            >
              panel 1
            </motion.div>
            <motion.div
              className='panel'
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.35 } }}
              style={{ background: '#04f94d', padding: '1rem'}}
            >
              panel 2
            </motion.div>
            <motion.div
              className='panel'
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.45 } }}
              style={{ transformOrigin: 'bottom', display: 'flex', flexDirection: 'column', background: '#f62900', padding: '1rem', gap: '1em' }}
            >
              <motion.div 
              className={styles.profileSection}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.55 } }}
              >
                [Profile] 
                <motion.div 
                className={styles.profileResume}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } }}
                >
                  [ Resume CTA ]
                </motion.div>
                <motion.div 
                className={styles.profileSocials}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.65 } }}
                >
                  [ Socials CTA Container ]
                </motion.div>
              </motion.div>

               <motion.div className={styles.skillsSection}>
               [ Skills ]
              </motion.div>
            </motion.div>
          </div>
        </div>
    )
}