/* eslint-disable react/prop-types */

import React, { useState } from "react";
import "./lista_en_progreso.css";
import { useDraggable } from "@dnd-kit/core";
import { deleteTask } from "../api/trello";
import toast, { Toaster } from "react-hot-toast";

function Lista({ task, getTask }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const [result_delete, setResult_delete] = useState(false);
  const notify_delete = () =>
    toast.success("Tarea Eliminada con exito", {
      style: {
        backgroundColor: "#1E1E2E",
        color: "white",
      },
    });
  const handleClick = (id) => {
    async function handleDelete(id) {
      await deleteTask(id);
      await getTask();
      notify_delete();
      setResult_delete(false);

      // Esto activará el efecto
    }
    handleDelete(id);
  };

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const setColorStatus = (status) => {
    let content;
    switch (status) {
      case "Por hacer":
        content = "color-red";
        break;
      case "Terminado":
        content = "color-gren";
        break;
      case "En progreso":
        content = "color-yellow";
        break;
    }
    return <div className={content} />;
  };

  const setColorPriority = (priority) => {
    let content;
    let card;
    switch (priority) {
      case "Alta":
        content = "priority-alta";
        card = "card-etiqueta-alta";

        break;
      case "Media":
        content = "priority-media";
        card = "card-etiqueta-media";
        break;
      case "BAJA":
        content = "priority-baja";
        card = "card-etiqueta-baja";
        break;
    }
    return (
      <section className={card}>
        <p className={content}>
          {" "}
          <strong>Prioridad:</strong> {priority}
        </p>
      </section>
    );
  };

  return (
    <>
      {result_delete && <Toaster />}
      <div
        className="list"
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <div className="card">
          {setColorStatus(task.status)}
          <div className="padin">
            <div className="card-header">
              <h3 className="task-title">{task.title}</h3>
              <section className="acciones">
                <button
                  onClick={() => {
                    handleClick(task.id);
                  }}
                >
                  <svg
                    className="btn-delete h-8 w-8"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </button>
              </section>
            </div>
            <div className="card-body">
              <div className="description">
                <h3>{task.description}</h3>
              </div>
              {setColorPriority(task.priority)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Lista);
