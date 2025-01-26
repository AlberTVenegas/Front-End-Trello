/* eslint-disable react/prop-types */
import { useState } from "react";
import "./btnRegis.css";
import ModalRegis from "./modalRegis";
import ModalTablero from "./modalTablero";
import { Link } from "react-router-dom";

function BtnRegis({ getTask, getTebleros, proyect, user }) {
  const [modal, setModal] = useState(false);
  const [modalProyect, setModalProyect] = useState(false);
  const [, setResult] = useState(false);
  const [CloseSesion, setCloseSesion] = useState(false);

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

      <button
        onClick={() => {
          setCloseSesion(true);
        }}
        className="h-10 w-72 cursor-pointer bg-gray-700 text-white font-semibold rounded-md px-5 py-2 transition duration-300 ease-in-out 
        hover:bg-violet-700 hover:ring-2 hover:ring-violet-800 hover:shadow-xl hover:shadow-violet-500 
        focus:outline-none focus:ring-2 focus:ring-violet-400 
        active:bg-violet-800 active:translate-y-1"
      >
        Cerrar Sesión
      </button>
      {CloseSesion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#282838] p-6 rounded-xl shadow-lg text-white w-80 text-center">
            <h2 className="text-xl font-bold">¿Estás seguro?</h2>
            <p className="text-gray-300 mt-2">
              Tu sesión se cerrará y deberás iniciar sesión nuevamente.
            </p>

            {/* Botones */}
            <div className="mt-4 flex justify-around">
              <button
                className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition"
                onClick={() => {
                  setCloseSesion(false);
                }}
              >
                Cancelar
              </button>
              <Link to="/">
                <button
                  className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
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
