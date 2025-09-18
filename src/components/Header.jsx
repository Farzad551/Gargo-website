import React, { useState, useEffect } from "react";

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "calculator", label: "Get Quote" },
    { id: "tracking", label: "Tracking" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="container header-container">
        <div className="header-logo">
          <h2>AfghanGargo</h2>
        </div>

        <nav
          className={`header-nav ${isMobileMenuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  aria-label={`Go to ${item.label}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            aria-label="Toggle Dark Mode"
            onClick={toggleDarkMode}
            title="Toggle theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            className="mobile-menu-btn"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen((p) => !p)}
            title="Menu"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
