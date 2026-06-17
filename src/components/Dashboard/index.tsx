import type { RefObject } from 'react';
import { motion } from "motion/react"
import { Profile } from './Profile';
// import { SocialPanel } from './Social';
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
              style={{ background: '#04d4fd', padding: '.25rem'}}
            >
              panel 1
            </motion.div>
            <motion.div
              className='panel'
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.35 } }}
              style={{ background: '#04f94d', padding: '.25rem'}}
            >
              panel 2
            </motion.div>
            <motion.div
              className='panel'
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.45 } }}
              style={{ transformOrigin: 'bottom', display: 'flex', flexDirection: 'column', background: 'transparent', padding: '.25rem', gap: '1em' }}
            >
              <motion.div 
              className={styles.profileSection}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.55 } }}
              >
                <Profile />

                <motion.div 
                  className={styles.aboutWrapper}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } }}
                >
                  <h3>Introduction</h3>
                  <p>
                    Raised in North Carolina and shaped by years living abroad, my creative perspective was 
                    formed through contrast, culture, and curiosity, beginning with sketching sports logos 
                    and studying sneaker ads. Over time, this evolved into a deeper interest in visual 
                    systems, storytelling, color, and the emotional impact of design, shaping how I 
                    balance structure with exploration. As my career developed, design and software 
                    engineering became complementary disciplines, forming a layered practice that 
                    blends visual design, branding, color, and front-end development. Today, my work 
                    focuses less on singular outputs and more on crafting thoughtful, evolving 
                    experiences built with purpose and refined through collaboration.
                  </p>

                  {/* <div>
                    Read More
                  </div> */}
                </motion.div>

                {/* <motion.div 
                className={styles.socialsWrapper}
                >
                  <SocialPanel> [icon 1 ] </SocialPanel>
                  <SocialPanel> [icon 2 ] </SocialPanel>
                  <SocialPanel> [icon 3 ] </SocialPanel>
                  <SocialPanel> [icon 3 ] </SocialPanel>
                </motion.div> */}
                {/* <motion.div 
                className={styles.profileSocials}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.65 } }}
                >
                  [ Socials CTA Container ]
                </motion.div> */}
              </motion.div>

               {/* <motion.div className={styles.skillsSection}>
               [ Skills ]
              </motion.div> */}
            </motion.div>
          </div>
        </div>
    )
}