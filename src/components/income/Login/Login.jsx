import { useState } from "react";
import { supabase } from "../../../../supabaseClient";
import YogaLogin from "../../../assets/YogaLogin.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import "../auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuthStore();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error(profileError.message);
      }

      setUser(profile);
      await supabase.auth.refreshSession(); 
      navigate("/");

      setLoading(false);

      setTimeout(() => {
        navigate("/");
      }, 100);
    }
  };

  const handleClose = () => {
    navigate(location.state?.from || "/");
  };

  return (
    <div className="auth-page">
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
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar sesión"}
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
