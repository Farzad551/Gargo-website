import { useState } from 'react'
import './App.css'
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";


function App() {
  const [count, setCount] = useState(0)
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (

      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Hero />
        <About />

      </div>
        
  )
}

export default App
