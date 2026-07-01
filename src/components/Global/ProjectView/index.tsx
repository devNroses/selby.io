import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { AllStarProject } from './Projects/Color/AllStar';

export const ProjectView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <motion.div
            className="pageSection"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            {/* <button onClick={() => navigate('/dashboard')}>← Back</button> */}
            <div>
                <AllStarProject />
            </div>
        </motion.div>
    )
}