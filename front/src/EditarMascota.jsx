import { useState } from "react";
import CustomInput from "./microcomponents/CustomInput";
import CreadoConExito from "./microcomponents/CreadoConExito";
import { useEffect } from "react";
import PropTypes from "prop-types";

function EditarMascota({ idMascota }) {
  const [mascota, setMascota] = useState({});
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:2023/api/mascotas/${idMascota}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setMascota(data);
        }
      });
  }, [idMascota]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:2023/api/mascotas/${mascota._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setMascota({ ...mascota, ...data });
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
            initialValue={mascota.categoria}
            name="categoria"
            type="select"
            options={["Perdido", "Encontrado"]}
            onChange={handleInputChange}
          />
          <CustomInput
            label="Especie"
            initialValue={mascota.especie}
            name="especie"
            type="select"
            options={["Perro", "Gato"]}
            onChange={handleInputChange}
          />
          <CustomInput
            label="Nombre"
            initialValue={mascota.nombre}
            name="nombre"
            type="text"
            onChange={handleInputChange}
          />
          <CustomInput
            label="Tamaño"
            initialValue={mascota.tamano}
            name="tamano"
            type="select"
            options={["Chico", "Mediano", "Grande"]}
            onChange={handleInputChange}
          />
          <CustomInput
            label="Color"
            initialValue={mascota.color}
            name="color"
            type="text"
            onChange={handleInputChange}
          />
          <CustomInput
            label="Sexo"
            initialValue={mascota.sexo}
            name="sexo"
            type="select"
            options={["Macho", "Hembra"]}
            onChange={handleInputChange}
          />
          <CustomInput
            label="Edad"
            initialValue={mascota.edad}
            name="edad"
            type="text"
            onChange={handleInputChange}
          />
          <CustomInput
            label="Raza"
            initialValue={mascota.raza}
            name="raza"
            type="text"
            onChange={handleInputChange}
          />
          <CustomInput
            label="Collar"
            initialValue={mascota.collar}
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
            initialValue={mascota.zona_perdida}
            name="zona_perdida"
            type="text"
            onChange={handleInputChange}
          />
          <CustomInput
            label="Fecha"
            initialValue={mascota.fecha}
            name="fecha"
            type="date"
            onChange={handleInputChange}
          />
          <CustomInput
            label="Descripción"
            initialValue={mascota.descripcion}
            name="descripcion"
            type="textarea"
            onChange={handleInputChange}
          />
          <CustomInput
            label="Email"
            initialValue={mascota.email}
            name="email"
            type="text"
            onChange={handleInputChange}
          />
          <CustomInput
            label="Celular"
            initialValue={mascota.celular}
            name="celular"
            type="text"
            onChange={handleInputChange}
          />
          <CustomInput
            label="WhatsApp"
            initialValue={mascota.whatsapp}
            name="whatsapp"
            type="text"
            onChange={handleInputChange}
          />
          <CustomInput
            label="Foto"
            name="imagen"
            type="image"
            onChange={handleInputChange}
            // value={mascota.imagen}
          />
        </div>

        <button
          id="boton-crear_encontrado"
          className="btn btn-primary redbtn float-right my-2 text-white text-center my-5 col-md-2 boton-color"
          type="submit"
        >
          Editar
        </button>
      </form>
    </div>
  );
}

export default EditarMascota;

EditarMascota.propTypes = {
  idMascota: PropTypes.string.isRequired,
};
