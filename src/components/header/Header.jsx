import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="nav-container">
        <div className="nav-left">
          <a href="#" className="logo">Mistica&Mundana</a>
        </div>

        {/* Botón hamburguesa */}
        <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li
            className="dropdown"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <a href="#">Cursos ▾</a>
            {showDropdown && (
              <ul className="dropdown-menu">
                <li><a href="#">Yoga Integral</a></li>
                <li><a href="#">Meditación Guiada</a></li>
                <li><a href="#">Yoga para Principiantes</a></li>
                <li><a href="#">Respiración Consciente</a></li>
              </ul>
            )}
          </li>
          <li><a href="#">Membresías</a></li>
          <li><a href="#">Quién soy</a></li>

          <div className="mobile-login">
            <a href="#" className="login-btn">Iniciar sesión</a>
            <div className="social-icons">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
            </div>
          </div>
        </ul>

        <div className="nav-right">
          <a href="#" className="login-btn">Iniciar sesión</a>
          <div className="social-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
