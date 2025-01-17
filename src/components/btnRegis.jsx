/* eslint-disable react/prop-types */
import { useState } from "react";
import "./btnRegis.css";
import ModalRegis from "./modalRegis";
import ModalTablero from "./modalTablero";


function BtnRegis({ getTask, getTebleros, proyect }) {
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
          setModal(true);
        }}
        className="h-10 w-72 cursor-pointer bg-gray-700 text-white font-semibold rounded-md px-5 py-2 transition duration-300 ease-in-out 
        hover:bg-violet-700 hover:ring-2 hover:ring-violet-800 hover:shadow-xl hover:shadow-violet-500 
        focus:outline-none focus:ring-2 focus:ring-violet-400 
        active:bg-violet-800 active:translate-y-1"
      >
        Registrar Tarea
      </button>
      {modal && (
        <ModalRegis
          getTask={getTask}
          proyect={proyect}
          closeModal={setModal}
          resultado={resultado}
        />
      )}
      <button
        onClick={() => {
          setModalProyect(true);
        }}
        className="h-10 w-72 cursor-pointer bg-gray-700 text-white font-semibold rounded-md px-5 py-2 transition duration-300 ease-in-out 
        hover:bg-violet-700 hover:ring-2 hover:ring-violet-800 hover:shadow-xl hover:shadow-violet-500 
        focus:outline-none focus:ring-2 focus:ring-violet-400 
        active:bg-violet-800 active:translate-y-1"
      >
        Registrar Tablero
      </button>
      {modalProyect && (
        <ModalTablero
          getTebleros={getTebleros}
          closeModalProyect={setModalProyect}
        />
      )}
    </>
  );
}

export default BtnRegis;
