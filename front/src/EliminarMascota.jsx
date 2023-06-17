import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function EliminarMascota({ idMascota }) {
  const [mascota, setMascota] = useState({});

  useEffect(() => {
    fetch(`http://localhost:2023/api/mascotas/${idMascota}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setMascota(data);
        }
      });
  }, [idMascota]);

  const handleEliminar = () => {
    fetch(`http://localhost:2023/api/mascotas/${idMascota}`, {
      method: "DELETE",
    })
      .then((response) => {
        window.location.href = `/mascotas/${mascota.categoria}s`;
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      {/* <h2>Eliminar Mascota </h2> */}
      <h3>Deseas eliminar la siguiente mascota?</h3>

      {/* card de la mascota */}
      <div className="card-perro">
        <img src={mascota.imagen} className="img-fluid rounded-img" />
        <div className="card-perro-content pb-3 pt-2">
          <h4>{mascota.nombre}</h4>
          <span>{mascota.raza}</span>
          <div className="div-ubicacion d-flex justify-content-around align-items-center">
            <p>
              <i className="icofont-location-pin icofont-2x ml-auto"></i>
              {mascota.zona_perdida}
            </p>
          </div>
        </div>
      </div>

      {/* boton para eliminar mascota    */}
      <button className="btn btn-naranja btn-block" onClick={handleEliminar}>
        Eliminar
      </button>
      <Link to={`/mascotas/${mascota.categoria}s`}>
        <button className="btn btn-azul btn-block">Cancelar</button>
      </Link>
    </div>
  );
}

export default EliminarMascota;

EliminarMascota.propTypes = {
  idMascota: PropTypes.string.isRequired,
};
