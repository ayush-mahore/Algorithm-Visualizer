import { useState } from 'react'
import './App.css'
import AlgorithmVisualizer from './Components/AlgorithmVisualizer/AlgorithmVisualizer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <AlgorithmVisualizer />
    </div>
  )
}

export default App
