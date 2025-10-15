import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../../../../MisticayMundan_Server/supabaseClient";
import YogaRegister from "../../../assets/YogaRegister.jpeg";
import "../auth.css";

export default function Register({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = async (e) => {
    e.preventDefault();

    // 1️⃣ Crear el usuario en el sistema de autenticación
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // 2️⃣ Obtener el usuario recién creado
    const user = data.user;

    // 3️⃣ Insertar su perfil en la tabla "users"
    if (user) {
      await supabase.from("users").insert([
        {
          id: user.id,
          email: user.email,
          role: "user",
          created_at: new Date(),
        },
      ]);
    }

    // 4️⃣ Aviso al usuario
    alert("Revisá tu correo para confirmar el registro 📩");
  };

  // Función para volver
  const handleClose = () => {
    if (onClose) onClose();
    navigate(location.state?.from || -1);
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card">
        <button className="auth-close" onClick={handleClose}>
          ✕
        </button>

        <img src={YogaRegister} alt="Yoga" className="auth-img" />
        <h2 className="auth-title">Crear cuenta</h2>
        <p className="auth-subtitle">Unite a nuestra comunidad consciente ✨</p>

        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="email"
            placeholder="Correo electrónico"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn">
            Registrarme
          </button>
        </form>

        {error && <p className="auth-error">{error}</p>}

        <p className="auth-footer">
          ¿Ya tenés cuenta?{" "}
          <span
            className="auth-link"
            onClick={() => navigate("/login", { state: { from: location.pathname } })}
          >
            Iniciá sesión
          </span>
        </p>
      </div>
    </div>
  );
}
