import * as mascotaScheme from '../schemes/mascotas.schemes.js'

function validateMascota(req, res, next) {
    mascotaScheme.mascota.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then(function (mascota) {
            req.body = mascota
            next()
        })
        .catch(function (err) {
            return res.status(500).json({ err })
        })
}

export {
    validateMascota
}