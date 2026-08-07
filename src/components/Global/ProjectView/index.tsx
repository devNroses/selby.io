import { motion } from 'motion/react';
import { AllStarProject } from './Projects/Color/AllStar';
import { Vomero } from './Projects/Color/Vomero';
import { NavPill } from '../NavPill';
import { useParams } from 'react-router-dom';
import styles from './ProjectView.module.css'

export const ProjectView = () => {
    const {id} = useParams<{id: string}>();

    console.log('ProjectView id:', id);

    const renderProjectContent = () => {
        switch (id) {
            case 'allStar26':
                return <AllStarProject />;
            case 'vomero':
                return <Vomero />;
            default:
                return null;
        }
    }
    return (
        <motion.div
            className={styles.pageSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.25 }}
        >
            {renderProjectContent()}
            <NavPill />
        </motion.div>
    )
}
