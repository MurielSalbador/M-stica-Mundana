import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Header from './components/header/Header';
import Home from "./components/Home/Home";
import Login from "./components/income/Login/Login";
import Register from "./components/income/register/Register";
import CursoDetail from "./components/Home/cursoDetail/CursoDetail";

import { useAuthStore } from "./store/useAuthStore";

import { supabase } from "../../MisticayMundan_Server/supabaseClient";

import './App.css';

function App() {
    const setUser = useAuthStore((state) => state.setUser);

 useEffect(() => {
    // Revisar sesión actual
    const session = supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUser(data.session.user);
      }
    });

    // Escuchar cambios de auth
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setUser]);

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/curso/:id" element={<CursoDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
