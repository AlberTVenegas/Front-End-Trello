/* eslint-disable react/prop-types */
import { useState } from "react";
import "./btnRegis.css";
import ModalRegis from "./modalRegis";
import ModalTablero from "./modalTablero";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

function BtnRegis({ getTask, getTebleros, proyect, user }) {
  const [modal, setModal] = useState(false);
  const [modalProyect, setModalProyect] = useState(false);
  const [, setResult] = useState(false);

  const resultado = (res) => {
    setResult(res);
  };

  return (
    <>
      <button
        onClick={() => {
          setModalProyect(true);
        }}
        className="button"
      >
        <DashboardCustomizeIcon color="white" />
        Agregar Tablero
      </button>
      <button
        onClick={() => {
          setModal(true);
        }}
        className="button"
      >
        <AddTaskIcon color="white" />
        Agregar Tarea
      </button>
      {modal && (
        <ModalRegis
          getTask={getTask}
          proyect={proyect}
          closeModal={setModal}
          resultado={resultado}
        />
      )}

      {modalProyect && (
        <ModalTablero
          getTebleros={getTebleros}
          closeModalProyect={setModalProyect}
          user={user}
        />
      )}
    </>
  );
}

export default BtnRegis;
