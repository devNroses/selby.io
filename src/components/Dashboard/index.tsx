import type { RefObject } from 'react';
import { motion } from "motion/react"
import { Profile } from './Profile';
// import { SocialPanel } from './Social';
import { FeaturePanel, type FeatureImage } from './FeaturePanel';
import styles from './Dashboard.module.css';

interface DashbaordProps {
    dashboardPropRef?: RefObject<HTMLDivElement | null>,

}

export const Dashboard = ({ dashboardPropRef }:DashbaordProps ) => {
  const featuredImgs: FeatureImage[] = [
    {
      label: 'Bron_All_Star_26',
      alt: 'Bron in Nike All Star Shooting shirt',
      src: './portfolioImg/features/bron.jpg'
    },
    {
      label: 'Booker_All_Star_26',
      alt: 'Booker in Nike All Star Jacket',
      src: './portfolioImg/features/booker.jpg'
    },
    {
      label: 'Maxi_All_Star_26',
      alt: 'Maxi in Nike All Star Warm Up',
      src: './portfolioImg/features/maxi.jpg'
    },
    {
      label: 'Shai_All_Star_26',
      alt: 'Shai in Nike All Star Shooting shirt',
      src: './portfolioImg/features/shai.jpg'
    },
    {
      label: 'Steph_All_Star_26',
      alt: 'Steph in Nike All Star Warm up and Shooting shirt',
      src: './portfolioImg/features/steph.jpg'
    },
  ] 
  
  return (
         <div ref={dashboardPropRef} className={styles.dashboard}>
          <div className={styles.dashboardContent}>
            <motion.div
              className={`panel ${styles.panel1}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.25 } }}
              style={{
                background: 'transparent',
                padding: '0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                minHeight: '450px',
              }}
            >
              <FeaturePanel images={featuredImgs}/>
              <div className={styles.socialPanel}>
                {/* social media content here */}
              </div>
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