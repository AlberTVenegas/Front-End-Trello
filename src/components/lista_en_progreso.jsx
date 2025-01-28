import "./lista_en_progreso.css";
import { getallTasks, updateStateTask } from "../api/trello";
import { useEffect, useState } from "react";
import BtnRegis from "./btnRegis";
import React from "react";
import Columns from "./columns";
import { getAllProyect } from "../api/trello";
import DropDownTableros from "./dropDownTableros";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";

import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { useLocation } from "react-router-dom";

function Lista_en_progreso() {
  const location = useLocation();
  const user = location.state.user;
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // El usuario debe mover 8px antes de iniciar el arrastre
      },
    })
  );
  const [res, setRes] = useState([]);
  const [proyect, setProyect] = useState([]);
  const [tablero_active, setTablero_active] = useState({
    nombre: " ",
  });
  const [resfilter, setResFiltes] = useState([]);

  const columns = [
    {
      id: "Por hacer",
      name: "Por hacer",
    },
    {
      id: "En progreso",
      name: "En progreso",
    },
    {
      id: "En revision",
      name: "En revision",
    },
    {
      id: "Terminado",
      name: "Terminado",
    },
  ];
  async function getTebleros() {
    const tableros = await getAllProyect();
    const result = tableros.data.filter((tablero) => tablero.user === user.id);
    setProyect(result);
  }

  async function getTask() {
    const Res = await getallTasks();
    setRes(Res.data); // Establecer todas las tareas en el estado 'res'
  }

  const getTaskByTablero = (tablero_active) => {
    // Filtra las tareas por tablero
    return res.filter((task) => task.tablero === tablero_active.id);
  };

  useEffect(() => {
    getTask();
    getTebleros();
  }, []);

  useEffect(() => {
    if (proyect.length > 0) {
      setTablero_active(proyect[0]);
    }
  }, [proyect]);

  useEffect(() => {
    if (tablero_active) {
      const filteredTasks = getTaskByTablero(tablero_active);
      setResFiltes(filteredTasks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablero_active, res]);

  const handleDragEnd = (evento) => {
    const { active, over } = evento;
    if (!over) return;
    const newStatus = over.id;
    const taskID = active.id;

    setRes(
      res.map((task) =>
        task.id === taskID
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
    handleUpdateSatet(newStatus, taskID);
  };
  const [CloseSesion, setCloseSesion] = useState(false);

  async function handleUpdateSatet(newStatus, id) {
    await updateStateTask(id, newStatus);
  }

  return (
    <>
      <div className="box-content">
        <nav className="nav-d">
          <img
            src="src/assets/trelloIcon.png"
            alt="img not fund"
            className="icon_trello"
          />
          <h1 className="txt-title">Trello</h1>

          <section className="btn">
            <BtnRegis
              getTask={getTask}
              getTebleros={getTebleros}
              proyect={proyect}
              user={user}
            ></BtnRegis>
            <DropDownTableros
              proyect={proyect}
              getTebleros={getTebleros}
              setTablero_active={setTablero_active}
            />
            <h3 className="txt-active">{tablero_active.nombre}</h3>
            <div className="close">
              <button
                onClick={() => {
                  setCloseSesion(true);
                }}
                className="button-exit"
              >
                <LoginIcon color="white" />
                Cerrar Sesión
              </button>
            </div>
          </section>
        </nav>

        {CloseSesion && (
          <div className="modal-close fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#6994B9] p-6 rounded-xl shadow-lg text-white w-80 text-center">
              <h2 className="text-xl font-bold">¿Estás seguro?</h2>
              <p className="text-gray-300 mt-2">
                Tu sesión se cerrará y deberás iniciar sesión nuevamente.
              </p>

              {/* Botones */}
              <div className="mt-4 flex justify-around">
                <button
                  className="px-4 py-2 bg-[#6C757D] rounded-lg hover:bg-[#5A636A] transition"
                  onClick={() => {
                    setCloseSesion(false);
                  }}
                >
                  Cancelar
                </button>
                <Link to="/">
                  <button
                    className="px-4 py-2 bg-[#087CBF] rounded-lg hover:bg-[#34adf3] transition"
                    onClick={() => {
                      setCloseSesion(false);
                    }}
                  >
                    Cerrar Sesión
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        <section className="box-columns">
          <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            {columns.map((col) => {
              return (
                <Columns
                  columns={col}
                  allres={res}
                  res={resfilter}
                  key={col.id}
                  getTask={getTask}
                ></Columns>
              );
            })}
          </DndContext>
        </section>
      </div>
    </>
  );
}

export default React.memo(Lista_en_progreso);
