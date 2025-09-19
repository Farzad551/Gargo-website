import { useState } from 'react'
import './App.css'
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Calculator from "./components/Calculator";
import Coverage from "./components/Coverage";
import Tracking from "./components/Tracking";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";


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
        <Services />
        <Calculator />
        <Coverage />
        <Tracking />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
        
  )
}

export default App
