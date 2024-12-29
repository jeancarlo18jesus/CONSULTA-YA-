
import {
    SettingsIcon,
    HelpCircle,
    LogOut,

  } from "lucide-react";
  import { EstudianteObjectoType, TrbajadorObjectoType, menus_items } from "@/seed";
  import Link from "next/link";
  import { getLogout } from '@/app/lib/definitions';
  
  
  
  export const AboutDeskotTrabajador = ({
    usuario: usuario,
    menus_items,
  }: {
    usuario: EstudianteObjectoType | TrbajadorObjectoType,
    menus_items: menus_items;
  }) => {
    return (
      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity- z-50">
        <div className="py-1 px-4 border-b border-gray-700">
          <p className="text-sm font-medium">{usuario.nombre}</p>
          <p className="text-xs text-gray-400">{usuario.correo}</p>
        </div>
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <Link
            href={menus_items.href_1}
            className="block px-4 py-2 text-sm text-gray-300 hover:text-[#f31260] hover:bg-gray-700 "
            role="menuitem"
          >
            <SettingsIcon className="inline w-4 h-4 mr-2" />
            {menus_items.menu_1}
          </Link>
          <Link
            href={menus_items.href_2}
            className="block px-4 py-2 text-sm text-gray-300 hover:text-[#f31260] hover:bg-gray-700"
            role="preguntas"
          >
            <HelpCircle className="inline w-4 h-4 mr-2" />
            {menus_items.menu_2}
          </Link>
          <button
            onClick={getLogout}
            className=" px-4 py-2 text-sm text-gray-300 hover:text-[#f31260] hover:bg-gray-700 w-full justify-start flex items-center"
            role="cerrar"
          >
            <LogOut className="inline w-4 h-4 mr-2" />
            {menus_items.menu_5}
          </button>
        </div>
      </div>
    );
  };
  