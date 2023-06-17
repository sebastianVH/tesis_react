import MascotaListItem from "./MascotaListItem";
import "./MascotaList.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function MascotasList({ categoria }) {
  const [mascotas, setMascotas] = useState([]);
  const [mascotasAll, setMascotasAll] = useState([]);

  const cambiarFiltroCategoria = (categoria) => {
    fetch(`http://localhost:2023/api/mascotas?categoria=${categoria}`)
      .then((response) => response.json())
      .then((data) => {
        setMascotasAll(data);
        setMascotas(data);
      });
  };

  const onChangeFilter = (event) => {
    setMascotas(
      mascotasAll.filter((e) =>
        e.nombre.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  // // ejercutar la funcion cuando se monta el componente
  // useEffect(()=>{
  //     fetch(`http://localhost:2023/api/mascotas?categoria=${filtroCategoria}`)
  //     .then(response => response.json())
  //     .then(data =>{
  //         setMascotasAll(data)
  //         setMascotas(data)
  //     })

  // }, [])

  // useEffect(()=>{

  // }, [mascotas])

  useEffect(() => {
    cambiarFiltroCategoria(categoria);
  }, [categoria]);

  return (
    <div className="mascota-list my-4">
      <div className="container text-center col-12 titulo-seccion mx-auto pb-0">
        <h2 className="titulo-listado">Listado de mascotas</h2>
      </div>
      <div className="row justify-content-end px-5"></div>
      <div className="container text-center container-filtros px-5">
        <div className="col-2">
          <Link className="btn btn-azul" to="/mascotas/nuevo">
            Agregar
          </Link>
        </div>
        {/* <button onClick={() =>cambiarFiltroCategoria('Perdido')} className="btn btn-naranja mx-2">Perdidas</button>
          <button onClick={() =>cambiarFiltroCategoria('Encontrado')} className="btn btn-azul mx-2">Encontradas</button> */}

        {/* <Link to="/mascotas/perdidos" className="btn btn-naranja mx-2">Perdidos</Link>
          <Link to="/mascotas/encontrados" className="btn btn-naranja mx-2">Encontrados</Link> */}
        <form className="mascota-list__form">
          Buscar:{" "}
          <input
            id="filtro"
            className="mascota-list__filter"
            type="text"
            onChange={onChangeFilter}
            placeholder="Escribí el nombre de la mascota"
          />
        </form>
      </div>

      <div className="container listado-perros px-5">
        <div className="perrosencontrados row mascota-list__list px-5">
          {/* <!-- Acá se imprimen las cards de mascotas --> */}
          {mascotas.map((mascota) => (
            <MascotaListItem key={mascota._id} mascota={mascota} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MascotasList;

MascotasList.propTypes = {
  categoria: PropTypes.string.isRequired,
};
