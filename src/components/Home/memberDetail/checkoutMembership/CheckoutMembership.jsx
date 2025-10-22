import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../../../../supabaseClient";
import { useAuthStore } from "../../../../store/useAuthStore";
import Swal from "sweetalert2";
import "./CheckoutMembership.css";

export default function MembershipCheckout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [membership, setMembership] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMembership = async () => {
      const { data, error } = await supabase
        .from("memberships")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error("Error fetching membership:", error);
      else setMembership(data);
    };

    fetchMembership();
  }, [id]);

  if (!membership) return <p>Cargando...</p>;

  const handlePayment = async () => {
    // 🔹 Validar método de pago
    if (!paymentMethod) {
      Swal.fire({
        icon: "warning",
        title: "Seleccioná un método de pago",
        text: "Por favor elegí Mercado Pago o PayPal antes de continuar.",
        confirmButtonText: "Entendido",
      });
      return;
    }

    // 🔹 Validar login
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "No estás logeado o registrado",
        text: "Para completar la compra necesitás iniciar sesión.",
        confirmButtonText: "Ir al login",
      }).then(() => {
        navigate("/login", { state: { from: `/checkout/${id}` } });
      });
      return;
    }

    // 🔹 Validar checkbox
    if (!isChecked) {
      Swal.fire({
        icon: "warning",
        title: "Falta confirmar",
        text: "Debes marcar la casilla para agregar la membresía.",
        confirmButtonText: "Ok",
      });
      return;
    }

    // 🔹 Simular pago
    setLoading(true);
    setTimeout(async () => {
      // Guardar en Supabase
      const now = new Date();
const expiration = new Date();
expiration.setMonth(expiration.getMonth() + 1); // acceso válido por 1 mes

const { error } = await supabase.from("membership_enrollments").upsert(
  {
    user_id: user.id,
    membership_id: membership.id,
    has_paid: true,
    auto_renew: false,
    payment_date: now.toISOString(),
    expires_at: expiration.toISOString(),
  },
  { onConflict: "user_id, membership_id" }
);

      if (error) {
        console.error("Error guardando suscripción:", error);
        Swal.fire({
          icon: "error",
          title: "Error al procesar el pago",
          text: "Intentalo nuevamente.",
        });
        setLoading(false);
        return;
      }

      // 🔹 Mostrar modal de suscripción exitosa
      Swal.fire({
        icon: "success",
        title: "¡Suscripción completada!",
        html: `<p>Ya estás suscrito a <b>${membership.title}</b>.</p>
               <p>Accedé a los contenidos y reuniones en la sección de membresía.</p>`,
        confirmButtonText: "Ir a la membresía",
      }).then(() => {
        navigate("/membresia");
      });

      setLoading(false);
    }, 1500);
  };

  return (
    <div className="checkout-container">
      {/* Izquierda */}
      <div className="checkout-info">
        <img src={membership.image_url} alt={membership.title} />
        <h2>{membership.title}</h2>
        <p>{membership.description}</p>
      </div>

      {/* Derecha */}
      <div className="checkout-form">
        <h3>
          ${membership.price.toFixed(2)} {membership.currency}
        </h3>
        <p className="checkout-sub">Cada mes</p>

        <div className="payment-options">
          <label>
            <input
              type="radio"
              name="payment"
              value="mercadopago"
              checked={paymentMethod === "mercadopago"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            Mercado Pago
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            PayPal
          </label>
        </div>

        <textarea
          className="checkout-terms"
          readOnly
          value={`Un espacio de autoconocimiento y reconexión. Al sumarte a “${membership.title}”, cultivás bienestar, presencia y herramientas reales para tu vida diaria.`}
        />

        <label className="checkbox extra">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />{" "}
          ¡Sí! Agregar Membresía.
        </label>

        <button
          className="checkout-btn"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Procesando..." : "Completar mi compra"}
        </button>
      </div>
    </div>
  );
}
