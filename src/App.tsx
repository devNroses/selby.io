// // import { useMainStore } from './store/mainStore'
import { BrowserRouter } from 'react-router-dom';
import { AnimatedRoutes } from './components/AnimatedRoutes';
// import { Hero } from './components/Hero'
import './index.css';

function App() {
  return (
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
  )
}

export default App
