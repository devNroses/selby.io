import {motion} from "motion/react"
import styles from './Button.module.css'

export const Button = () => {
    return (
        <motion.button 
            className={styles.button} 
            whileHover={{ scale: 1.04, transition: { duration: 0.45 } }} 
            whileTap={{ scale: 1, transition: { duration: 0.45 } }} 
        >
            <span data-text="Enter" className={styles.glitch}>
                Enter
            </span>
        </motion.button>
    )
}