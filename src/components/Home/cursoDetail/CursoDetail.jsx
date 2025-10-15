import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../../../supabaseClient";

const CursoDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.error(error);
      else setCourse(data);
    };

    fetchCourse();
  }, [id]);

  if (!course) return <p>Cargando curso...</p>;

  return (
    <div className="curso-detail">
      <h2>{course.title}</h2>
      <img src={course.image_url} alt={course.title} />
      <p>{course.description}</p>

      {/* Aquí podés agregar manualmente la descripción larga, videos, imágenes */}
      <div className="curso-sections">
        <h3>Secciones</h3>
        <div>
          <p>Aquí va la descripción larga del curso</p>
          <img src="ruta-a-otra-imagen.jpg" alt="Ejemplo" />
          <video src="ruta-a-video.mp4" controls />
        </div>
      </div>
    </div>
  );
};

export default CursoDetail;
