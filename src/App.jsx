import { useState } from 'react'
import './App.css'
import Header from "./components/Header";

function App() {
  const [count, setCount] = useState(0)
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (

      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />



      </div>
        
  )
}

export default App
