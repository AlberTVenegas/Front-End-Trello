/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { addTask } from "../api/trello";
import {toast} from "react-hot-toast";
function ModalRegis({ closeModal, getTask, proyect }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      status: "Por hacer",
    },
  });
  const notify = () =>
    toast.success("Registro Exitoso!", {
      style: {
        backgroundColor: "#1E1E2E",
        color: "white",
      },
    });

  const onSubmit = (data) => {
    async function handleSubmit(data) {
      await addTask(data);
      getTask();
      closeModal(false);
    }
    handleSubmit(data);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#2A2A40] w-full max-w-md rounded-lg shadow-lg p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-[#3E3E4E] pb-2">
          <h2 className="text-xl font-bold text-white">Registrar Tarea</h2>
          <button
            className="text-gray-400 hover:text-red-500"
            aria-label="Cerrar modal"
            onClick={() => {
              closeModal(false);
            }}
          >
            ✖
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="task-title"
              className="block text-sm font-medium text-white mb-1"
            ></label>
            <input
              type="text"
              {...register("title", {
                required: true,
              })}
              className="w-full px-4 py-2 rounded-md bg-[#1E1E2E] text-white border border-[#3E3E4E] focus:ring-2 focus:ring-[#736CED] focus:outline-none"
              placeholder="Escribe el título de la tarea"
            />
          </div>

          <div>
            <label
              htmlFor="task-desc"
              className="block text-sm font-medium text-white mb-1"
            >
              Descripción
            </label>
            <textarea
              id="task-desc"
              {...register("description", {
                required: true,
              })}
              rows="4"
              className="w-full px-4 py-2 rounded-md bg-[#1E1E2E] text-white border border-[#3E3E4E] focus:ring-2 focus:ring-[#736CED] focus:outline-none"
              placeholder="Describe brevemente la tarea"
            ></textarea>
          </div>

          {/* Prioridad */}
          <div>
            <label
              htmlFor="task-priority"
              className="block text-sm font-medium text-white mb-1"
            >
              Prioridad
            </label>
            <select
              id="task-priority"
              {...register("priority", {
                required: true,
              })}
              className="w-full px-4 py-2 rounded-md bg-[#1E1E2E] text-white border border-[#3E3E4E] focus:ring-2 focus:ring-[#736CED] focus:outline-none"
            >
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="task-priority"
              className="block text-sm font-medium text-white mb-1"
            >
              Tablero
            </label>
            <select
              id="task-priority"
              {...register("tablero", {
                required: true,
              })}
              className="w-full px-4 py-2 rounded-md bg-[#1E1E2E] text-white border border-[#3E3E4E] focus:ring-2 focus:ring-[#736CED] focus:outline-none"
            >
              <option value=" ">Selecione El Tablero</option>
              {proyect.map((proyect) => {
                return (
                  <option key={proyect.id} value={proyect.id}>
                    {proyect.nombre}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex justify-end space-x-4 pt-4 border-t border-[#3E3E4E]">
            <button
              className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-500"
              type="button"
              onClick={() => {
                closeModal(false);
              }}
            >
              Cancelar
            </button>
            <input
              className="px-4 py-2 rounded-md bg-[#51B13F] text-white hover:bg-[#3DDC97]"
              type="submit"
              value="Guardar"
              onClick={notify}
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalRegis;
