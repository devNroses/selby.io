import { lazy, Suspense } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "motion/react";

// Each route's code (and whatever it pulls in — three.js for Hero/Dashboard,
// the AllStar project assets for ProjectView, etc.) only loads when that
// route is actually visited, instead of all shipping in the initial bundle.
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
