import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./MascotaListItem.css";

function MascotaListItem({ mascota }) {
  return (
    <div className="col-lg-3 col-6 d-flex align-items-stretch px-2 px-md-3 mb-4 ">
      <Link to={`/mascotas/${mascota._id}`} className="mascota-view">
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
            <div className="botones row">
              <div className="col-6">
                <Link
                  to={`/mascotas/${mascota.categoria}s/eliminar/${mascota._id}`}
                >
                  <button className="btn btn-naranja btn-block">
                    Eliminar
                  </button>
                </Link>
              </div>
              <div className="col-6">
                <Link
                  to={`/mascotas/${mascota.categoria}s/editar/${mascota._id}`}
                >
                  <button className="btn btn-azul btn-block">Editar</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

MascotaListItem.propTypes = {
  mascota: PropTypes.object.isRequired,
};

export default MascotaListItem;
