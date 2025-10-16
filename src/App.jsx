import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/header/Header";
import Home from "./components/Home/Home";
import Login from "./components/income/Login/Login";
import Register from "./components/income/register/Register";
import CursoDetail from "./components/Home/cursoDetail/CursoDetail";
import MemberDetail from "./components/Home/memberDetail/MemberDetail";


import { useAuthStore } from "./store/useAuthStore";
import { supabase } from "../supabaseClient";
import "./App.css";

function AppContent() {
  const setUser = useAuthStore((state) => state.setUser);
  const location = useLocation();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", data.session.user.id)
          .maybeSingle();
        setUser(profile || data.session.user);
      } else {
        setUser(null);
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          supabase
            .from("users")
            .select("*")
            .eq("id", session.user.id)
            .maybeSingle()
            .then(({ data: profile }) => {
              if (profile) setUser(profile);
            });
        } else {
          setUser(null);
        }
      }
    );

   return () => {
  if (listener && listener.subscription) {
    listener.subscription.unsubscribe();
  }
};

  }, [setUser]);

  // 🔸 Ocultar Header en login y register
  const hideHeaderRoutes = ["/login", "/register"];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/curso/:id" element={<CursoDetail />} />
         <Route path="/membresia" element={<MemberDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

// 👇 Este componente envuelve AppContent con <BrowserRouter>
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
