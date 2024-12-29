/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */

'use client'

import { CitaAtendidasActualizada } from '@/app/actions/citasActualizar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Filter, X } from "lucide-react"

type TypeRegistroCitas = {
  id: string
  nombre?: string
  apellido?: string
  correo?: string
  fecha_envio: string,
  hora_actual: string,
  hora_cita: string
  fecha_cita: string,
  sede: string,
  tipo: string,
  estado: string,
  id_estudiante: string
  index: number,
  id_cita: string
}

export const PageCitasProgramadas = () => {
  const [citas, setCitas] = useState<TypeRegistroCitas[]>([])
  const [filteredCitas, setFilteredCitas] = useState<TypeRegistroCitas[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<TypeRegistroCitas | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    atendido: false,
    aprobado: false
  })

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await axios.get("/api/auth/atendidasCitas")
        setCitas(response.data)
        setFilteredCitas(response.data)
      } catch (err) {
        setError("Error al obtener las citas")
      } finally {
        setLoading(false)
      }
    }
    fetchCitas()
  }, [])

  useEffect(() => {
    const activeFilters = Object.entries(filters)
      .filter(([_, isActive]) => isActive)
      .map(([key]) => key);

    if (activeFilters.length === 0) {
      setFilteredCitas(citas);
    } else {
      const filtered = citas.filter(cita => activeFilters.includes(cita.estado.toLowerCase()));
      setFilteredCitas(filtered);
    }
  }, [filters, citas]);

  const handleRowClick = (appointment: TypeRegistroCitas) => {
    if (appointment.estado === 'aprobado') {
      setSelectedAppointment(appointment)
    } else {
      setSelectedAppointment(null)
    }
  }

  const handleAtendido = async () => {
    if (selectedAppointment) {
      const updatedAppointments = citas.map(app => 
        app.id === selectedAppointment.id 
          ? { ...app, estado: 'ATENDIDO' } 
          : app
      ) 
      const {id, estado, id_cita, ...estudiante} = selectedAppointment
      setCitas(updatedAppointments)
      //@ts-ignore
      const {message} = await CitaAtendidasActualizada({id: id, estudiante: estudiante, id_cita: id_cita})  
      console.log(message)
      setSelectedAppointment(null)
    }
  }

  const toggleFilter = (filterName: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  const clearFilters = () => {
    setFilters({
      atendido: false,
      aprobado: false
    });
  };

  const showAll = () => {
    setFilters({
      atendido: true,
      aprobado: true
    });
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
        <div className="w-full max-w-md rounded-[30px] shadow-xl overflow-hidden ">
          <div className="p-6">
            <div className="flex justify-center items-center h-[250px] w-full">
              <Image 
                width={650}
                height={650}
                src="/imgs/loading-citas-programadas.gif" 
                alt="Cargando" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    )
  
  if (error) return <p>Error: {error}</p>

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h1 className="text-3xl font-bold text-center text-[#FF1D8E] mb-6">Gestión de citas Programadas</h1>
      <div className='absolute top-0 right-0 m-4'>
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="bg-[#FF1D8E] hover:bg-[#D81B7A] text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Filter className='mr-2' />
          Filtrar
        </button>
        {isFilterOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
            <div className="p-2">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">Filtros</span>
                <button onClick={() => setIsFilterOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              {Object.entries(filters).map(([key, value]) => (
                <div key={key} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={key}
                    checked={value}
                    onChange={() => toggleFilter(key as keyof typeof filters)}
                    className="mr-2"
                  />
                  <label htmlFor={key} className="capitalize">{key}</label>
                </div>
              ))}
              <div className="flex justify-between mt-4">
                <button
                  onClick={clearFilters}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded text-sm"
                >
                  Borrar filtros
                </button>
                <button
                  onClick={showAll}
                  className="bg-[#FF1D8E] hover:bg-[#D81B7A] text-white font-bold py-1 px-2 rounded text-sm"
                >
                  Mostrar todos
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow h-[400px] overflow-auto">
        <table className="min-w-full">
          <thead className='sticky top-0'>
            <tr className="bg-gray-800 text-white text-center">
              <th className="py-3 px-4 text-center">N°</th>
              <th className="py-3 px-4 text-center">Nombre</th>
              <th className="py-3 px-4 text-center">Apellido</th>
              <th className="py-3 px-4 text-center">Correo</th>
              <th className="py-3 px-4 text-center">Tipo</th>
              <th className="py-3 px-4 text-center">Fecha</th>
              <th className="py-3 px-4 text-center">Hora</th>
              <th className="py-3 px-4 text-center">Estado</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredCitas?.sort((a, b) => b.index - a.index).map((cita, index) => (
              <tr 
                key={cita.id} 
                onClick={() => handleRowClick(cita)}
                className={`border-b hover:bg-gray-800 transition-colors hover:text-white cursor-pointer ${selectedAppointment?.id === cita.id ? 'bg-gray-900 text-white' : ''}`}
              >
                <td className="py-3 px-4 font-bold text-center">{filteredCitas.length - index}</td>
                <td className="py-3 px-4 text-center">{cita.nombre}</td>
                <td className="py-3 px-4 text-center">{cita.apellido}</td>
                <td className="py-3 px-4 text-center">{cita.correo}</td>
                <td className="py-3 px-4 text-center">{cita.tipo}</td>
                <td className="py-3 px-4 text-center">{cita.fecha_cita}</td>
                <td className="py-3 px-4 text-center">{cita.hora_cita}</td>
                <td className={`py-3 px-4 uppercase text-center ${cita.estado.toLowerCase() === 'atendido' ? 'text-green-500' : 'text-green-500'}`}>
                  {cita.estado}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6">
        <button 
          onClick={handleAtendido}
          disabled={!selectedAppointment || selectedAppointment.estado === 'ATENDIDO'}
          className={`bg-[#FF1D8E] hover:bg-[#D81B7A] text-white font-bold py-2 px-4 rounded ${(!selectedAppointment || selectedAppointment?.estado === 'ATENDIDO') ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Atendido
        </button>
      </div>
    </div>
  )
}