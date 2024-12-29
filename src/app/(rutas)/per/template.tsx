'use client'
import { useEffect, useState } from 'react'
import { Menu, X, User, ChevronDown } from 'lucide-react'
import {AboutDeskotTrabajador, AboutMovilTrabajador, NavMenu} from '@/app/components'
import axios from 'axios'
// import Link from 'next/link'
import { TrabajadorObjecto, items_1_per,items_3_per,items_2_per ,itemsMenuTrabajador} from '@/seed'

export default function Template({children}: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [trabajador, setTrabajador] = useState({
      ...TrabajadorObjecto
  })
    useEffect(() => {
        const getPerfil = async () => {
            try {
                const response = await axios.get('/api/roles');
                setTrabajador(response.data.usuario);
                
            } catch (error) {
                console.error('Error al obtener el perfil:', error);
            }
        };
        
        getPerfil();
    }, []);
 // Array vacío para que se ejecute solo una vez
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
    return (
        <>
        <div>
        <nav className="bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* MENU DE ITEMS */}
              <NavMenu items_1={items_1_per} items_2={items_2_per} items_3={items_3_per}/>
              <div className="hidden md:block relative">
                <button 
                  onClick={toggleDropdown}
                  className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium flex items-center"
                >
                  <User className="w-4 h-4 mr-2 text-[#f31260]" />
                  <h1 className='font-semibold text-[#f31260]'>Trabajador</h1>
                  <ChevronDown className="w-4 h-4 ml-2 text-[#f31260]" />
                </button>
                {isDropdownOpen && (
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  <AboutDeskotTrabajador usuario={trabajador} menus_items={itemsMenuTrabajador} />
                )}
              </div>
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
    
          {isOpen && (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            <AboutMovilTrabajador usuario={trabajador}  menus_items={itemsMenuTrabajador} items_1={items_1_per} items_2={items_2_per} items_3={items_3_per}/>
          )}
        </nav>
        </div>
        <div>
            {children}
        </div>
        {/* <Link
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 ease-in-out"
        aria-label="Contactar por WhatsApp"
      >
        <Phone className="w-6 h-6" />
      </Link> */}
        </>

)
}