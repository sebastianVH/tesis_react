import { Outlet, Link } from "react-router-dom";

import "minireset.css";
import "bootstrap/dist/css/bootstrap.css";

import appLogo from "./assets/img/logo_horizontal.png";

import "./App.css";
export function App() {
  return (
    <div className="App">
      <header id="header" className="fixed-top mb-5">
        <div className="container-fluid px-lg-10 px-md-9 d-flex align-items-center">
          <div className="row d-flex justify-content-between align-items-center">
            <div className="col-3 d-md-none">
              <div id="back-btn">
                {/* <div id="back-btn" data-section="inicio"> */}
                <i className="bx bx-left-arrow-alt"></i>
              </div>
            </div>

            <h1 className="d-none">Huellas a Casa</h1>

            <div className="col-6 col-md-3 nop text-center text-md-left x-2">
              <Link to="/">
                {" "}
                <div className="logo mx-auto mx-lg-1 mr-lg-auto">
                  <img
                    src={appLogo}
                    alt="Logo Hoggo"
                    className="img-fluid"
                    id="logo-header"
                  />{" "}
                </div>{" "}
              </Link>
            </div>

            <div className="col-3 d-md-none text-left">
              <nav className="nav-menu mx-1">
                <ul className="list-unstyled components justify-content-end">
                  <li className="pt-3 px-2">
                    {/* Login */}
                    <div>
                      <i className="icofont-ui-user size-icons naranja"></i>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="d-none d-md-block col-md-6 text-center">
              <nav className="nav-menu">
                <ul className="list-unstyled components justify-content-center">
                  <li>
                    <Link to="/">Inicio</Link>
                  </li>
                  {/* <li><Link to="/mascotas">Perdidos</Link></li>
                <li><Link to="/mascotas">Encontrados</Link></li> */}
                  <li>
                    <Link to="/mascotas/perdidos">Perdidos</Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/mascotas/encontrados">Encontrados</Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/login">Iniciar sesión</Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/profile">Cuenta</Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/account">Registrate</Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="d-none d-md-block col-md-3">
              <nav className="nav-menu d-none d-md-block mx-2">
                <ul className="list-unstyled components justify-content-end">
                  <li>
                    <div data-section="login">
                      <i className="icofont-ui-user icofont-1x"></i>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
