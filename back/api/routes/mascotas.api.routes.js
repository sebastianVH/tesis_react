import { Router } from "express";
import * as controller from "../controllers/mascotas.api.controllers.js";
import {
  validateMascota,
  validateEditMascota,
} from "../../middlewares/mascotas.validate.middlewares.js";
import { tokenVerify } from "../../middlewares/token.validate.middleware.js";

const route = Router();

route.get("/mascotas", controller.getMascotas);
route.get("/mascotas/:idMascota", controller.getMascotaById);
route.post(
  "/mascotas",
  [tokenVerify, validateMascota],
  controller.createMascota
);
route.patch(
  "/mascotas/:idMascota",
  [validateEditMascota],
  controller.editMascota
);
route.delete("/mascotas/:idMascota", controller.deleteMascota);

export default route;
