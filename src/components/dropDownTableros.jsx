import DashboardIcon from "@mui/icons-material/Dashboard";
import "./dropDownTableros.css";
import { Tableros } from "./tableros";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

function DropDownTableros({ proyect, getTebleros, setTablero_active }) {
  return (
    <>
      <div className="box-drop text-right">
        <Menu>
          <MenuButton className="btn-drop inline-flex items-center gap-2 bg-[#255C8E]   font-semibold text-white shadow-inner   data-[hover]:bg-[#059cf369]  data-[focus]:outline-1">
            <DashboardIcon color="white" />
            Tableros
            <ChevronDownIcon className="size-4 fill-white/60" />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="w-72 origin-top-right rounded-xl border  bg-[#FFFFFF] p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <MenuItem>
              <Tableros
                proyect={proyect}
                getTebleros={getTebleros}
                setTablero_active={setTablero_active}
              ></Tableros>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </>
  );
}

export default DropDownTableros;
