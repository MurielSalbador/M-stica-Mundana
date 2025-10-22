
import { useEffect, useState } from "react";
import { supabase } from "../../../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import Swal from "sweetalert2";
import MujeryLobo from "../../../assets/mujerYlobo.jpg";
import "./MemberDetail.css";

const MemberDetail = () => {
  const [membership, setMembership] = useState(null);
  const [hasPaid, setHasPaid] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleJoin = () => {
    navigate(`/checkout/${membership.id}`);
  };

  useEffect(() => {
    const fetchMembership = async () => {
      const { data, error } = await supabase
        .from("memberships")
        .select("*")
        .eq("is_active", true)
        .single();

      if (error) console.error("Error fetching membership:", error);
      else setMembership(data);
    };

    fetchMembership();
  }, []);

  useEffect(() => {
  const checkEnrollment = async () => {
    if (!user || !membership) return;

    const { data, error } = await supabase
      .from("membership_enrollments")
      .select("has_paid, expires_at")
      .eq("user_id", user.id)
      .eq("membership_id", membership.id)
      .single();

    if (!error && data?.has_paid) {
      const now = new Date();
      const expiresAt = new Date(data.expires_at);

      if (expiresAt > now) {
        setHasPaid(true); // ✅ acceso activo
      } else {
        setHasPaid(false);

        // Actualizamos la DB
        await supabase
          .from("membership_enrollments")
          .update({ has_paid: false })
          .eq("user_id", user.id)
          .eq("membership_id", membership.id);

        // ⚡ Mostramos alerta solo si no cerró antes en esta sesión
        const modalKey = `renewalAlertClosed_${membership.id}`;
        if (!sessionStorage.getItem(modalKey)) {
          Swal.fire({
            icon: "warning",
            title: "Tu membresía ha vencido",
            text: "¿Querés renovarla ahora?",
            showCancelButton: true,
            confirmButtonText: "Sí, renovar",
            cancelButtonText: "Cerrar",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(`/checkout/${membership.id}`);
            } else {
              // Marca que cerró el modal para esta sesión
              sessionStorage.setItem(modalKey, "true");
            }
          });
        }
      }
    }
  };

  checkEnrollment();
}, [user, membership, navigate]);


  if (!membership) return <p>Cargando membresía...</p>;

  return (
    <div className="yoga-container">
      <section className="yoga-hero">
        <img
          src={membership.image_url}
          alt={membership.title}
          className="yoga-hero-img"
        />
        <div className="yoga-hero-content">
          <h1 className="yoga-title">{membership.title}</h1>
          <p className="yoga-subtitle">{membership.description}</p>
        </div>
      </section>

      <section className="yoga-body">
        <div className="yoga-intro">
          <h2>MEMBRESÍA DE YOGA ONLINE</h2>

          {/* 🌞 SOL */}
          <p>
            <img
              src="https://static.thenounproject.com/png/6472975-512.png"
              alt="Sol"
              className="symbol"
            />
              <span className="symbol-line"></span>
            Un espacio de autoconocimiento, a través del cuerpo y la filosofía,
            donde nos reunimos para hacer tribu. <br />
            Para aprender a ritualizar la vida. <br />
            A recordar y devolver lo sagrado a lo simple, compartiendo
            herramientas para la vida.
            <br />
            Compartimos un espacio para recordar la propia sabiduría, 
            para observarnos, intencionar, integrar. <br />
            El camino es hacia dentro, pero acompañadas es mucho mejor.
          </p>

          {/* 🌙 LUNA */}
          <p>
            <img
              src="https://static.thenounproject.com/png/1903703-512.png"
              alt="Luna"
              className="symbol"
            />
              <span className="symbol-line"></span>
            A través de la práctica del yoga, volvemos al cuerpo con la
            intención de recuperar nuestra INTUICIÓN. <br />
            El cuerpo es el canal para la escucha visceral de nuestras
            emociones, la limpieza de nuestros condicionamientos más profundos y
            el canal más concreto que tiene nuestro ser para hablarnos.
          </p>

          {/* 🌳 ÁRBOL */}
          <p>
            <img
              src="https://static.thenounproject.com/png/8129625-512.png"
              alt="Árbol"
              className="symbol"
            />
              <span className="symbol-line"></span>
            La naturaleza intuitiva de las mujeres se expresa a través del
            cuerpo. No necesitamos ir más allá, sino escuchar lo real y salir de
            la mente cuando esos lenguajes se expresan.
            <br />
            Dejar de perdernos entre tanta sobreinformación y recordar que todas
            las respuestas y la sabiduría habitan en nosotras, nunca vendrán de
            afuera.
          </p>

          {/* 🪷 LOTO */}
          <p>
            <img
              src="https://static.thenounproject.com/png/7899215-512.png"
              alt="Loto"
              className="symbol"
            />
              <span className="symbol-line"></span>
            Nos encontramos con la intención de profundizar la escucha, el
            cuidado y la regulación de nuestro cuerpo, mente y emociones.
            <br />
            Dejar de arreglarnos y aprender a escucharnos para recordar que
            sabemos autorregularnos y habitarnos desde el amor.
            <br />
            Un espacio cuidado para recordarnos: enteras, reconectadas,
            intuitivas, vulnerables, reales.
          </p>
        </div>

        <div className="yoga-final">
          <div className="yoga-image">
            <img
              src={MujeryLobo}
              alt="Mujer y lobo"
              className="yoga-secondary-img"
            />
          </div>

          <div className="yoga-final-info">
            <div className="yoga-details">
              <h3>Nos encontramos</h3>
              <p>Los miércoles a las 19 hs, por Google Meet.</p>

              {hasPaid ? (
                <div className="zoom-info">
                  <p>
                    <b>Link:</b>{" "}
                    <a
                      href="https://meet.google.com/ficticio-zoom"
                      target="_blank"
                      rel="noreferrer"
                    >
                      meet.google.com/ficticio-zoom
                    </a>
                  </p>
                  <p>
                    <b>ID:</b> 123-456-789
                  </p>
                  <p>
                    <b>Contraseña:</b> 987654
                  </p>
                </div>
              ) : (
                <p className="locked-text">
                  {!hasPaid && (
                <button className="yoga-btn" onClick={handleJoin}>
                  🔒 Acceso disponible tras completar tu suscripción.
                </button>
              )}   
                </p>
              )}
            </div>

            <div className="yoga-price">
              <h3>Valor</h3>
              <p>$38.888 ARS / USD 33</p>
              {!hasPaid && (
                <button className="yoga-btn" onClick={handleJoin}>
                  Unirme
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MemberDetail;
