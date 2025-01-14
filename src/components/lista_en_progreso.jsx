import "./lista_en_progreso.css";
import { getallTasks, updateStateTask } from "../api/trello";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import BtnRegis from "./btnRegis";
import React from "react";
import Columns from "./columns";
import { Tableros } from "./tableros";
import { getAllProyect } from "../api/trello";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  
} from "@dnd-kit/core";



function Lista_en_progreso() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // El usuario debe mover 8px antes de iniciar el arrastre
      },
    })
  );
  const [res, setRes] = useState([]);
  const [proyect, setProyect] = useState([]);
  const [tablero_active, setTablero_active] = useState();
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
      id: "Terminado",
      name: "Terminado",
    },
  ];
  async function getTebleros() {
    const tableros = await getAllProyect();
    setProyect(tableros.data);
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

  async function handleUpdateSatet(newStatus, id) {
    await updateStateTask(id, newStatus);
  }

  return (
    <>
      <Toaster />
      <div className="box-content">
        <div className="title-btn">
          <h1 className="txt-title">Organiza tu Trabajo</h1>

          <div className="serparator-title"></div>

          <BtnRegis
            getTask={getTask}
            getTebleros={getTebleros}
            proyect={proyect}
          ></BtnRegis>
          <div className="Tableros">
            <Tableros
              proyect={proyect}
              getTebleros={getTebleros}
              setTablero_active={setTablero_active}
            />
          </div>
        </div>
        <section className="box-columns">
          <DndContext
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            {columns.map((col) => {
              return (
                <Columns
                  columns={col}
                  allres={res}
                  res={resfilter}
                  key={col.id}
                  getTask={getTask}
                  tablero_active={tablero_active}
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
