import { useEffect, useState } from "react";
import { supabase } from "../../../../supabaseClient";

const MemberDetail = () => {
  const [membership, setMembership] = useState(null);

  useEffect(() => {
    const fetchMembership = async () => {
      const { data, error } = await supabase
        .from("memberships")
        .select("*")
        .eq("is_active", true)
        .single();

      if (error) {
        console.error("Error fetching membership:", error);
      } else {
        setMembership(data);
      }
    };

    fetchMembership();
  }, []);

  if (!membership) return <p>Cargando membresía...</p>;

  return (
    <div className="membership-page">
      <div className="membership-header" data-aos="fade-up">
        <img src={membership.image_url} alt={membership.title} />
        <h1>{membership.title}</h1>
      </div>

      <div className="membership-description" data-aos="fade-up">
        <p>{membership.description}</p>
        <div className="membership-price">
          <span>${membership.price}</span>
          <button>Unirme</button>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
