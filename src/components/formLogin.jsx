import "./formLogin.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { getUser } from "../api/trello";
import { useNavigate } from "react-router-dom";
function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    async function handleSubmit(data) {
      toast.promise(
        (async () => {
          const users = await getUser();
          const exist = users.data.find(
            (u) => u.nombre === data.nombre && u.password === data.password
          );
          if (exist) {
            setTimeout(() => {
              navigate("/trello", { state: { user: exist } });
            });

            return "Sesión encontrada";
          } else {
            throw new Error("Error credenciales erróneas ");
          }
        })(),
        {
          loading: "Iniciando Sesión...",
          success: <b>👋¡Hola de nuevo {data.nombre}! </b>,

          error: (err) => <b>{err.message}</b>,
        },
        {
          style: {
            backgroundColor: "#087DC1",
            color: "white",
            duration: 4500,
          },
        }
      );
    }
    if (data) {
      handleSubmit(data);
    }
  };

  return (
    <div className="form-container">
      <Toaster></Toaster>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <header className="head">
          <img className="imgs" src="public/assets/trello_Icon.png" alt="" />
          <h1 className="title-login">Trello </h1>
        </header>

        <input
          type="text"
          placeholder="Usuario"
          className="input-field"
          {...register("nombre", { required: true })}
        />

        <input
          type={showPassword ? "text" : "password"} // Aquí alternamos entre text y password
          placeholder="Contraseña"
          className="input-field"
          {...register("password", { required: true })}
        />

        <button type="submit" className="submit-button">
          Ingresar
        </button>

        <div className="redirect-container">
          <Link to="/register">
            <button className="redirect-button">Crear cuenta</button>
          </Link>
        </div>
      </form>
      <div className="img-s">
        <img
          className="trello-left"
          src="public/assets/trelloleft.svg"
          alt=""
        />
        <img
          className="trello-left"
          src="public/assets/trello-right.svg"
          alt=""
        />
      </div>
    </div>
  );
}

export default FormLogin;
