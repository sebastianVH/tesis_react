import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { UserContext } from "./UserContext";
import MascotaListItem from "./MascotaListItem";
import "./MascotaList.css";
import GoogleMapComponent from "./GoogleMaps";

function MascotasList({ categoria, account }) {
  const [mascotas, setMascotas] = useState([]);
  const [mascotasAll, setMascotasAll] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroSexo, setFiltroSexo] = useState("");
  const [filtroEspecie, setFiltroEspecie] = useState("");
  const [filtroTamano, setFiltroTamano] = useState("");
  const [filtroCollar, setFiltroCollar] = useState("");

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

      const sexoCoincide =
        !filtroSexo || mascota.sexo.toLowerCase() === filtroSexo.toLowerCase();

      const especieCoincide =
        !filtroEspecie ||
        mascota.especie.toLowerCase() === filtroEspecie.toLowerCase();

      const tamanoCoincide =
        !filtroTamano ||
        mascota.tamano.toLowerCase() === filtroTamano.toLowerCase();

      const collarCoincide =
        !filtroCollar ||
        (filtroCollar === "Tiene collar con chapita" &&
          mascota.collar.includes("Tiene collar con chapita")) ||
        (filtroCollar === "Tiene collar sin chapita" &&
          mascota.collar.includes("Tiene collar sin chapita")) ||
        (filtroCollar === "No tiene collar" &&
          mascota.collar.includes("No tiene collar"));

      return (
        nombreCoincide &&
        sexoCoincide &&
        especieCoincide &&
        tamanoCoincide &&
        collarCoincide
      );
    });

    setMascotas(mascotasFiltradas);
  };

  const onChangeFilter = (event) => {
    setFiltroNombre(event.target.value);
  };

  const onCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === "perros") {
      setFiltroEspecie(checked ? "Perro" : "");
    }

    if (name === "gatos") {
      setFiltroEspecie(checked ? "Gato" : "");
    }

    if (name === "machos") {
      setFiltroSexo(checked ? "Macho" : "");
    }

    if (name === "hembras") {
      setFiltroSexo(checked ? "Hembra" : "");
    }

    if (name === "chicos") {
      setFiltroTamano(checked ? "Chico" : "");
    }

    if (name === "medianos") {
      setFiltroTamano(checked ? "Mediano" : "");
    }

    if (name === "grandes") {
      setFiltroTamano(checked ? "Grande" : "");
    }

    if (name === "collar") {
      return filtroCollar ? "bg-1 active" : "bg-1";
    }

    if (name === "Tiene collar con chapita") {
      setFiltroCollar(checked ? "Tiene collar con chapita" : "");
    }

    if (name === "Tiene collar sin chapita") {
      setFiltroCollar(checked ? "Tiene collar sin chapita" : "");
    }

    if (name === "No tiene collar") {
      setFiltroCollar(checked ? "No tiene collar" : "");
    }

    aplicarFiltros();
  };

  useEffect(() => {
    cambiarFiltro(categoria, account);
  }, [categoria, account]);

  useEffect(() => {
    aplicarFiltros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtroNombre, filtroSexo, filtroEspecie, filtroTamano, filtroCollar]);

  const { userData } = useContext(UserContext);

  const getButtonClassName = (name) => {
    if (name === "perros") {
      return filtroEspecie === "Perro" ? "bg-1 active" : "bg-1";
    }

    if (name === "gatos") {
      return filtroEspecie === "Gato" ? "bg-1 active" : "bg-1";
    }

    if (name === "machos") {
      return filtroSexo === "Macho" ? "bg-1 active" : "bg-1";
    }

    if (name === "hembras") {
      return filtroSexo === "Hembra" ? "bg-1 active" : "bg-1";
    }

    if (name === "chicos") {
      return filtroTamano === "Chico" ? "bg-1 active" : "bg-1";
    }

    if (name === "medianos") {
      return filtroTamano === "Mediano" ? "bg-1 active" : "bg-1";
    }

    if (name === "grandes") {
      return filtroTamano === "Grande" ? "bg-1 active" : "bg-1";
    }

    if (name === "Tiene collar con chapita") {
      return filtroCollar ? "bg-1 active" : "bg-1";
    }

    if (name === "Tiene collar sin chapita") {
      return filtroCollar ? "bg-1 active" : "bg-1";
    }

    if (name === "No tiene collar") {
      return filtroCollar ? "bg-1 active" : "bg-1";
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
        {/* <div className="col-12 col-md-9 px-0">
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
        </div> */}

        {userData && userData._id ? (
          <div className="col-4 col-md-3">
            <Link
              className="btn btn-azul d-none d-md-block"
              to="/mascotas/nuevo"
            >
              Agregar mascota
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
              <div className="col-3 barra-filtros align-items-center justify-content-center py-4 text-left">
                <p className="filtros-title">Filtros de búsqueda</p>
                <div className="px-0 pb-4">
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
                <div className="filter-container text-left pb-4">
                  <p>Especie</p>
                  <div className="btns-filters d-flex flex-wrap">
                    <div className="botones-choice">
                      <label className={getButtonClassName("perros")}>
                        <input
                          type="checkbox"
                          name="perros"
                          checked={filtroEspecie === "Perro"}
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
                          checked={filtroEspecie === "Gato"}
                          onChange={onCheckboxChange}
                        />
                        Gatos
                      </label>
                    </div>
                  </div>
                </div>

                <div className="filter-container text-left pb-4">
                  <p>Sexo</p>
                  <div className="btns-filters d-flex flex-wrap">
                    <div className="botones-choice px-1 pb-2">
                      <label className={getButtonClassName("machos")}>
                        <input
                          type="checkbox"
                          name="machos"
                          checked={filtroSexo === "Macho"}
                          onChange={onCheckboxChange}
                        />
                        Machos
                      </label>
                    </div>
                    <div className="botones-choice px-1 pb-2">
                      <label className={getButtonClassName("hembras")}>
                        <input
                          type="checkbox"
                          name="hembras"
                          checked={filtroSexo === "Hembra"}
                          onChange={onCheckboxChange}
                        />
                        Hembras
                      </label>
                    </div>
                  </div>
                </div>

                <div className="filter-container text-left pb-4">
                  <p>Tamaño</p>
                  <div className="btns-filters d-flex flex-wrap">
                    <div className="botones-choice px-1 pb-2">
                      <label className={getButtonClassName("chicos")}>
                        <input
                          type="checkbox"
                          name="chicos"
                          checked={filtroTamano === "Chico"}
                          onChange={onCheckboxChange}
                        />
                        Chicos
                      </label>
                    </div>
                    <div className="botones-choice px-1 pb-2">
                      <label className={getButtonClassName("medianos")}>
                        <input
                          type="checkbox"
                          name="medianos"
                          checked={filtroTamano === "Mediano"}
                          onChange={onCheckboxChange}
                        />
                        Medianos
                      </label>
                    </div>
                    <div className="botones-choice px-1">
                      <label className={getButtonClassName("grandes")}>
                        <input
                          type="checkbox"
                          name="grandes"
                          checked={filtroTamano === "Grande"}
                          onChange={onCheckboxChange}
                        />
                        Grandes
                      </label>
                    </div>
                  </div>
                </div>

                <div className="filter-container text-left pb-4">
                  <p>Collar</p>
                  <div className="btns-filters d-flex flex-wrap">
                    <div className="botones-choice px-1 pb-2">
                      <label
                        className={getButtonClassName(
                          "Tiene collar con chapita"
                        )}
                      >
                        <input
                          type="checkbox"
                          name="collar"
                          value="Tiene collar con chapita"
                          checked={filtroCollar === "Tiene collar con chapita"}
                          onChange={onCheckboxChange}
                        />
                        Con collar (chapa)
                      </label>
                    </div>
                    <div className="botones-choice px-1 pb-2">
                      <label
                        className={getButtonClassName(
                          "Tiene collar sin chapita"
                        )}
                      >
                        <input
                          type="checkbox"
                          name="collar"
                          value="Tiene collar sin chapita"
                          checked={filtroCollar === "Tiene collar sin chapita"}
                          onChange={onCheckboxChange}
                        />
                        Con collar (sin chapa)
                      </label>
                    </div>
                    <div className="botones-choice px-1 pb-2">
                      <label className={getButtonClassName("No tiene collar")}>
                        <input
                          type="checkbox"
                          name="collar"
                          value="No tiene collar"
                          checked={filtroCollar === "No tiene collar"}
                          onChange={onCheckboxChange}
                        />
                        Sin collar
                      </label>
                    </div>
                  </div>
                </div>

                <div className="filter-container text-left pb-4">
                  <p>Ubicacion</p>
                  <GoogleMapComponent />
                </div>
              </div>

              <div className="col-9 listado-perros px-lg-5 py-3">
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
          </div>
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
