import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Error404 from "./pages/Error404";
import "bootstrap/dist/css/bootstrap.css";
import MascotaListPage from "./pages/mascotas/MascotaListPage";
import MascotaDetailsPage from "./pages/mascotas/MascotaDetailsPage";
import CrearMascotaPage from "./pages/mascotas/CrearMascotaPage";
import EditarMascotaPage from "./pages/mascotas/EditarMascotaPage";
import EliminarMascotaPage from "./pages/mascotas/EliminarMascotaPage";

import {
  createBrowserRouter, // crea el contexto de la ruta
  RouterProvider,
} from "react-router-dom";
// import CreadoConExito from "./microcomponents/CreadoConExito";

// preparamos el router
const router = createBrowserRouter([
  {
    path: "/", // la url de la pagina
    element: <App />, // pagina
    errorElement: <Error404 />,
    children: [
      {
        path: "mascotas/perdidos",
        element: <MascotaListPage categoria="Perdido" />,
      },
      {
        path: "mascotas/encontrados",
        element: <MascotaListPage categoria="Encontrado" />,
      },

      {
        path: "mascotas/:idMascota",
        element: <MascotaDetailsPage />,
      },
      {
        path: "mascotas/nuevo",
        element: <CrearMascotaPage />,
      },
      {
        path: "mascotas/perdidos/editar/:idMascota",
        element: <EditarMascotaPage categoria="Perdido" />,
      },
      {
        path: "mascotas/encontrados/editar/:idMascota",
        element: <EditarMascotaPage categoria="Encontrado" />,
      },
      {
        path: "mascotas/encontrados/eliminar/:idMascota",
        element: <EliminarMascotaPage categoria="Encontrado" />,
      },
      {
        path: "mascotas/perdidos/eliminar/:idMascota",
        element: <EliminarMascotaPage categoria="Perdido" />,
      },
      //  {
      //   path: "mascotas/nuevo",
      //   element: <CreadoConExito />,
      // },
      /*{
        path: 'mascotas/crear',
        element: <CrearMascota />
      },*/
    ],
  },
]);

// JSX
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
