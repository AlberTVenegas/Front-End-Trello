import "./formRegis.css";
import { addUser } from "../api/trello";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

function FormRegis() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    async function handleSubmit(data) {
      toast.promise(
        (async () => {
          await addUser(data);
        })(),
        {
          loading: "Registrando Usuario...",
          success: <b>Usuario Registrado!!</b>,
          error: <b>Error al registrar</b>,
        },
        {
          style: {
            backgroundColor: "#1E1E2E",
            color: "white",
            duration: 4000,
          },
        }
      );
    }
    handleSubmit(data);
  };

  return (
    <div className="form-container">
      <Toaster></Toaster>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <header>
          <h2 className="title_regis">Registrar cuenta</h2>
        </header>

        <input
          type="text"
          placeholder="Usuario"
          className="input-field"
          {...register("nombre", { required: true })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", {
            required: true,
          })}
          className="input-field"
        />
        <button type="submit" className="submit-button">
          Guardar cuenta
        </button>
        <div className="redirect-container">
          <Link to="/">
            <button className="redirect-button">Volver</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default FormRegis;
