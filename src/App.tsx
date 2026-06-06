import { useMainStore } from './store/mainStore'
import './App.css'

function App() {
  const count = useMainStore((state) => state.count)
  const increment = useMainStore((state) => state.increment)
  const decrement = useMainStore((state) => state.decrement)
  const reset = useMainStore((state) => state.reset)
 
  return (
      <section id="center">
        <div>
          <p>Count: {count}</p>
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button onClick={reset}>Reset</button>
        </div>
      </section>
  )
}

export default App
