import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { UserContext } from "./UserContext";
import MascotaListItem from "./MascotaListItem";
import "./MascotaList.css";
import GoogleMapComponent from "./GoogleMaps";
import CustomInput from "./microcomponents/CustomInput";
import axios from "axios";

function MascotasList({ categoria, account }) {
  const [mascotas, setMascotas] = useState([]);
  const [mascotasAll, setMascotasAll] = useState([]);
  const [filtros, setFiltros] = useState({});
  const [filtroNombre, setFiltroNombre] = useState("");
  const [provincias, setProvincias] = useState([]);

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
        mascota.nombre?.toLowerCase().includes(filtroNombre.toLowerCase());
      const sexoCoincide =
        !filtros.sexo ||
        mascota.sexo.toLowerCase() === filtros.sexo.toLowerCase();
      const especieCoincide =
        !filtros.especie ||
        mascota.especie.toLowerCase() === filtros.especie.toLowerCase();
      const tamanioCoincide =
        !filtros.tamanio ||
        mascota.tamano.toLowerCase() === filtros.tamanio.toLowerCase();
      const collarCoincide =
        !filtros.collar || mascota.collar === filtros.collar;
      const provinciaCoincide =
        !filtros.provincia || mascota?.provincia === filtros.provincia;

      return (
        nombreCoincide &&
        sexoCoincide &&
        especieCoincide &&
        tamanioCoincide &&
        collarCoincide &&
        provinciaCoincide
      );
    });

    setMascotas(mascotasFiltradas);
  };

  const onChangeFilter = (event) => {
    setFiltroNombre(event.target.value);
  };

  const onCheckboxChange = (event) => {
    const { name, value } = event.target;
    setFiltros({ ...filtros, [name]: value == filtros[name] ? "" : value });
    aplicarFiltros();
  };

  const handleInputChange = (name, value) => {
    setFiltros({ ...filtros, [name]: value == filtros[name] ? "" : value });
    aplicarFiltros();
  };

  useEffect(() => {
    const getProvincias = async () => {
      const { data } = await axios.get(
        "https://apis.datos.gob.ar/georef/api/provincias"
      );
      const provinciasNombre = data.provincias.map((prov) => prov.nombre);
      setProvincias(provinciasNombre);
    };
    cambiarFiltro(categoria, account);
    getProvincias();
  }, [categoria, account]);

  useEffect(() => {
    aplicarFiltros();
  }, [filtroNombre, filtros]);

  const { userData } = useContext(UserContext);

  const getButtonClassName = (name) => {
    switch (name) {
      case "perros":
        return filtros.especie === "Perro" ? "bg-1 active" : "bg-1";
      case "gatos":
        return filtros.especie === "Gato" ? "bg-1 active" : "bg-1";
      case "machos":
        return filtros.sexo === "Macho" ? "bg-1 active" : "bg-1";
      case "hembras":
        return filtros.sexo === "Hembra" ? "bg-1 active" : "bg-1";
      case "chicos":
        return filtros.tamanio === "Chico" ? "bg-1 active" : "bg-1";
      case "medianos":
        return filtros.tamanio === "Mediano" ? "bg-1 active" : "bg-1";
      case "grandes":
        return filtros.tamanio === "Grande" ? "bg-1 active" : "bg-1";
      case "Tiene collar con chapita":
        return filtros.collar === "Tiene collar con chapita"
          ? "bg-1 active"
          : "bg-1";
      case "Tiene collar sin chapita":
        return filtros.collar === "Tiene collar sin chapita"
          ? "bg-1 active"
          : "bg-1";
      case "No tiene collar":
        return filtros.collar === "No tiene collar" ? "bg-1 active" : "bg-1";
      default:
        return "";
    }
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
                          name="especie"
                          value={"Perro"}
                          onChange={onCheckboxChange}
                        />
                        Perros
                      </label>
                    </div>
                    <div className="botones-choice px-2">
                      <label className={getButtonClassName("gatos")}>
                        <input
                          type="checkbox"
                          name="especie"
                          value={"Gato"}
                          onChange={onCheckboxChange}
                        />
                        Gatos
                      </label>
                    </div>
                  </div>
                </div>
                <div className="filter-container text-left pb-4">
                  <p>Ubicacion</p>
                  <div className="overflow-hidden btns-filters d-flex flex-wrap select-provincias-filtro">
                    <CustomInput
                      name="provincia"
                      type="select"
                      options={provincias}
                      onChange={handleInputChange}
                    />{" "}
                  </div>
                </div>
                <div className="filter-container text-left pb-4">
                  <p>Sexo</p>
                  <div className="btns-filters d-flex flex-wrap">
                    <div className="botones-choice px-1 pb-2">
                      <label className={getButtonClassName("machos")}>
                        <input
                          type="checkbox"
                          name="sexo"
                          value={"Macho"}
                          onChange={onCheckboxChange}
                        />
                        Machos
                      </label>
                    </div>
                    <div className="botones-choice px-1 pb-2">
                      <label className={getButtonClassName("hembras")}>
                        <input
                          type="checkbox"
                          name="sexo"
                          value={"Hembra"}
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
                          name="tamanio"
                          value="Chico"
                          onChange={onCheckboxChange}
                        />
                        Chicos
                      </label>
                    </div>
                    <div className="botones-choice px-1 pb-2">
                      <label className={getButtonClassName("medianos")}>
                        <input
                          type="checkbox"
                          name="tamanio"
                          value="Mediano"
                          onChange={onCheckboxChange}
                        />
                        Medianos
                      </label>
                    </div>
                    <div className="botones-choice px-1">
                      <label className={getButtonClassName("grandes")}>
                        <input
                          type="checkbox"
                          name="tamanio"
                          value="Grande"
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
                          onChange={onCheckboxChange}
                        />
                        Sin collar
                      </label>
                    </div>
                  </div>
                </div>

                {/* <div className="filter-container text-left pb-4">
                  <p>Ubicacion</p>
                  <GoogleMapComponent />
                </div> */}
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
