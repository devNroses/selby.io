// import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { GithubIcon } from '../../../assets/icons/githubIcon';
import { InstagramIcon } from '../../../assets/icons/instagramIcon';
import styles from './Social.module.css';


export const SocialPanel = () => {
  return (
    <div className={styles.socialPanelWrapper}>
        <a href='https://github.com/devNroses' target='_blank'>
          <motion.div className={styles.socialPanel}>
              <GithubIcon width={30} height={30} />
          </motion.div>
        </a>
        <a href='https://www.instagram.com/selby.io/' target='_blank'>
          <motion.div className={styles.socialPanel}>
            <InstagramIcon width={30} height={30} />
          </motion.div>
        </a>  
    </div>
  )  
}