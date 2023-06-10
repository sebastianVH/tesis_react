import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Error404 from './pages/Error404'
import 'bootstrap/dist/css/bootstrap.css'
import MascotaListPage from './pages/mascotas/MascotaListPage'
import MascotaDetailsPage from './pages/mascotas/MascotaDetailsPage'
import {
  createBrowserRouter, // crea el contexto de la ruta
  RouterProvider
} from 'react-router-dom'

// preparamos el router
const router = createBrowserRouter([
  {
    path: '/', // la url de la pagina
    element: <App />, // pagina
    errorElement: <Error404 />,
    children: [
      {
        path: 'mascotas',
        element: <MascotaListPage />
      },
      {
        path: 'mascotas/:idMascota',
        element: <MascotaDetailsPage />
      },
      /*{
        path: 'mascotas/crear',
        element: <CrearMascota />
      },*/
    ]
  },
  
  
])

// JSX
ReactDOM.createRoot(document.getElementById('root'))

.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
