/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { addTask } from "../api/trello";
import { toast } from "react-hot-toast";
function ModalRegis({ closeModal, getTask, proyect }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      status: "Por hacer",
    },
  });

  const onSubmit = (data) => {
    async function handleSubmit(data) {
      toast.promise(
        (async () => {
          await addTask(data);
          getTask();
          closeModal(false);
        })(),
        {
          loading: "Registrando Tarea...",
          success: <b>Tarea Registrada!!</b>,
          error: <b>Error al registrar.</b>,
        },
        {
          style: {
            backgroundColor: "#087DC1",
            color: "white",
            duration: 4000,
          },
        }
      );
    }
    handleSubmit(data);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#F1F2F4] w-full max-w-md rounded-lg shadow-lg p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-[#3E3E4E] pb-2">
          <h2 className="text-xl font-bold text-[#087DC1]">Registrar Tarea</h2>
          <button
            className="text-gray-600 hover:text-[#FF9800]"
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
              className="block text-sm font-medium text-[#087DC1] mb-1"
            >
              Título de la Tarea
            </label>
            <input
              type="text"
              {...register("title", {
                required: true,
              })}
              className="w-full px-4 py-2 rounded-md bg-white text-[#087DC1] border border-[#6994B9] focus:ring-2 focus:ring-[#736CED] focus:outline-none"
              placeholder="Escribe el título de la tarea"
            />
          </div>

          <div>
            <label
              htmlFor="task-desc"
              className="block text-sm font-medium text-[#087DC1] mb-1"
            >
              Descripción
            </label>
            <textarea
              id="task-desc"
              {...register("description", {
                required: true,
              })}
              rows="4"
              className="w-full px-4 py-2 rounded-md bg-white text-[#087DC1] border border-[#6994B9] focus:ring-2 focus:ring-[#736CED] focus:outline-none"
              placeholder="Describe brevemente la tarea"
            ></textarea>
          </div>

          {/* Prioridad */}
          <div>
            <label
              htmlFor="task-priority"
              className="block text-sm font-medium text-[#087DC1] mb-1"
            >
              Prioridad
            </label>
            <select
              id="task-priority"
              {...register("priority", {
                required: true,
              })}
              className="w-full px-4 py-2 rounded-md bg-white text-[#087DC1] border border-[#6994B9] focus:ring-2 focus:ring-[#736CED] focus:outline-none"
            >
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="task-priority"
              className="block text-sm font-medium text-[#087DC1] mb-1"
            >
              Tablero
            </label>
            <select
              id="task-priority"
              {...register("tablero", {
                required: true,
              })}
              className="w-full px-4 py-2 rounded-md bg-white text-[#087DC1] border border-[#6994B9] focus:ring-2 focus:ring-[#736CED] focus:outline-none"
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

          <div className="flex justify-end space-x-4 pt-4 border-t border-[#6994B9]">
            <button
              className="px-4 py-2 rounded-md bg-[#6994B9] text-white  hover:bg-gray-500"
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
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalRegis;
