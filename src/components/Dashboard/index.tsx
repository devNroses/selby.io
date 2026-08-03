import type { RefObject } from 'react';
import { useEffect } from 'react';
import { motion } from "motion/react"
import { Profile } from './Profile';
import { SocialPanel } from './Social';
import { FeaturePanel, type FeatureMedia } from './FeaturePanel';
import { ComingSoon } from './ComingSoon';
import { NavPill } from '../Global/NavPill';
import styles from './Dashboard.module.css';

interface DashbaordProps {
    dashboardPropRef?: RefObject<HTMLDivElement | null>,

}

export const Dashboard = ({ dashboardPropRef }:DashbaordProps ) => {
  // Warm the two routes reachable from here (About, a project detail
  // view) once the browser is idle, so clicking into either doesn't
  // wait on a fresh chunk fetch.
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => setTimeout(() => cb({} as IdleDeadline), 1));
    const cancel = window.cancelIdleCallback ?? clearTimeout;
    const id = idle(() => {
      import('../About');
      import('../Global/ProjectView');
    });
    return () => cancel(id as number);
  }, []);

  const featuredImgs: FeatureMedia[] = [
    {
      label: 'Bron_All_Star_26',
      alt: 'Bron in Nike All Star Shooting shirt',
      src: './portfolioImg/features/lebronCover.mp4',
      type: 'video',
      captionTitle: 'Court Hues',
      description: 'LA-inspired hues unite the league, turning the court into a bold 2026 All-Star showcase.',
      route: '/dashboard/project/allStar26'
    },
    {
      label: 'Vomero18',
      alt: 'Vomero 18 Silver Bullet Concept',
      src: './portfolioImg/features/vomero18_silverBullet.jpg',
      type: 'image',
      captionTitle: 'V18 Silver Bullet',
      description: 'Silver Bullet 97 reimagined through Vomero 18 blending tech, texture, and street-ready endurance.'
    }
  ] 

  const aboutQuote = "One system: design, engineering, and color."

  const aboutMedia: FeatureMedia[] = [
        {
          label: 'selby_about_red',
          alt: 'Selby about profile - R',
          src: './imgs/selbyAboutPanel_3.jpg',
          type: 'image',
          route: '/dashboard/about',
          captionTitle: 'Philosophy',
          description: aboutQuote,
        },
        {
          label: 'selby_about_green',
          alt: 'Selby about profile - G',
          src: './imgs/selbyAboutPanel_2.jpg',
          type: 'image',
          route: '/dashboard/about',
          captionTitle: 'Philosophy',
          description: aboutQuote,
        },
        {
          label: 'selby_about_blue',
          alt: 'Selby about profile - B',
          src: './imgs/selbyAboutPanel_1.jpg',
          type: 'image',
          route: '/dashboard/about',
          captionTitle: 'Philosophy',
          description: aboutQuote,
        },
        {
          label: 'selby_about_yellow',
          alt: 'Selby about profile - Y',
          src: './imgs/selbyAboutPanel_4.jpg',
          type: 'image',
          route: '/dashboard/about',
          captionTitle: 'Philosophy',
          description: aboutQuote,
        },
      ]
  
  return (
          <motion.div 
            ref={dashboardPropRef} 
            className={styles.dashboard}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut'}}
          >
          <div className={styles.dashboardContent}>
            <motion.div
                className={`panel ${styles.panel1}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.25 } }}
              >
                <FeaturePanel images={featuredImgs} showTitle showExpand/>
                <div className={styles.socialPanel} />
              </motion.div>
            <motion.div
              className={`panel ${styles.sectionPanel}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.35 } }}
              style={{ padding: '.15rem'}}
            >
              <motion.div className={styles.aboutPanel}> 
                <FeaturePanel images={aboutMedia} interval={8000} showExpand showTitle portraitCard/>
              </motion.div>
              <div className={styles.personalProjects}>
                <ComingSoon />
              </div>
            </motion.div>
            
            <motion.div
              className={`panel ${styles.sectionPanel}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.45 } }}
              // no inline height override — .sectionPanel's own
              // height: 100% (see Dashboard.module.css) now fills the
              // column correctly, so the old height: '110%' fudge-factor
              // hack (which just overflowed/clipped inconsistently) is gone.
              style={{ display: 'flex', flexDirection: 'column', background: 'transparent', padding: '.25rem' }}
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
                    was built on contrast, culture, and curiosity starting with sketching sports 
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
          <NavPill />
        </motion.div>
    )
}
