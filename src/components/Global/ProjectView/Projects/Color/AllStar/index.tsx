import { motion } from 'motion/react'
import styles from './Allstar.module.css'

export const AllStarProject = () => {
    return (
        <motion.div className={styles.allstarContainer}>
            <motion.div className={styles.allstarIntro}>
                Project All Star
            </motion.div>
        </motion.div>
    )
}