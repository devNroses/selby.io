import type { ReactNode } from 'react';
import styles from './Social.module.css';

type SocialPanelProp = {
     children: ReactNode
}

export const SocialPanel = ({ children}: SocialPanelProp) => {
  return (
    <div className={styles.socialPanel}>
        {children}
    </div>
  )  
}