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
          backgroundColor: "#087DC1",
          color: "white",
          duration: 4000,
        },
      }
    );
  };

  return (
    <div className="bg-[#F1F2F4] rounded-lg p-3 shadow-md">
      <ul className="space-y-2">
        {proyect.map((proyects) => (
          <li
            key={proyects.id}
            onClick={() => setTablero_active(proyects)}
            className="flex justify-between items-center p-2 rounded-md bg-[#087ABC] text-white font-semibold transition-colors duration-300 hover:bg-[#255C8E] cursor-pointer"
          >
            <span>{proyects.nombre}</span>
            <button
              onClick={() => handleDelete(proyects.id)}
              className="bg-[#F1F2F4] text-[#087ABC] font-bold px-2 py-1 rounded-md text-sm transition-all duration-300 hover:bg-[#255C8E] hover:text-white"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
