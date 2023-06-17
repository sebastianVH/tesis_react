import { Router } from "express";
import * as controller from "../controllers/mascotas.api.controllers.js";
import {
  validateMascota,
  validateEditMascota,
} from "../../middlewares/mascotas.validate.middlewares.js";

const route = Router();

route.get("/mascotas", controller.getMascotas);
route.get("/mascotas/:idMascota", controller.getMascotaById);
route.post("/mascotas", [validateMascota], controller.createMascota);
route.patch(
  "/mascotas/:idMascota",
  [validateEditMascota],
  controller.editMascota
);
route.delete("/mascotas/:idMascota", controller.deleteMascota);

export default route;
