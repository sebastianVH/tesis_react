import { useCallback, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/auth.service";
import { AuthContext } from "./AuthContext";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";

// import { BiEye, BiEyeOff } from "react-icons/bi";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { setToken } = useContext(AuthContext);
  const { setUserData } = useContext(UserContext);

  const onChangeField = useCallback((event, setValue) => {
    setValue(event.target.value);
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      return authService
        .login({ userName, password })
        .then((data) => {
          setError("");
          localStorage.setItem("token", data.token);
          setToken(data.token);
          fetch(`https://tesis-react-backend.vercel.app/api/profile`, {
            headers: { "auth-token": data.token },
          })
            .then((response) => response.json())
            .then((data) => setUserData(data));
          navigate("/profile", { replace: true });
        })
        .catch((err) => {
          console.log(err);
          setError("Los datos ingresados no son correctos"); // set error message on failed login
        });
    },
    [navigate, setError, userName, password, setToken, setUserData]
  );

  return (
    <div className="container-fluid login-page">
      <div className="row justify-content-center justify-content-lg-between align-items-center h-100">
        <div className="col-12 col-md-10 col-lg-6 col-xl-6 caja-login px-lg-5 py-4 py-md-5 py-lg-2">
          <div className="col-12 titulo-seccion text-center pb-0">
            <h2>Iniciá sesión con tu cuenta</h2>
          </div>
          <form className="form-login" onSubmit={onSubmit}>
            <label className="col-12 form-login__field">
              Nombre de usuario
            </label>
            <input
              className="form-login__username w-100"
              type="text"
              onChange={(event) => onChangeField(event, setUserName)}
              value={userName}
            />

            <label className="col-12 form-login__field">Contraseña</label>
            <div className="password-wrapper" style={{ position: "relative" }}>
              <input
                className="form-login__password w-100 "
                style={{ paddingRight: "30px" }} // make room for the icon
                type={showPassword ? "text" : "password"}
                onChange={(event) => onChangeField(event, setPassword)}
                value={password}
              />
              <i
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-icon"
              >
                {showPassword ? <EyeSlashFill /> : <EyeFill />}
              </i>
            </div>
            {/* Show error message below password input */}
            {error && <p className="error-message">{error}</p>}
            {/* <p>{error}</p> */}
            <p className="todavia">
              ¿Todavía no tenés cuenta?{" "}
              <Link className="registrate" to="/register">
                Registrate
              </Link>
            </p>

            <button
              className="form-login__submit btn btn-naranja w-100"
              type="submit"
            >
              Entrar
            </button>
          </form>
        </div>

        {/* //quiero que este div tenga una imagen de fondo */}
        <div className="col-6 d-none d-lg-block login-img text-right pr-0">
          {/* <img src={loginImg} alt="Login page img" className="img-fluid" /> */}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
