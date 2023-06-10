import * as service from '../../services/mascotas.services.js'

function getMascotas(req, res) {
    const filter = req.query

    service.getMascotas(filter)
        .then(function (mascotas) {
            res.status(200).json(mascotas)
        })
}

function getMascotaById(req, res) {
  const idMascota = req.params.idMascota

  service.getMascotaById(idMascota)
      .then(function (mascota) {
          if (mascota) {
              res.status(200).json(mascota)
          }
          else {
              res.status(404).json({ error: { message: `No se encuentra la mascota #${idMascota}` } })
          }
      })
}

function createMascota(req, res) {
    service.createMascota(req.body)
        .then(function (mascota) {
            return res.status(201).json(mascota)
        })
}


export {
 getMascotas,
 createMascota,
 getMascotaById
}