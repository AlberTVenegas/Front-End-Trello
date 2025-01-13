/* eslint-disable react/prop-types */

import { useDroppable } from "@dnd-kit/core";
import Lista from "./lista";
import React from "react";
function Columns({ columns, res, getTask }) {
  const { setNodeRef } = useDroppable({
    id: columns.id,
  });

  const getTasksByEstado = (estado) =>
    res.filter((task) => task.status === estado);

  const setColorsColumns = (title) => {
    let content;
    switch (title) {
      case "Por hacer":
        content = "colors-Por-hacer";
        break;
      case "Terminado":
        content = "colors-Terminado";
        break;
      case "En progreso":
        content = "colors-En-Progreso";
        break;
    }
    return <div className={content}></div>;
  };

  return (
    <div className="list-container" key={columns.id}>
      <div className="list-header">
        {setColorsColumns(columns.name)}
        <h2 className="title">{columns.name}</h2>
        <div className="separator"></div>
      </div>

      <div className="dd-zone" ref={setNodeRef}>
        {getTasksByEstado(columns.name).map((task) => {
          return (
            <div key={task.id} className="dd-element">
              <Lista
                task={task}
                columns={columns.name}
                getTask={getTask}
              ></Lista>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(Columns);
