import React, { useState, useEffect } from "react";

import { supabase } from "../../../supabaseClient";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

import "./Header.css";

import avatarImg from "../../assets/LogoCaracol.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [showCourses, setShowCourses] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);

   const [courses, setCourses] = useState([]);


  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-avatar")) {
        setShowAvatarMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    await supabase.auth.signOut(); // 👈 cerrar sesión en Supabase
    setUser(null); // limpiar Zustand
    localStorage.removeItem("user");
    navigate("/"); // volver al home
  };

    useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from("courses").select("*");
      if (error) console.error(error);
      else setCourses(data);
    };
    fetchCourses();
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="nav-container">
        <div className="nav-left">
          <a href="/" className="logo">
            Mistica&Mundana
          </a>
        </div>

        {/* Botón hamburguesa */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
         <li className="dropdown" onClick={() => setShowCourses(!showCourses)}>
      <a href="#">Cursos ▾</a>
      {showCourses && (
        <ul className="dropdown-menu">
          {courses.map((course) => (
            <li key={course.id}>
              <button onClick={() => navigate(`/curso/${course.id}`)}>
                {course.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>

          <li>
            <a href="#">Membresías</a>
          </li>
          <li>
            <a href="#">Quién soy</a>
          </li>

            {!user && (
    <div className="mobile-login">
      <a href="/login" className="login-btn" onClick={() => setMenuOpen(false)}>
        Iniciar sesión
      </a>
      <a href="/register" className="login-btn" onClick={() => setMenuOpen(false)}>
        Registrarse
      </a>
    </div>
  )}

        </ul>


        <div className="nav-right">
          {!user ? (
            <a href="/login" className="login-btn">
              Iniciar sesión
            </a>
          ) : (
            <div
              className="user-avatar"
              onClick={() => setShowAvatarMenu(!showAvatarMenu)}
            >
              <img src={avatarImg} alt="Avatar" className="avatar-img" />
              {showAvatarMenu && (
                <ul
                  className={`dropdown-menu avatar-menu ${
                    showAvatarMenu ? "open" : ""
                  }`}
                >
                  <li>
                    <a href="/mis-cursos">Mis cursos</a>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
