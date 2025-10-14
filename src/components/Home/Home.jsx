import "./Home.css";
import "aos/dist/aos.css"; // Importa los estilos de AOS
import AOS from "aos";
import { useEffect } from "react";

import LogoCaracol from "../../assets/LogoCaracol.png";
import fotoMica from "../../assets/micaela.jpg";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200, 
      easing: "ease-in-out",
      once: true, 
    });
  }, []);

  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="hero" data-aos="fade-up">
        <div className="hero-overlay">
          <img
            src={LogoCaracol}
            alt="Logo caracol"
            className="hero-logo"
            data-aos="zoom-in"
          />
          <h1 className="hero-title" data-aos="fade-right">
            Mística & Mundana
          </h1>
          <p className="hero-subtitle" data-aos="fade-left">
            Comparto la filosofía y cosmovisión del yoga desde un enfoque
            matrístico, atravesado por la naturaleza visceral e intuitiva de las
            mujeres.
          </p>

          <button className="btn-mistica" data-aos="zoom-in">
            <span className="btn-text">Explorar</span>
            <div className="destello destello1"></div>
            <div className="destello destello2"></div>
          </button>

          <div className="petal" style={{ top: "10%", left: "20%" }}></div>
          <div className="petal" style={{ top: "30%", right: "15%" }}></div>
          <div className="petal" style={{ bottom: "15%", left: "35%" }}></div>
        </div>
      </section>

      

      {/* DESCRIPCIÓN MICAELA */}
      <section className="about">

         <h2 className="about-title" data-aos="fade-left">
              Mi esencia
            </h2>
        
        <div className="about-container">
          <div className="about-image" data-aos="fade-right">
            <img src={fotoMica} alt="Micaela" />
            <h2 className="about-name" data-aos="fade-left">
              Micaela & Moksha
            </h2>
          </div>
          <div className="about-text">
            <div className="text-block" data-aos="fade-up" data-aos-delay="100">
              <img
                src="https://static.thenounproject.com/png/luna-moth-icon-41785-512.png"
                alt="Polilla Luna"
              />
              <p>
                Mi camino está guiado por la <strong>autoconsciencia</strong> y
                la <strong>compasión</strong>, en un proceso de{" "}
                <strong>autoconocimiento</strong> y conexión con los{" "}
                <strong>aspectos sutiles del ser</strong>. Ser guía y compañía
                en este recorrido es mi <strong>propósito</strong>, y{" "}
                <strong>recuperar la intuición</strong> es la intención que me
                impulsa a compartir mis herramientas. Deseo que podamos{" "}
                <strong>reconocernos como hogar</strong>, volver al{" "}
                <strong>estado interno de amor</strong> y transitar la vida
                desde un lugar <strong>amoroso y trascendente</strong>.
              </p>
            </div>

            <div className="text-block" data-aos="fade-up" data-aos-delay="300">
              <img
                src="https://static.thenounproject.com/png/moon-phases-icon-3292573-512.png"
                alt="Fases de la Luna"
              />

              <p>
                Camino a través de herramientas que fueron las bases sobre las
                cuales me conocí (y aún continuo haciéndolo). Me acompañan la{" "}
                <strong>meditación</strong>, la <strong>filosofía</strong>, el{" "}
                <strong>dharma yoga</strong>, la{" "}
                <strong>cosmovisión matrística</strong> y la{" "}
                <strong>escritura medicina</strong>.
              </p>
            </div>

            <div className="text-block" data-aos="fade-up" data-aos-delay="500">
              <img
                src="https://static.thenounproject.com/png/yoga-icon-7742509-512.png"
                alt="Yoga"
              />

              <p>
                Siento que los aprendizajes más valiosos son los que me trajo la{" "}
                <strong>vida</strong> a través de sus experiencias, que me
                enseñaron que todo conocimiento debe ser{" "}
                <strong>integrado en el cuerpo</strong> para transformarse en{" "}
                <strong>sabiduría</strong>.
                <br />
                El lugar más respetuoso para compartir mis saberes es el de{" "}
                <strong>acompañar y guiar</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
