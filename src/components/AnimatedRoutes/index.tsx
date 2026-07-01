import { useLocation, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { Hero } from "../Hero";
import { Dashboard } from "../Dashboard";

export const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<Hero />} />
                <Route path='/dashboard' element={<Dashboard />}/>
                {/* <Route path='/dashboard/project/:id' element={<Hero />}/> */}
            </Routes>
        </AnimatePresence>
    )
}