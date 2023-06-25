import MascotaListItem from "./MascotaListItem";
import "./MascotaList.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { UserContext } from "./UserContext";

function MascotasList({ categoria, account }) {
  const [mascotas, setMascotas] = useState([]);
  const [mascotasAll, setMascotasAll] = useState([]);

  const cambiarFiltro = (categoria, account) => {
    const filtro = categoria ? `categoria=${categoria}` : "";
    const filtro2 = account ? `account=${account}` : "";
    fetch(`http://localhost:2023/api/mascotas?${filtro}&${filtro2}`)
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
    cambiarFiltro(categoria, account);
  }, [categoria, account]);
  const { userData } = useContext(UserContext);
  return (
    <div className="mascota-list container-fluid">
      <div className="text-center col-12 titulo-seccion mx-auto pb-0">
        <h2 className="titulo-listado">
          <span className="light lowercase">Listado de</span> mascotas{" "}
          {categoria.toLowerCase().slice(0, -1) + "as"}
        </h2>
      </div>

      <div className="row justify-content-center justify-content-md-between text-center container-filtros pb-5 px-lg-5">
        <div className="col-12 col-md-9 px-0">
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
        {userData && userData._id ? (
          <div className="col-4 col-md-2">
            <Link
              className="btn btn-azul d-none d-md-block"
              to="/mascotas/nuevo"
            >
              Agregar
            </Link>

            <Link
              className="btn btn-azul btn-flotante d-md-none"
              to="/mascotas/nuevo"
            >
              <i className="bi bi-plus"></i>
            </Link>
          </div>
        ) : (
          <div className="col-4 col-md-2">
            <Link className="btn btn-azul" to="/login">
              Agregar
            </Link>
          </div>
        )}

        {/* <button onClick={() =>cambiarFiltroCategoria('Perdido')} className="btn btn-naranja mx-2">Perdidas</button>
          <button onClick={() =>cambiarFiltroCategoria('Encontrado')} className="btn btn-azul mx-2">Encontradas</button> */}

        {/* <Link to="/mascotas/perdidos" className="btn btn-naranja mx-2">Perdidos</Link>
          <Link to="/mascotas/encontrados" className="btn btn-naranja mx-2">Encontrados</Link> */}
      </div>

      <div className="container-fluid listado-perros px-lg-5">
        <div className="perrosencontrados row mascota-list__list px-lg-5">
          {/* <!-- Acá se imprimen las cards de mascotas --> */}
          {mascotas.map((mascota) => (
            <MascotaListItem
              key={mascota._id}
              mascota={mascota}
              account={account}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MascotasList;

MascotasList.propTypes = {
  categoria: PropTypes.string,
  account: PropTypes.string,
};
