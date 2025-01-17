/* eslint-disable react/prop-types */
import "./tableros.css";
import { deleteTablero } from "../api/trello";
import toast from "react-hot-toast";

export function Tableros({ proyect, setTablero_active, getTebleros }) {
  const handleDelete = async (id) => {
    toast.promise(
      (async () => {
        await deleteTablero(id);
        getTebleros();
      })(),
      {
        loading: "Cargando...",
        success: <b>Tablero Eliminado!</b>,
        error: <b>Could not save.</b>,
      },
      {
        style: {
          backgroundColor: "#1E1E2E",
          color: "white",
          duration: 4000,
        },
      }
    );
  };

  return (
    <div className="board-list-container">
      <h2 className="board-list-title">Mis Tableros</h2>
      <ul className="board-list">
        {proyect.map((proyects) => {
          return (
            <li className="board-item" key={proyects.id}>
              <span className="board-name">{proyects.nombre}</span>
              <section className="section-btn">
                <button
                  className="board-button-delete"
                  onClick={() => {
                    handleDelete(proyects.id);
                  }}
                >
                  Eliminar
                </button>
                <button
                  className="board-button"
                  onClick={() => {
                    setTablero_active(proyects);
                  }}
                >
                  Abrir
                </button>
              </section>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
