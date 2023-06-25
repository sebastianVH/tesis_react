import { useCallback, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/auth.service";
import { AuthContext } from "../AuthContext";
import { UserContext } from "../UserContext";

function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setToken } = useContext(AuthContext);
  const { setUserData } = useContext(UserContext);

  const onChangeUserName = useCallback(
    (event) => {
      setUserName(event.target.value);
    },
    [setUserName]
  );

  const onChangePassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      return authService
        .login({ userName, password })
        .then((data) => {
          setError("");
          localStorage.setItem("token", data.token);
          setToken(data.token);
          fetch(`http://localhost:2023/api/profile`, {
            headers: { "auth-token": data.token },
          })
            .then((response) => response.json())
            .then((data) => setUserData(data));
          navigate("/mascotas/perdidos", { replace: true });
        })
        .catch((err) => {
          console.log(err);
          setError(err.error.message);
        });
    },
    [setError, userName, password, setToken, navigate, setUserData]
  );

  return (
    <div className="container login-page">
      <form className="form-login" onSubmit={onSubmit}>
        <h1 className="form-login__title">Inicio de sesión</h1>
        <label className="col-12 form-login__field">
          Nombre de usuario:
          <input
            className="form-login__username"
            type="text"
            onChange={onChangeUserName}
            value={userName}
          />
        </label>
        <label className="col-12 form-login__field">
          Contraseña:
          <input
            className="form-login__password"
            type="password"
            onChange={onChangePassword}
            value={password}
          />
        </label>
        <p>{error}</p>
        <button className="form-login__submit btn btn-color" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
