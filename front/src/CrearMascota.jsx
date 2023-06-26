import { useState } from "react";
// import { useParams } from "react-router-dom";
import CustomInput from "./microcomponents/CustomInput";
import CreadoConExito from "./microcomponents/CreadoConExito";
// import axios from "axios";

function CrearMascota() {
  const [mascota, setMascota] = useState({});
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:2023/api/mascotas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setMascota(data);
        setSuccess(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <form id="form-crear_encontrado" onSubmit={handleFormSubmit}>
        <div className="row form_carga">
          <div className="col-md-6 col-lg-4">
            <CustomInput
              label="¿Se perdió tu mascota o la encontraste perdida? (obligatorio)"
              name="categoria"
              type="select"
              options={["Perdido", "Encontrado"]}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 col-lg-4">
            <CustomInput
              label="Especie (obligatorio)"
              name="especie"
              type="select"
              options={["Perro", "Gato"]}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 col-lg-4">
            <CustomInput
              label="Nombre"
              name="nombre"
              type="text"
              onChange={handleInputChange}
            />{" "}
          </div>
          <div className="col-md-6 col-lg-4">
            <CustomInput
              label="Tamaño (obligatorio)"
              name="tamano"
              type="select"
              options={["Chico", "Mediano", "Grande"]}
              onChange={handleInputChange}
            />{" "}
          </div>
          <div className="col-md-6 col-lg-4">
            <CustomInput
              label="Color (obligatorio)"
              name="color"
              type="text"
              onChange={handleInputChange}
            />{" "}
          </div>
          <div className="col-md-6 col-lg-4">
            <CustomInput
              label="Sexo (obligatorio)"
              name="sexo"
              type="select"
              options={["Macho", "Hembra"]}
              onChange={handleInputChange}
            />{" "}
          </div>
          <div className="col-md-6 col-lg-4">
            <CustomInput
              label="Edad"
              name="edad"
              type="text"
              onChange={handleInputChange}
            />{" "}
          </div>
          <div className="col-md-6 col-lg-4">
            <CustomInput
              label="Raza"
              name="raza"
              type="text"
              onChange={handleInputChange}
            />{" "}
          </div>
          <div className="col-md-6 col-lg-4">
            <CustomInput
              label="Collar"
              name="collar"
              type="select"
              options={[
                "Tiene collar con chapita",
                "Tiene collar sin chapita",
                "No tiene collar",
              ]}
              onChange={handleInputChange}
            />{" "}
          </div>
          <div className="col-md-6 col-lg-4">
            <CustomInput
              label="Zona (obligatorio)"
              name="zona_perdida"
              type="text"
              onChange={handleInputChange}
            />{" "}
          </div>
          <div className="col-md-6 col-lg-4">
            <CustomInput
              label="Fecha (obligatorio)"
              name="fecha"
              type="date"
              onChange={handleInputChange}
            />{" "}
          </div>
          <div className="col-md-6 col-lg-4">
            <CustomInput
              label="Descripción"
              name="descripcion"
              type="textarea"
              onChange={handleInputChange}
            />{" "}
          </div>
          <div className="col-md-6 col-lg-4">
            <CustomInput
              label="Email"
              name="email"
              type="text"
              onChange={handleInputChange}
            />{" "}
          </div>

          <div className="col-md-6 col-lg-4">
            <CustomInput
              label="Celular (obligatorio)"
              name="celular"
              type="text"
              onChange={handleInputChange}
            />{" "}
          </div>

          <div className="col-md-6 col-lg-4">
            <CustomInput
              label="WhatsApp"
              name="whatsapp"
              type="text"
              onChange={handleInputChange}
            />{" "}
          </div>
          <div className="col-md-6 col-lg-4">
            {/* <CustomInput
              label="Foto"
              name="imagen"
              type="image"
              onChange={handleInputChange}
            />{" "} */}
            <CustomInput
              label="URL a la foto (obligatorio)"
              name="imagen"
              type="text"
              onChange={handleInputChange}
            />{" "}
          </div>
        </div>

        {success ? (
          <CreadoConExito
            especie={mascota.especie}
            categoria={mascota.categoria}
          />
        ) : (
          <button
            id="boton-crear_encontrado"
            className="btn btn-primary redbtn float-right my-2 text-white text-center my-5 col-md-2 boton-color"
            type="submit"
          >
            Crear
          </button>
        )}
      </form>
    </div>
  );
}

export default CrearMascota;
