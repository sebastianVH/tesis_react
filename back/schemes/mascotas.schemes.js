import yup from "yup";

const mascota = yup.object({
  nombre: yup.string().optional(),
  sexo: yup.string().oneOf(["Macho", "Hembra"]).required(),
  especie: yup.string().oneOf(["Perro", "Gato"]).required(),
  tamano: yup.string().oneOf(["Chico", "Mediano", "Grande"]).required(),
  color: yup.string().required(),
  imagen: yup.string().optional(),
  raza: yup.string().optional(),
  edad: yup.string().optional(),
  zona_perdida: yup.string().required(),
  fecha: yup.string().required(),
  descripcion: yup.string().optional(),
  celular: yup.string().required(),
  whatsapp: yup.string().optional(),
  categoria: yup.string().oneOf(["Perdido", "Encontrado"]).required(),
  collar: yup
    .string()
    .oneOf([
      "Tiene collar con chapita",
      "Tiene collar sin chapita",
      "No tiene collar",
    ])
    .optional(),
});

const editMascota = yup.object({
  nombre: yup.string().optional(),
  sexo: yup.string().oneOf(["Macho", "Hembra"]).optional(),
  especie: yup.string().oneOf(["Perro", "Gato"]).optional(),
  tamano: yup.string().oneOf(["Chico", "Mediano", "Grande"]).optional(),
  color: yup.string().optional(),
  raza: yup.string().optional(),
  edad: yup.string().optional(),
  zona_perdida: yup.string().optional(),
  fecha: yup.string().optional(),
  descripcion: yup.string().optional(),
  celular: yup.string().optional(),
  whatsapp: yup.string().optional(),
  categoria: yup.string().oneOf(["Perdido", "Encontrado"]).optional(),
  imagen: yup.string().optional(),
  collar: yup
    .string()
    .oneOf([
      "Tiene collar con chapita",
      "Tiene collar sin chapita",
      "No tiene collar",
    ])
    .optional(),
});

export { mascota, editMascota };
