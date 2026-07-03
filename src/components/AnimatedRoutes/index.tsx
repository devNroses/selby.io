import { useLocation, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { Hero } from "../HeroPage";
import { Dashboard } from "../Dashboard";
import { ProjectView } from "../Global/ProjectView";

export const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                }}
            >
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<Hero />} />
                <Route path='/dashboard' element={<Dashboard />}/>
                <Route path='/dashboard/project/:id' element={<ProjectView />}/>
            </Routes>

            </div>
        </AnimatePresence>
    )
}