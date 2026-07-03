// import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { AllStarProject } from './Projects/Color/AllStar';
import styles from './ProjectView.module.css'

export const ProjectView = () => {
    return (
        <motion.div
            className={styles.pageSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.25 }}
        >
            {/* <button onClick={() => navigate('/dashboard')}>← Back</button> */}
            <AllStarProject />
        </motion.div>
    )
}