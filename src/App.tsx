// // import { useMainStore } from './store/mainStore'
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AnimatedRoutes } from './components/AnimatedRoutes';
// import { Hero } from './components/Hero'
import './index.css';

function App() {
  // Moved out of the render body and into an effect -- mutating
  // window.history directly during render broke the "render must be
  // pure" assumption the react-hooks/immutability rule enforces (it's
  // the rule the React Compiler relies on). An effect is the correct
  // place for a one-time side effect like this: it runs after mount,
  // client-side only, and doesn't run again on re-renders.
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  return (
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
  )
}

export default App
