// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function CreadoConExito({ especie, categoria }) {
  return (
    <div className="hidden seccion-success-perdido">
      <section className="py-0 success-perdido">
        <div className="row justify-content-center align-items-center success">
          <div className="col-10 text-center">
            <i className="icofont-check-circled 5x naranja"></i>
            <h2>
              Tu {especie.toLowerCase()} {categoria.toLowerCase()} fue cargado
              con éxito!{" "}
            </h2>
            <Link className="btn" to={`../mascotas/${categoria}s`}>
              Volver al listado
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CreadoConExito;

CreadoConExito.propTypes = {
  especie: PropTypes.string.isRequired,
  categoria: PropTypes.string.isRequired,
};
