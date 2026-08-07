import { lazy, Suspense } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "motion/react";

const Hero = lazy(() => import("../HeroPage").then((m) => ({ default: m.Hero })));
const Dashboard = lazy(() => import("../Dashboard").then((m) => ({ default: m.Dashboard })));
const AboutPage = lazy(() => import("../About").then((m) => ({ default: m.AboutPage })));
const ProjectView = lazy(() => import("../Global/ProjectView").then((m) => ({ default: m.ProjectView })));

export const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Suspense fallback={null}>
                <Routes location={location} key={location.pathname}>
                    <Route path='/' element={<Hero />} />
                    <Route path='/dashboard' element={<Dashboard />}/>
                    <Route path="/dashboard/about" element={<AboutPage />} />
                    <Route path='/dashboard/project/:id' element={<ProjectView />}/>
                </Routes>
            </Suspense>
        </AnimatePresence>
    )
}
