import type { RefObject } from 'react';
import { motion } from "motion/react"
import { Profile } from './Profile';
import { SocialPanel } from './Social';
import { FeaturePanel, type FeatureMedia } from './FeaturePanel';
import styles from './Dashboard.module.css';

interface DashbaordProps {
    dashboardPropRef?: RefObject<HTMLDivElement | null>,

}

export const Dashboard = ({ dashboardPropRef }:DashbaordProps ) => {
  const featuredImgs: FeatureMedia[] = [
    {
      label: 'Bron_All_Star_26',
      alt: 'Bron in Nike All Star Shooting shirt',
      src: './portfolioImg/features/lebronCover.mp4',
      type: 'video'
    },
    {
      label: 'Vomero18',
      alt: 'Vomero 18 Silver Bullet Concept',
      src: './portfolioImg/features/vomero18_silverBullet.jpg',
      type: 'image'
    }
  ] 

  const aboutMedia: FeatureMedia[] = [
        {
          label: 'selby_about_red',
          alt: 'Selby about profile - R',
          src: './imgs/selbyAboutPanel_3.png',
          type: 'image'
        },
        {
          label: 'selby_about_green',
          alt: 'Selby about profile - G',
          src: './imgs/selbyAboutPanel_2.png',
          type: 'image'
        },
        {
          label: 'selby_about_blue',
          alt: 'Selby about profile - B',
          src: './imgs/selbyAboutPanel_1.png',
          type: 'image'
        },
        {
          label: 'selby_about_yellow',
          alt: 'Selby about profile - Y',
          src: './imgs/selbyAboutPanel_4.png',
          type: 'image'
        },
      ]
  
  return (
         <div ref={dashboardPropRef} className={styles.dashboard}>
          <div className={styles.dashboardContent}>
            <motion.div
                className={`panel ${styles.panel1}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.25 } }}
              >
                <FeaturePanel images={featuredImgs} showNav />
                <div className={styles.socialPanel} />
              </motion.div>
            <motion.div
              className={`panel ${styles.sectionPanel}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.35 } }}
              style={{ padding: '.15rem'}}
            >
              <motion.div className={styles.aboutPanel}> 
                <FeaturePanel images={aboutMedia} interval={8000} />
              </motion.div>
              <motion.div className={styles.personalProjects}>
                UX/UI Panel
              </motion.div>
            </motion.div>
            
            <motion.div
              className={`panel ${styles.sectionPanel}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.45 } }}
              style={{ display: 'flex', flexDirection: 'column', background: 'transparent', padding: '.25rem', height: '110%'}}
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
                    Raised in North Carolina and shaped by years abroad, my creative perspective 
                    was built on contrast, culture, and curiosity—starting with sketching sports 
                    logos and studying sneaker ads. That foundation evolved into a deeper focus 
                    on visual systems, storytelling, color, and the emotional impact of design. 
                    Today, I focus on crafting thoughtful, evolving experiences built 
                    with purpose and refined through collaboration.
                  </p>
                </motion.div>
              <SocialPanel />
              </motion.div>
            </motion.div> 
          </div>
        </div>
    )
}