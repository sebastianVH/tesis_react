import { useEffect, useState } from "react";
import CustomInput from "./microcomponents/CustomInput";
import CreadoConExito from "./microcomponents/CreadoConExito";
import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";
import CloudinaryUploadWidget from "./microcomponents/cloudinaryWidget";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import GoogleMapComponent from "./GoogleMaps";

function CrearMascota() {
  const [mascota, setMascota] = useState({});
  const [success, setSuccess] = useState(false);
  const [provincias, setProvincias] = useState([]);
  const [formData, setFormData] = useState({});
  const [imgMascota, setImgMascota] = useState("");
  const [previewMascota, setPreviewMascota] = useState("");

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const setCoordenadas = (coord) => {
    formData.ubicacion = coord;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    if (imgMascota) {
      formData.imagen = imgMascota;
    }

    try {
      const response = await axios.post(
        "http://localhost:2023/api/mascotas",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      setMascota(response.data);
      setSuccess(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const cld = new Cloudinary({
    cloud: {
      cloudName: "huellasacasa",
    },
  });

  useEffect(() => {
    const getProvincias = async () => {
      const { data } = await axios.get(
        "https://apis.datos.gob.ar/georef/api/provincias"
      );
      const provinciasNombre = data.provincias.map((prov) => prov.nombre);
      setProvincias(provinciasNombre);
    };
    getProvincias();
  }, []);

  const imgMascotaRender = cld.image(previewMascota);

  return (
    <div>
      <form
        id="form-crear_encontrado"
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
      >
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
              label="Provincia (obligatorio)"
              name="provincia"
              type="select"
              options={provincias}
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
          <CloudinaryUploadWidget
            setImgMascota={setImgMascota}
            setPreviewMascota={setPreviewMascota}
          />

          <div style={{ width: "100px" }}>
            <AdvancedImage
              style={{ maxWidth: "100px" }}
              cldImg={imgMascotaRender}
              plugins={[responsive(), placeholder()]}
            />
          </div>
          <GoogleMapComponent setCoordenadas={setCoordenadas} />
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
