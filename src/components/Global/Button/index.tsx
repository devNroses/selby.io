import {motion} from "motion/react"
import styles from './Button.module.css'

export const Button = () => {
    return (
        <motion.button 
            className={`${styles.button} ${styles.glitchButton}`} 
            whileHover={{ 
                scale: 1.04,
                transition: { duration: 0.45 },
                backgroundColor: '#111111',
                color: '#fff',
                boxShadow: '0 0 10px #ff008c, 0 0 20px #ff008c, 0 0 30px #ff008c'
            }} 
            whileTap={{ 
                scale: 1,
                transition: { duration: 0.45 },
            }} 
            onTapStart={(e) => console.log('Tab started', e)}
        >
            <span data-text="Enter" className={styles.glitch}>
                Enter
            </span>
        </motion.button>
    )
}