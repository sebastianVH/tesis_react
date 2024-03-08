import { Outlet, Link, useHistory } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react"; // Importa useState
import { AuthContext } from "./pages/user/AuthContext";

import "minireset.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import appLogo from "./assets/img/logo_horizontal.png";

import "./App.css";

export function App() {
  const { token } = useContext(AuthContext);
  const navbarRef = useRef(null); // Referencia al navbar
  const history = useHistory(); // Importa useHistory para cambiar de ruta
  const [isCollapsed, setIsCollapsed] = useState(true); // Estado para controlar si el navbar está colapsado

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsCollapsed(true); // Colapsa el navbar al hacer clic fuera de él
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavLinkClick = () => {
    setIsCollapsed(true); // Colapsa el navbar al hacer clic en un enlace del menú
  };

  return (
    <div className="App">
      <header id="header" className="fixed-top mb-5">
        <nav className="navbar navbar-expand-lg py-0 px-md-4" ref={navbarRef}>
          <div className="container-fluid">
            <Link to="/">
              {" "}
              <div className="logo mx-auto mx-lg-1 mr-lg-auto">
                <img
                  src={appLogo}
                  alt="Logo Huellas a casa"
                  className="img-fluid"
                  id="logo-header"
                />{" "}
              </div>{" "}
              <h1 className="d-none">Huellas a Casa</h1>
            </Link>
            <button
              className="navbar-toggler navbar-dark"
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)} // Alternar el estado de isCollapsed al hacer clic en el botón del navbar
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`collapse navbar-collapse nav-menu ${
                isCollapsed ? "" : "show"
              }`}
              id="navbarNav"
            >
              <ul className="navbar-nav justify-content-center me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" onClick={handleNavLinkClick}>
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <li>
                    <Link to="/mascotas/perdidos" onClick={handleNavLinkClick}>
                      Perdidos
                    </Link>
                  </li>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link to="/mascotas/encontrados" onClick={handleNavLinkClick}>
                    Encontrados
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav justify-content-center ml-auto mb-2 mb-lg-0">
                {token ? (
                  <>
                    <li className="nav-item">
                      {" "}
                      <Link to="/profile">Cuenta</Link>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link to="/logout">Cerrar sesión</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      {" "}
                      <Link to="/register">Registrate</Link>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link to="/login">Iniciar sesión</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <Outlet />

      {/* <script
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"
        integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS"
        crossOrigin="anonymous"
      ></script> */}
      <footer className="footer text-white mt-5 p-lg-4">
        <div className="container pt-4 pt-md-2">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <div className="mr-3">
                Copyright© {new Date().getFullYear()} HUELLAS A CASA
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <p className="mb-0 text-white">
                <i class="bi bi-envelope-fill px-1"></i> huellasacasa@gmail.com
              </p>
              <p className="mb-0 text-white">
                <i class="bi bi-telephone-fill px-1"></i> +54 9 11 3865 4651
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
