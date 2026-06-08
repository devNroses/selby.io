import {motion} from "motion/react"
import styles from './Button.module.css'

interface ButtonProps {
    buttonAction: () => void;
}

export const Button = ({ buttonAction }: ButtonProps) => {
    return (
        <motion.button 
            className={`${styles.button} ${styles.glitchButton}`} 
            whileHover={{ 
                scale: 1.04,
                transition: { duration: 0.45 },
                backgroundColor: '#111111',
                color: '#fff',
                boxShadow: '0 0 4px #ff008c, 0 0 8px #ff008c, 0 0 12px #ff008c'
            }} 
            whileTap={{ 
                scale: 1,
                transition: { duration: 0.45 },
            }} 
            onTapStart={() => buttonAction()}
        >
            <span data-text="Enter" className={styles.glitch}>
                Enter
            </span>
        </motion.button>
    )
}