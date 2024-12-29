

import {  User } from 'lucide-react'
import Link from 'next/link'
import {EstudianteObjectoType , TrbajadorObjectoType,items_menu,menus_items} from '@/seed'
import { getLogout } from '@/app/lib/definitions';


export const AboutMovil = ({
  usuario,
  menus_items,
  items_1, items_2, items_3
}: {
  usuario: EstudianteObjectoType | TrbajadorObjectoType,
  menus_items: menus_items,
  items_1:items_menu, items_2:items_menu, items_3:items_menu
}) =>{

    return (
        <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href={items_1.href} className="text-pink-500 block px-3 py-2 rounded-md text-base font-medium">{items_1.title}</Link>
                <Link href={items_2.href} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{items_2.title}</Link>
                <Link href={items_3.href} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{items_3.title}</Link>
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <User className="h-10 w-10 rounded-full" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">{usuario.nombre}</div>
                    <div className="text-sm font-medium leading-none text-gray-400"> {usuario.correo} </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Link href={menus_items.href_1} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300  hover:text-[#f31260]  hover:bg-gray-700 ">{menus_items.menu_1}</Link>
                  <Link href={menus_items.href_2} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-[#f31260]  hover:bg-gray-700 ">{menus_items.menu_2}</Link>
                  <Link href={menus_items.href_3}  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-[#f31260]  hover:bg-gray-700 ">{menus_items.menu_3}</Link>
                  <Link href={menus_items.href_4} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-[#f31260]  hover:bg-gray-700 ">{menus_items.menu_4}</Link>
                  <Link href={menus_items.href_5} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-[#f31260]  hover:bg-gray-700 ">{menus_items.menu_5}</Link>
                  <button onClick={getLogout} className="w-full justify-start flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-400  hover:text-[#f31260]  hover:bg-gray-700 ">{menus_items.menu_6}</button>
                </div>
              </div>
            </div>
    )
}