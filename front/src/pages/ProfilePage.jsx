import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MascotasList from "../MascotaList";

function ProfilePage() {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    fetch(`http://localhost:2023/api/profile`, {
      headers: { "auth-token": token },
    })
      .then((response) => response.json())
      .then((data) => setProfile(data));
  }, [navigate]);

  return (
    <div>
      <h1>Bienvenido {profile.name}!</h1>
      <MascotasList account={profile._id} />
    </div>
  );
}

export default ProfilePage;
