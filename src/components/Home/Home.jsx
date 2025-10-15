import "./Home.css";
import "aos/dist/aos.css"; // Importa los estilos de AOS
import AOS from "aos";

import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { useNavigate } from "react-router-dom";


import LogoCaracol from "../../assets/LogoCaracol.png";
import fotoMica from "../../assets/micaela.jpg";

const Home = () => {
    const [courses, setCourses] = useState([]);
const navigate = useNavigate();



useEffect(() => {
  const fetchCourses = async () => {
    const { data, error } = await supabase.from("courses").select("*");
    if (error) {
      console.error(error);
    } else {
      setCourses(data);
    }

console.log("Error:", error);
console.log("Data:", data);
  };

  fetchCourses();
}, []);
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
    });
    console.log("✅ AOS inicializado");
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
          Mi camino
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
      <strong>Autoconsciencia</strong> y <strong>compasión</strong> acompañan mi camino de autoconocimiento y formación en los aspectos sutiles de nuestro ser.
    
      Ser <strong>guía</strong> y <strong>compañía</strong> de quienes eligen este sendero es el propósito de mi camino.  
      La recuperación de nuestra <strong>intuición</strong> es la intención que me guía al compartir mis herramientas.

      <strong>Reconocernos como hogar</strong>, recuperar el estado interno originario de amor y sabernos capaces de transitar esta experiencia desde un lugar <strong>amoroso y trascendente</strong>, es mi deseo más profundo.
    </p>
  </div>

  <div className="text-block" data-aos="fade-up" data-aos-delay="300">
    <img
      src="https://static.thenounproject.com/png/moon-phases-icon-3292573-512.png"
      alt="Fases de la Luna"
    />
    <p>
      Camino a través de herramientas que fueron las bases sobre las cuales me conocí —y aún continúo haciéndolo—.
    
      Me acompañan la <strong>meditación</strong>, la <strong>filosofía</strong>, el <strong>dharma yoga</strong>, la <strong>cosmovisión matrística</strong> y la <strong>escritura medicina</strong>.
    
      Más allá de todo, siento que los aprendizajes más valiosos son los que me trajo la <strong>vida</strong> a través de sus experiencias.
    </p>
  </div>

  <div className="text-block" data-aos="fade-up" data-aos-delay="500">
    <img
      src="https://static.thenounproject.com/png/yoga-icon-7742509-512.png"
      alt="Yoga"
    />
    <p>
      Me enseñaron que todo conocimiento debe ser <strong>integrado en el cuerpo</strong> para transformarse en <strong>sabiduría</strong>.
   
      El lugar más respetuoso para compartir mis saberes es el de <strong>acompañar y guiar</strong>.
    
      El <strong>movimiento</strong>, el <strong>cambio</strong> y la <strong>muerte simbólica</strong> son partes innatas de todos los procesos de vida; aceptar y flexibilizar nuestra mente es esencial.
    
      La <strong>compasión</strong> y la <strong>humildad</strong> son bases para un camino de consciencia.
    
      Aprender a ser nuestro propio <strong>hogar</strong> es una <strong>revolución interna</strong>, porque nos hace soberanos de nuestro estado interno.
    
      Así recuperamos el estado natural de nuestro ser: el <strong>amor</strong>, y aprendemos a ver la vida a través de él.
    </p>
  </div>
</div>
        </div>
      </section>

      <section className="courses" data-aos="fade-up">
  <h2 className="courses-title">Cursos online</h2>
  <div className="courses-container">
    {courses.map((course, index) => (
      <div
        key={course.id}
        className={`course-card ${index % 2 === 0 ? "left" : "right"}`}
        data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
      >
        <div className="course-image-wrapper">
          <img src={course.image_url} alt={course.title} />
        </div>

        <div className="course-info">
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <button onClick={() => navigate(`/curso/${course.id}`)}>
            Más info
          </button>
        </div>
      </div>
    ))}
  </div>
</section>


    </div>
  );
};

export default Home;
