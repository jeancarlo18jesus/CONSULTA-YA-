/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { ConsultaAtendidasActualizada } from '@/app/actions/consultasActualizada'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Filter, X } from "lucide-react"

type TypeRegistroConsultas = {
  id: string
  nombre?: string
  apellido?: string
  correo?: string
  fecha_envio: string,
  fecha_consulta: string,
  hora_actual: string,
  hora_consulta: string,
  sede: string,
  motivo: string,
  estado: string,
  id_estudiante: string
  index: number
  id_consulta: string
}

export const PageConsultasProgramadas = () => {
  const [consultas, setConsultas] = useState<TypeRegistroConsultas[]>([])
  const [filteredConsultas, setFilteredConsultas] = useState<TypeRegistroConsultas[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<TypeRegistroConsultas | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    atendido: false,
    aprobado: false
  })

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const response = await axios.get("/api/auth/atendidasConsultas")
        setConsultas(response.data)
        setFilteredConsultas(response.data)
      } catch (err) {
        setError("Error al obtener las consultas")
      } finally {
        setLoading(false)
      }
    }
    fetchConsultas()
  }, [])

  useEffect(() => {
    const activeFilters = Object.entries(filters)
      .filter(([_, isActive]) => isActive)
      .map(([key]) => key);

    if (activeFilters.length === 0) {
      setFilteredConsultas(consultas);
    } else {
      const filtered = consultas.filter(consulta => activeFilters.includes(consulta.estado.toLowerCase()));
      setFilteredConsultas(filtered);
    }
  }, [filters, consultas]);

  const handleRowClick = (appointment: TypeRegistroConsultas) => {
    if (appointment.estado === 'aprobado') {
      setSelectedAppointment(appointment)
    } else {
      setSelectedAppointment(null)
    }
  }

  const handleAtendido = async () => {
    if (selectedAppointment) {
      const updatedAppointments = consultas.map(app => 
        app.id === selectedAppointment.id 
          ? { ...app, estado: 'ATENDIDO' } 
          : app
      ) 
      const {id, estado, id_consulta, ...estudiante} = selectedAppointment
      console.log(id)
      console.log(estado)
      console.log(estudiante)
      setConsultas(updatedAppointments)
      //@ts-ignore
      const {message} = await ConsultaAtendidasActualizada({id: id, estudiante: estudiante, id_consulta: id_consulta})  
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
      <h1 className="text-3xl font-bold text-center text-[#FF1D8E] mb-6">Gestión de Consultas Programadas</h1>
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
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-4 text-center">N°</th>
              <th className="py-3 px-4 text-center">Nombre</th>
              <th className="py-3 px-4 text-center">Apellido</th>
              <th className="py-3 px-4 text-center">Correo</th>
              <th className="py-3 px-4 text-center">Motivo</th>
              <th className="py-3 px-4 text-center">Fecha</th>
              <th className="py-3 px-4 text-center">Horario</th>
              <th className="py-3 px-4 text-center">Estado</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredConsultas?.sort((a, b) => b.index - a.index).map((consulta, index) => (
              <tr 
                key={consulta.id} 
                onClick={() => handleRowClick(consulta)}
                className={`border-b hover:bg-gray-800 transition-colors hover:text-white cursor-pointer ${selectedAppointment?.id === consulta.id ? 'bg-gray-900 text-white' : ''}`}
              >
                <td className="py-3 px-4 font-bold text-center">{filteredConsultas.length - index}</td>
                <td className="py-3 px-4 text-center">{consulta.nombre}</td>
                <td className="py-3 px-4 text-center">{consulta.apellido}</td>
                <td className="py-3 px-4 text-center">{consulta.correo}</td>
                <td className="py-3 px-4 text-center">{consulta.motivo}</td>
                <td className="py-3 px-4 text-center">{consulta.fecha_consulta}</td>
                <td className="py-3 px-4 text-center">{consulta.hora_consulta}</td>
                <td className={`py-3 px-4 uppercase text-center ${consulta.estado === 'atendido' ? 'text-green-500' : 'text-green-500'}`}>
                  {consulta.estado}
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