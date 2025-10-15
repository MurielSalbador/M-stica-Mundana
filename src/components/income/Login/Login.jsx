import { useState } from "react";
import { supabase } from "../../../../supabaseClient";
import YogaLogin from "../../../assets/YogaLogin.jpg";
import { Link, useNavigate, useLocation} from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import "../auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const { setUser } = useAuthStore();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
  e.preventDefault();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    setError(error.message);
    return;
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    setUser(profile);
    localStorage.setItem("user", JSON.stringify(profile));

    // ✨ Después de actualizar el estado, navegamos
    navigate("/");
  }
};


 const handleClose = () => {
    navigate(location.state?.from || "/");
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card">
        <button className="auth-close" onClick={handleClose}>
          ✕
        </button>

        <img src={YogaLogin} alt="Yoga" className="auth-img" />
        <h2 className="auth-title">Bienvenido a tu espacio</h2>
        <p className="auth-subtitle">Conectá con tu equilibrio interior</p>

        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn">
            Iniciar sesión
          </button>
        </form>

        {error && <p className="auth-error">{error}</p>}

        <p className="auth-footer">
          ¿No tenés cuenta?{" "}
          <Link to="/register" className="auth-link">
            Registrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
