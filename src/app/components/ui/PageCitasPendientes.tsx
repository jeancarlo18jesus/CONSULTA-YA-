/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { CitaAprobadaActualizada, CitaRechazadaActualizada } from '@/app/actions/citasActualizar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Image from 'next/image'
import {
  Filter,
  X
} from "lucide-react";

export type Cita = {
  id: string;
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
};

export const PageCitasPendientes = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [filteredCitas, setFilteredCitas] = useState<Cita[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Cita | null>(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    pendiente: false,
    aprobado: false,
    rechazada: false
  });

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await axios.get("/api/auth/cita");
        const citasPendientes = response.data.filter((cita: Cita) => cita.estado !== 'atendido');
        setCitas(citasPendientes);
        setFilteredCitas(citasPendientes);
      } catch (err) {
        setError("Error al obtener las citas");
      } finally {
        setLoading(false);
      }
    };
    fetchCitas();
  }, []);

  useEffect(() => {
    const activeFilters = Object.entries(filters)
      .filter(([_, isActive]) => isActive)
      .map(([key]) => key);

    if (activeFilters.length === 0) {
      setFilteredCitas(citas);
    } else {
      const filtered = citas.filter(cita => activeFilters.includes(cita.estado));
      setFilteredCitas(filtered);
    }
  }, [filters, citas]);

  const handleRowClick = (appointment: Cita) => {
    if (appointment.estado === 'pendiente') {
      setSelectedAppointment(appointment);
    } else {
      setSelectedAppointment(null);
    }
  };

  const openApproveModal = () => setIsApproveModalOpen(true);
  const openRejectModal = () => setIsRejectModalOpen(true);
  const closeApproveModal = () => setIsApproveModalOpen(false);
  const closeRejectModal = () => setIsRejectModalOpen(false);

  const handleApprove = async () => {
    if (selectedAppointment) {
      const updatedAppointments = citas.map(app => 
        app.id === selectedAppointment.id 
          ? { ...app, estado: 'aprobado' } 
          : app
      );
      closeApproveModal();
      setCitas(updatedAppointments);
      const {id, estado, ...estudiante} = selectedAppointment;
      // @ts-ignore
      const {message} = await CitaAprobadaActualizada({id: id, estudiante: estudiante});
      console.log(message);
      setSelectedAppointment(null);
    }
  };

  const handleReject = async () => {
    if (selectedAppointment) {
      const updatedAppointments = citas.map(app => 
        app.id === selectedAppointment.id 
          ? { ...app, estado: 'rechazada' } 
          : app
      );
      setCitas(updatedAppointments);
      const {id, estado, ...estudiante} = selectedAppointment;
      // @ts-ignore
      const {message} = await CitaRechazadaActualizada({id: id, estudiante: estudiante});
      console.log(message);
      setSelectedAppointment(null);
      closeRejectModal();
    }
  };

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

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
        <div className="w-full max-w-md  rounded-[30px] shadow-xl overflow-hidden ">
          <div className="p-6">
            <div className="flex justify-center items-center  h-[250px] w-full  ">
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
    );
  
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h1 className="text-3xl font-bold text-center text-[#FF1D8E] mb-6">Gestión de citas Pendientes</h1>
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
            <thead className='sticky top-0 '>
              <tr className="bg-gray-800 text-white">
                <th className="py-3 px-4 text-center ">N°</th>
                <th className="py-3 px-4 text-center">Nombre</th>
                <th className="py-3 px-4 text-center">Apellido</th>
                <th className="py-3 px-4 text-center">Correo</th>
                <th className="py-3 px-4 text-center">Tipo</th>
                <th className="py-3 px-4 text-cente">Fecha</th>
                <th className="py-3 px-4 text-center">Hora</th>
                <th className="py-3 px-4 text-cente">Sede</th>
                <th className="py-3 px-4 text-cente">Estado</th>
              </tr>
            </thead>
            <tbody className=''>
              {filteredCitas
              .sort((a, b) => b.index - a.index)
              .map((cita, index) => (
                <tr 
                  key={cita.id} 
                  onClick={() => handleRowClick(cita)}
                  className={`border-b hover:bg-gray-800 transition-colors hover:text-white cursor-pointer ${selectedAppointment?.id === cita.id ? 'bg-gray-900 text-white' : ''}`}
                >
                  <td className="py-3 px-4 font-bold text-center ">{filteredCitas.length - index}</td>
                  <td className="py-3 px-4 text-center">{cita.nombre}</td>
                  <td className="py-3 px-4 text-center">{cita.apellido}</td>
                  <td className="py-3 px-4 text-center">{cita.correo}</td>
                  <td className="py-3 px-4 text-center">{cita.tipo}</td>
                  <td className="py-3 px-4 text-center">{cita.fecha_cita}</td>
                  <td className="py-3 px-4 text-center">{cita.hora_cita}</td>
                  <td className="py-3 px-4 text-center" >{cita.sede}</td>
                  <td className={`py-3 px-4 uppercase  text-center ${
                    cita.estado === 'aprobado' ? 'text-green-500' : 
                    cita.estado === 'rechazada' ? 'text-red-500' : ''
                  }`}>
                    {cita.estado}
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
            <p className="mb-4">¿Desea aprobar la cita?</p>
            <div className="flex justify-end space-x-2">
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
                onClick={closeApproveModal}
              >
                Cancelar
              </button>
              <button 
                className="px-4 py-2 bg-[#FF1D8E] text-white rounded"
                onClick={handleApprove}
              >
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
            <p className="mb-4">¿Desea rechazar la cita?</p>
            <div className="flex justify-end space-x-2">
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
                onClick={closeRejectModal}
              >
                Cancelar
              </button>
              <button 
                className="px-4 py-2 bg-[#FF1D8E] text-white rounded"
                onClick={handleReject}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}