import {motion} from "motion/react"
import styles from './Button.module.css'

export const Button = () => {
    return (
        <motion.button 
            className={styles.button} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}>
            <span data-text="Glitch Button" className={styles.glitch}>
                Glitch Button
            </span>
        </motion.button>
    )
}