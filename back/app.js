import express from 'express'
import MascotaRouteApi from './api/routes/mascotas.api.routes.js'
import cors from 'cors'

const app = express()
app.use(cors()); 

app.use(express.urlencoded({ extended: true })) 
app.use('/api', express.json()) 

app.use('/', express.static('public'))

app.use('/api', MascotaRouteApi)

app.listen(2023, function () {
    console.log('Servidor levantado! http://localhost:2023')
})
