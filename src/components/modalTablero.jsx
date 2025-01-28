/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { addTablero } from "../api/trello";
import { toast } from "react-hot-toast";

function ModalTablero({ getTebleros, closeModalProyect, user }) {
  console.log(user.id);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      is_active: true,
      user: user.id,
    },
  });

  const onSubmit = (data) => {
    async function handleSubmit(data) {
      toast.promise(
        (async () => {
          await addTablero(data);
          getTebleros();
          closeModalProyect(false);
        })(),
        {
          loading: "Cargando...",
          success: <b>Tablero Registrado!</b>,
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
    }
    handleSubmit(data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#F1F2F4] w-full max-w-md rounded-lg shadow-lg p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-[#3E3E4E] pb-2">
          <h2 className="text-xl font-bold text-[#087DCB]">
            Registrar Tablero
          </h2>
          <button
            className="text-gray-400 hover:text-red-500"
            aria-label="Cerrar modal"
            onClick={() => {
              closeModalProyect(false);
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
              {...register("nombre", {
                required: true,
              })}
              className="w-full px-4 py-2 rounded-md bg-[#FFFFFF] text-[#087DCB] border border-[#3E3E4E] focus:ring-2 focus:ring-[#736CED] focus:outline-none"
              placeholder="Escribe el título del Tablero"
            />
          </div>

          {/* Prioridad */}

          <div className="flex justify-end space-x-4 pt-4 border-t border-[#3E3E4E]">
            <button
              className="px-4 py-2 rounded-md bg-[#087DC1] text-white hover:bg-gray-500"
              type="button"
              onClick={() => {
                closeModalProyect(false);
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

        {/* Modal footer */}
      </div>
    </div>
  );
}

export default ModalTablero;
