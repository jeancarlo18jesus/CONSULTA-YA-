/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { ConsultaAprobadaActualizada, ConsultaRechazadaActualizada } from '@/app/actions/consultasActualizada';
import axios from 'axios'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Filter, X } from "lucide-react"

export type Consulta = {
  id: string;
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
};

export const PageConsultasPendientes = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [filteredConsultas, setFilteredConsultas] = useState<Consulta[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<Consulta | null>(null)
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    pendiente: false,
    aprobado: false,
    rechazada: false
  })

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const response = await axios.get("/api/auth/consulta")
        const consultasPendientes = response.data.filter((consulta: Consulta) => consulta.estado !== 'atendido');
        setConsultas(consultasPendientes)
        setFilteredConsultas(consultasPendientes)
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
      const filtered = consultas.filter(consulta => activeFilters.includes(consulta.estado));
      setFilteredConsultas(filtered);
    }
  }, [filters, consultas]);

  const handleRowClick = (consulta: Consulta) => {
    if (consulta.estado === 'pendiente') {
      setSelectedAppointment(consulta)
    } else {
      setSelectedAppointment(null)
    }
  }

  const openApproveModal = () => setIsApproveModalOpen(true)
  const closeApproveModal = () => setIsApproveModalOpen(false)
  const openRejectModal = () => setIsRejectModalOpen(true)
  const closeRejectModal = () => setIsRejectModalOpen(false)

  const handleApprove = async () => {
    if (selectedAppointment) {
      const updatedAppointments = consultas.map(app =>
        app.id === selectedAppointment.id
          ? { ...app, estado: 'aprobado' }
          : app
      )
      closeApproveModal()
      setConsultas(updatedAppointments)
      const { id, estado, ...estudiante } = selectedAppointment
      //@ts-ignore
      const { message } = await ConsultaAprobadaActualizada({ id: id, estudiante: estudiante })
      console.log(message)
      setSelectedAppointment(null)
    }
  }

  const handleReject = async () => {
    if (selectedAppointment) {
      const updatedAppointments = consultas.map(app =>
        app.id === selectedAppointment.id
          ? { ...app, estado: 'rechazada' }
          : app
      )
      setConsultas(updatedAppointments)
      const { id, estado, ...estudiante } = selectedAppointment
      //@ts-ignore
      const { message } = await ConsultaRechazadaActualizada({ id: id, estudiante: estudiante })
      console.log(message)
      setSelectedAppointment(null)
      closeRejectModal()
    }
  }

  const toggleFilter = (filterName: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  const clearFilters = () => {
    setFilters({
      pendiente: false,
      aprobado: false,
      rechazada: false
    });
  };

  const showAll = () => {
    setFilters({
      pendiente: true,
      aprobado: true,
      rechazada: true
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
        <div className="w-full max-w-md rounded-[30px] shadow-xl overflow-hidden">
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
  }
  if (error) return <p>Error: {error}</p>

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h1 className="text-3xl font-bold text-center text-[#FF1D8E] mb-6">Gestión de Consultas Pendientes</h1>
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
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto h-[400px] overflow-auto">
          <table className="min-w-full">
            <thead className='sticky top-0'>
              <tr className="bg-gray-800 text-white">
                <th className="py-3 px-4 text-center">N°</th>
                <th className="py-3 px-4 text-center">Nombre</th>
                <th className="py-3 px-4 text-center">Apellido</th>
                <th className="py-3 px-4 text-center">Correo</th>
                <th className="py-3 px-4 text-center">Motivo</th>
                <th className="py-3 px-4 text-center">Fecha</th>
                <th className="py-3 px-4 text-center">Hora</th>
                <th className="py-3 px-4 text-center">Sede</th>
                <th className="py-3 px-4 text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredConsultas
              .sort((a,b) => b.index - a.index)
              .map((consulta, index) => (
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
                  <td className="py-3 px-4 text-center">{consulta.sede}</td>
                  <td className={`py-3 px-4 text-center uppercase ${
                    consulta.estado === 'aprobado' ? 'text-green-500' : 
                    consulta.estado === 'rechazada' ? 'text-red-500' : ''
                  }`}>
                    {consulta.estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-6">
        <button 
          className={`bg-[#FF1D8E] hover:bg-[#D81B7A] text-white font-bold py-2 px-4 rounded ${(!selectedAppointment || selectedAppointment.estado !== 'pendiente') ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={openApproveModal} 
          disabled={!selectedAppointment || selectedAppointment.estado !== 'pendiente'}
        >
          Aprobar
        </button>
        <button 
          className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ${(!selectedAppointment || selectedAppointment.estado !== 'pendiente') ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={openRejectModal} 
          disabled={!selectedAppointment || selectedAppointment.estado !== 'pendiente'}
        >
          Rechazar
        </button>
      </div>

      {isApproveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Confirmar Aprobación</h2>
            <p className="mb-4">¿Desea aprobar la consulta?</p>
            <div className="flex justify-end space-x-2">
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded" onClick={closeApproveModal}>
                Cancelar
              </button>
              <button className="px-4 py-2 bg-[#FF1D8E] text-white rounded" onClick={handleApprove}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {isRejectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Confirmar Rechazo</h2>
            <p className="mb-4">¿Desea rechazar la consulta?</p>
            <div className="flex justify-end space-x-2">
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded" onClick={closeRejectModal}>
                Cancelar
              </button>
              <button className="px-4 py-2 bg-[#FF1D8E] text-white rounded" onClick={handleReject}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}