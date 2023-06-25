import { useState } from "react";
// import { useParams } from "react-router-dom";
import CustomInput from "./microcomponents/CustomInput";
import CreadoConExito from "./microcomponents/CreadoConExito";

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
      {success ? (
        <CreadoConExito
          especie={mascota.especie}
          categoria={mascota.categoria}
        />
      ) : (
        ""
      )}
      <form id="form-crear_encontrado" onSubmit={handleFormSubmit}>
        <div className="row">
          <CustomInput
            label="Categoria"
            name="categoria"
            type="select"
            options={["Perdido", "Encontrado"]}
            onChange={handleInputChange}
          />
          <CustomInput
            label="Especie"
            name="especie"
            type="select"
            options={["Perro", "Gato"]}
            onChange={handleInputChange}
          />
          <CustomInput
            label="Nombre"
            name="nombre"
            type="text"
            onChange={handleInputChange}
          />
          <CustomInput
            label="Tamaño"
            name="tamano"
            type="select"
            options={["Chico", "Mediano", "Grande"]}
            onChange={handleInputChange}
          />
          <CustomInput
            label="Color"
            name="color"
            type="text"
            onChange={handleInputChange}
          />
          <CustomInput
            label="Sexo"
            name="sexo"
            type="select"
            options={["Macho", "Hembra"]}
            onChange={handleInputChange}
          />
          <CustomInput
            label="Edad"
            name="edad"
            type="text"
            onChange={handleInputChange}
          />
          <CustomInput
            label="Raza"
            name="raza"
            type="text"
            onChange={handleInputChange}
          />
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
          />
          <CustomInput
            label="Zona"
            name="zona_perdida"
            type="text"
            onChange={handleInputChange}
          />
          <CustomInput
            label="Fecha"
            name="fecha"
            type="date"
            onChange={handleInputChange}
          />
          <CustomInput
            label="Descripción"
            name="descripcion"
            type="textarea"
            onChange={handleInputChange}
          />
          <CustomInput
            label="Email"
            name="email"
            type="text"
            onChange={handleInputChange}
          />
          <CustomInput
            label="Celular"
            name="celular"
            type="text"
            onChange={handleInputChange}
          />
          <CustomInput
            label="WhatsApp"
            name="whatsapp"
            type="text"
            onChange={handleInputChange}
          />
          <CustomInput
            label="Foto"
            name="imagen"
            type="image"
            onChange={handleInputChange}
          />
        </div>

        <button
          id="boton-crear_encontrado"
          className="btn btn-primary redbtn float-right my-2 text-white text-center my-5 col-md-2 boton-color"
          type="submit"
        >
          Crear
        </button>
      </form>
    </div>
  );
}

export default CrearMascota;
