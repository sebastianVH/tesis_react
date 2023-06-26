import MascotaListItem from "./MascotaListItem";
import "./MascotaList.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { UserContext } from "./UserContext";

// function MascotasList({ categoria, account }) {
//   const [mascotas, setMascotas] = useState([]);
//   const [mascotasAll, setMascotasAll] = useState([]);
//   const [especiePerros, setEspeciePerros] = useState(false);
//   const [especieGatos, setEspecieGatos] = useState(false);
//   const [filtroNombre, setFiltroNombre] = useState("");

//   const cambiarFiltro = (categoria, account) => {
//     const filtro = categoria ? `categoria=${categoria}` : "";
//     const filtro2 = account ? `account=${account}` : "";
//     fetch(`http://localhost:2023/api/mascotas?${filtro}&${filtro2}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setMascotasAll(data);
//         setMascotas(data);
//       });
//   };

//   const aplicarFiltros = () => {
//     let mascotasFiltradas = mascotasAll.filter((mascota) => {
//       const nombreCoincide =
//         !filtroNombre ||
//         mascota.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
//       const especieCoincide =
//         (!especiePerros && !especieGatos) ||
//         (especiePerros && mascota.especie === "Perro") ||
//         (especieGatos && mascota.especie === "Gato");

//       return nombreCoincide && especieCoincide;
//     });

//     setMascotas(mascotasFiltradas);
//   };

//   const onChangeFilter = (event) => {
//     setFiltroNombre(event.target.value);
//   };

//   const onCheckboxChange = (event) => {
//     const { name, checked } = event.target;

//     if (name === "perros") {
//       setEspeciePerros(checked);
//     }

//     if (name === "gatos") {
//       setEspecieGatos(checked);
//     }
//   };

//   useEffect(() => {
//     cambiarFiltro(categoria, account);
//   }, [categoria, account]);

//   useEffect(() => {
//     aplicarFiltros();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [filtroNombre, especiePerros, especieGatos]);

//   const { userData } = useContext(UserContext);

//   return (
//     <div className="mascota-list container-fluid">
//       <div className="text-center col-12 titulo-seccion mx-auto pb-0">
//         <h2 className="titulo-listado">
//           <span className="light lowercase">Listado de</span> mascotas{" "}
//           {categoria ? categoria.toLowerCase().slice(0, -1) + "as" : ""}
//         </h2>
//       </div>

//       <div className="row justify-content-center justify-content-md-between text-center container-filtros pb-5 px-lg-5">
//         <div className="col-12 col-md-9 px-0">
//           <form className="mascota-list__form">
//             Buscar:{" "}
//             <input
//               id="filtro"
//               className="mascota-list__filter"
//               type="text"
//               onInput={onChangeFilter}
//               placeholder="Escribí el nombre de la mascota"
//             />
//           </form>
//         </div>

//         {userData && userData._id ? (
//           <div className="col-4 col-md-2">
//             <Link
//               className="btn btn-azul d-none d-md-block"
//               to="/mascotas/nuevo"
//             >
//               Agregar
//             </Link>

//             <Link
//               className="btn btn-azul btn-flotante d-md-none"
//               to="/mascotas/nuevo"
//             >
//               <i className="bi bi-plus"></i>
//             </Link>
//           </div>
//         ) : (
//           <div className="col-4 col-md-2">
//             <Link className="btn btn-azul" to="/login">
//               Agregar
//             </Link>
//           </div>
//         )}

//         <div className="col-12">
//           <div className="container-fluid">
//             <div className="row">
//               <div className="col-6">
//                 <div className="botones-choice">
//                   <label className="{getButtonClassName()}">
//                     <input
//                       type="checkbox"
//                       name="perros"
//                       checked={especiePerros}
//                       onChange={onCheckboxChange}
//                     />
//                     Perros
//                   </label>
//                 </div>
//               </div>
//               <div className="col-6">
//                 <div className="botones-choice">
//                   <input
//                     type="checkbox"
//                     name="gatos"
//                     checked={especieGatos}
//                     onChange={onCheckboxChange}
//                   />
//                   <label className="bg-2">Gatos</label>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container-fluid listado-perros px-lg-5">
//         <div className="perrosencontrados row mascota-list__list px-lg-5">
//           {mascotas.map((mascota) => (
//             <MascotaListItem
//               key={mascota._id}
//               mascota={mascota}
//               account={account}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

function MascotasList({ categoria, account }) {
  const [mascotas, setMascotas] = useState([]);
  const [mascotasAll, setMascotasAll] = useState([]);
  const [especiePerros, setEspeciePerros] = useState(false);
  const [especieGatos, setEspecieGatos] = useState(false);
  const [filtroNombre, setFiltroNombre] = useState("");

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

  const aplicarFiltros = () => {
    let mascotasFiltradas = mascotasAll.filter((mascota) => {
      const nombreCoincide =
        !filtroNombre ||
        mascota.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
      const especieCoincide =
        (!especiePerros && !especieGatos) ||
        (especiePerros && mascota.especie === "Perro") ||
        (especieGatos && mascota.especie === "Gato");

      return nombreCoincide && especieCoincide;
    });

    setMascotas(mascotasFiltradas);
  };

  const onChangeFilter = (event) => {
    setFiltroNombre(event.target.value);
  };

  const onCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === "perros") {
      setEspeciePerros(checked);
    }

    if (name === "gatos") {
      setEspecieGatos(checked);
    }
  };

  useEffect(() => {
    cambiarFiltro(categoria, account);
  }, [categoria, account]);

  useEffect(() => {
    aplicarFiltros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtroNombre, especiePerros, especieGatos]);

  const { userData } = useContext(UserContext);

  const getButtonClassName = (name) => {
    if (name === "perros" && especiePerros) {
      return "bg-1 active";
    } else if (name === "perros" && !especiePerros) {
      return "bg-1";
    }

    if (name === "gatos" && especieGatos) {
      return "bg-2 active";
    } else if (name === "gatos" && !especieGatos) {
      return "bg-2";
    }

    return "";
  };

  return (
    <div className="mascota-list container-fluid">
      <div className="text-center col-12 titulo-seccion mx-auto pb-0">
        <h2 className="titulo-listado">
          <span className="light lowercase">Listado de</span> mascotas{" "}
          {categoria ? categoria.toLowerCase().slice(0, -1) + "as" : ""}
        </h2>
      </div>

      <div className="row justify-content-center justify-content-md-between text-center container-filtros px-lg-5">
        <div className="col-12 col-md-9 px-0">
          <form className="mascota-list__form">
            Buscar:{" "}
            <input
              id="filtro"
              className="mascota-list__filter"
              type="text"
              onInput={onChangeFilter}
              placeholder="Escribí el nombre de la mascota"
            />
          </form>
        </div>

        {userData && userData._id ? (
          <div className="col-4 col-md-3 col-lg-2">
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
          <div className="col-4 col-md-3 col-lg-2">
            <Link className="btn btn-azul d-none d-md-block" to="/login">
              Agregar
            </Link>

            <Link className="btn btn-azul btn-flotante d-md-none" to="/login">
              <i className="bi bi-plus"></i>
            </Link>
          </div>
        )}

        <div className="col-12 py-3">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col d-flex flex-row align-items-center justify-content-center">
                <div className="botones-choice px-2">
                  <label className={getButtonClassName("perros")}>
                    <input
                      type="checkbox"
                      name="perros"
                      checked={especiePerros}
                      onChange={onCheckboxChange}
                    />
                    Perros
                  </label>
                </div>
                <div className="botones-choice px-2">
                  <label className={getButtonClassName("gatos")}>
                    <input
                      type="checkbox"
                      name="gatos"
                      checked={especieGatos}
                      onChange={onCheckboxChange}
                    />
                    Gatos
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid listado-perros px-lg-5 py-3">
        <div className="perrosencontrados row mascota-list__list px-lg-5">
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
