import { motion } from 'motion/react'
import { GithubIcon } from '../../assets/icons/githubIcon'
import { InstagramIcon } from '../../assets/icons/instagramIcon'
import { LinkedInIcon } from '../../assets/icons/linkedIn'
import styles from './About.module.css'

export const AboutPage = () => {
  return (
    <div className={styles.aboutWrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.tabsContainer}>
            <motion.div
              style={{ border: '1px solid white'}}
              initial={{y: '-105%'}}
              animate={{y: 0}}
              transition={{ duration: 0.65, ease: 'easeInOut' }}
            >
              Creative Navigator
            </motion.div>
            <motion.div
              style={{ 
                borderTop: '1px solid white',
                borderBottom: '1px solid white',
                borderRight: '1px solid white'
              }}
              initial={{y: '-105%'}}
              animate={{y: 0}}
              transition={{ duration: 0.65, delay: .5, ease: 'easeInOut' }}
            >
              Design Engineer
            </motion.div>
            <motion.div
              style={{ 
                borderTop: '1px solid white',
                borderBottom: '1px solid white',
                borderRight: '1px solid white'
              }}
              initial={{y: '-105%'}}
              animate={{y: 0}}
               transition={{ duration: 0.65, delay: .75, ease: 'easeInOut' }}
            >
              Color Designer
            </motion.div>
          </div>
          <div />
          <div className={styles.tabContent}>

          </div>
        </div>
        <img src="/imgs/about/selby_train.jpg" />
      </div>

      {/* <motion.div
        className={styles.contentContainer}
        initial={{ opacity: .5, x: 500 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease: 'easeOut', delay: 0.325 }}
      >
        <motion.div className={styles.aboutInfo}>
            <h3>
                Design Engineer // Color Design // Full Stack Developer
            </h3>
            <p>
                Navigating complexity across digital and tangible experiences. a 
                multidisciplinary creator shaped by an Army upbringing, built 
                to adapt and deliver across mediums.
            </p>

            <div className={styles.aboutSocials}>
                <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { ease: 'easeIn', duration: 0.65, delay: 0.85 } }}
                  href="https://www.instagram.com/selby.io/" 
                  target="_blank" 
                  aria-label='selbyio instagram'
                >
                  <InstagramIcon width={32} height={32} stroke='#E2FFC1'/>
                </motion.a>
                <motion.a 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0, transition: { ease: 'easeIn', duration: 0.65, delay: 1 } }}
                  href="https://github.com/devNroses" 
                  target="_blank" 
                  aria-label='selbyio github'
                >
                  <GithubIcon width={32} height={32} stroke='#E2FFC1' />
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0, transition: { ease: 'easeIn', duration: 0.65, delay: 1.15 } }}
                  href="https://www.linkedin.com/in/jonathan-selby-developer/" 
                  target="_blank" 
                  aria-label='Selby LinkedIn'
                >
                  <LinkedInIcon width={32} height={32} stroke='#E2FFC1' />
                </motion.a>
            </div>
        </motion.div>
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
      </motion.div> */}
    </div>
  )
}


//  <motion.div>
//           Show Me
//         </motion.div>
//         <motion.div className={styles.aboutInfo}>
//             <motion.p
//               initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0, transition: { ease: 'easeIn', duration: 0.65, delay: 0.85 } }}
//             >
//                 Navigating complexity across digital and tangible experiences. a 
//                 multidisciplinary creator shaped by an Army upbringing, built 
//                 to adapt and deliver across mediums.
//             </motion.p>

//             <div className={styles.aboutSocials}>
//                 <motion.a
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0, transition: { ease: 'easeIn', duration: 0.65, delay: 0.85 } }}
//                   href="https://www.instagram.com/selby.io/" 
//                   target="_blank" 
//                   aria-label='selbyio instagram'
//                 >
//                   <InstagramIcon width={32} height={32} stroke='#E2FFC1'/>
//                 </motion.a>
//                 <motion.a 
//                   initial={{ opacity: 0, y: 15 }}
//                   animate={{ opacity: 1, y: 0, transition: { ease: 'easeIn', duration: 0.65, delay: 1 } }}
//                   href="https://github.com/devNroses" 
//                   target="_blank" 
//                   aria-label='selbyio github'
//                 >
//                   <GithubIcon width={32} height={32} stroke='#E2FFC1' />
//                 </motion.a>
//                 <motion.a
//                   initial={{ opacity: 0, y: 15 }}
//                   animate={{ opacity: 1, y: 0, transition: { ease: 'easeIn', duration: 0.65, delay: 1.15 } }}
//                   href="https://www.linkedin.com/in/jonathan-selby-developer/" 
//                   target="_blank" 
//                   aria-label='Selby LinkedIn'
//                 >
//                   <LinkedInIcon width={32} height={32} stroke='#E2FFC1' />
//                 </motion.a>
//             </div>
//         </motion.div>
//         <motion.div>
//           Hello I'm here
//         </motion.div>