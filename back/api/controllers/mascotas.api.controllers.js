import * as service from "../../services/mascotas.services.js";

function getMascotas(req, res) {
  const filter = req.query;

  service.getMascotas(filter).then(function (mascotas) {
    res.status(200).json(mascotas);
  });
}

function getMascotaById(req, res) {
  const idMascota = req.params.idMascota;

  service.getMascotaById(idMascota).then(function (mascota) {
    if (mascota) {
      res.status(200).json(mascota);
    } else {
      res.status(404).json({
        error: { message: `No se encuentra la mascota #${idMascota}` },
      });
    }
  });
}

function createMascota(req, res) {
  service.createMascota(req.body, req.account._id).then(function (mascota) {
    return res.status(201).json(mascota);
  });
}

function editMascota(req, res) {
  const idMascota = req.params.idMascota;

  service.editMascota(idMascota, req.body).then(function (mascota) {
    return res.status(200).json(mascota);
  });
}

function deleteMascota(req, res) {
  const idMascota = req.params.idMascota;

  service.deleteMascota(idMascota).then(function () {
    return res.status(200).json({ message: `Mascota #${idMascota} eliminada` });
  });
}

export {
  getMascotas,
  createMascota,
  getMascotaById,
  editMascota,
  deleteMascota,
};
