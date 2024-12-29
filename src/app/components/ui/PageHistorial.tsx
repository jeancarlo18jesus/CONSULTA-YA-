/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  MapPin,
  FileText,
  ClockAlert,
  BellRing,
} from "lucide-react";
import clsx from "clsx";
import axios from "axios";
import estudiantes from "../../schema/estudiante.json";
import { Cita, Consulta } from "@/seed";
import Image from "next/image";

export function PageHistorial() {
  const [activeList, setActiveList] = useState<
    "appointments" | "consultations"
  >("appointments");
  const [citas, setCitas] = useState<Cita[]>([]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    pendiente: true,
    atendido: true,
    rechazada: true,
    aprobado: true,
  });

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await axios.get("/api/auth/cita");
        const responseEstudiante = await axios.get("/api/roles");
        const valueEstudiante = estudiantes.find(
          (estudiante) => estudiante.dni === responseEstudiante.data.usuario.dni
        );
        setCitas(
          response.data.filter(
            //@ts-ignore
            (cita) => cita.id_estudiante === valueEstudiante?.customId
          )
        );
      } catch (err) {
        //@ts-ignore
        setError(err.response?.data?.message || "Error al obtener las citas");
      } finally {
        setLoading(false);
      }
    };

    const fetchConsultas = async () => {
      try {
        const response = await axios.get("/api/auth/consulta");
        const responseEstudiante = await axios.get("/api/roles");
        const valueEstudiante = estudiantes.find(
          (estudiante) => estudiante.dni === responseEstudiante.data.usuario.dni
        );
        setConsultas(
          response.data.filter(
            //@ts-ignore
            (consulta) => consulta.id_estudiante === valueEstudiante?.customId
          )
        );
      } catch (err) {
        //@ts-ignore
        setError(
          // @ts-ignore
          err.response?.data?.message || "Error al obtener las consultas"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCitas();
    fetchConsultas();
  }, []);

  const toggleFilter = (filterName: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      //@ts-ignore
      [filterName]: !prevFilters[filterName],
    }));
  };

  const showAll = () => {
    setFilters({
      pendiente: true,
      atendido: true,
      rechazada: true,
      aprobado: true,
    });
  };

  const clearAll = () => {
    setFilters({
      pendiente: false,
      atendido: false,
      rechazada: false,
      aprobado: false,
    });
  };
  //@ts-ignore
  const filteredCitas = citas.filter((cita) => filters[cita.estado]);
  //@ts-ignore
  const filteredConsultas = consultas.filter(
    // @ts-ignore
    (consulta) => filters[consulta.estado]
  );

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
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 relative">
      <div className="w-[250px] h-max bg-white  shadow-lg   absolute top-4 -right-72 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Filtros</h2>
        <div className="space-y-4">
          {Object.entries(filters).map(([filter, isChecked]) => (
            <div key={filter} className="flex items-center">
              <input
                type="checkbox"
                id={filter}
                checked={isChecked}
                onChange={() => toggleFilter(filter)}
                className="form-checkbox h-5 w-5   transition duration-150 ease-in-out accent-rose-500 focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              />
              <label
                htmlFor={filter}
                className="ml-2 block text-sm leading-5 text-gray-900 capitalize"
              >
                {filter}
              </label>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col space-y-2">
          <button
            onClick={showAll}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            Mostrar Todo
          </button>
          <button
            onClick={clearAll}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-rose-500 bg-rose-100 hover:bg-rose-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`${clsx`${
            activeList === "appointments" ? "bg-black text-white " : ""
          }`} p-3 rounded-lg`}
          onClick={() => setActiveList("appointments")}
        >
          Historial de Citas
        </button>
        <button
          className={`${clsx`${
            activeList === "consultations" ? "bg-black text-white " : ""
          }`} p-3 rounded-lg`}
          onClick={() => setActiveList("consultations")}
        >
          Historial de Consultas
        </button>
      </div>

      {activeList === "appointments" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-br from-slate-950 to-gray-500 bg-clip-text text-transparent animate-pulse">
            Historial de Citas
          </h2>
          {filteredCitas.length === 0 ? (
            <p className="bg-gradient-to-br from-rose-950 to-pink-800 bg-clip-text text-transparent text-sm">
              No hay historial
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-4">
              {filteredCitas
                .sort((a, b) => a.index - b.index) // mapeo en orden
                .map((cita, value) => (
                  <li
                    key={cita.id}
                    className="bg-gray-200 shadow rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <CalendarDays
                          className={clsx(
                            "w-5 h-5 capitalize",
                            cita.estado === "pendiente"
                              ? "text-blue-500"
                              : cita.estado === "rechazada"
                              ? "text-red-500"
                              : "text-green-500"
                          )}
                        />
                        <span className="font-semibold">
                          {cita.fecha_envio}
                        </span>
                        <span className="text-gray-700 font-medium">
                          {cita.hora_actual}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                          cita.estado === "pendiente"
                            ? "bg-yellow-100 text-yellow-800"
                            : cita.estado === "rechazada"
                            ? "bg-red-100 text-red-500"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {cita.estado || "No especificado"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{cita.sede}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
                      <FileText className="w-4 h-4" />
                      <span>{cita.tipo}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
                      <BellRing className="w-4 h-4" />
                      <span>Fecha : {cita.fecha_cita}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-700 font-semibold justify-between">
                      <div className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
                        <ClockAlert className="w-4 h-4" />
                        <span>Hora : {cita.hora_cita}</span>
                      </div>
                      <span className="bg-gradient-to-br from-rose-950 to-pink-800 bg-clip-text text-transparent text-xl">
                        #{value}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}

      {activeList === "consultations" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-br from-slate-950 to-gray-500 bg-clip-text text-transparent animate-pulse">
            Historial de Consultas
          </h2>
          {filteredConsultas.length === 0 ? (
            <p className="bg-gradient-to-br from-rose-950 to-pink-800 bg-clip-text text-transparent text-sm">
              No hay historial
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-4">
              {filteredConsultas
                .sort((a, b) => a.index - b.index)
                .map((consulta, value) => (
                  <li
                    key={consulta.id}
                    className="bg-gray-200 shadow rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <CalendarDays
                          className={clsx(
                            "w-5 h-5 ",
                            consulta.estado === "pendiente"
                              ? "text-blue-500"
                              : consulta.estado === "rechazada"
                              ? "text-red-500"
                              : "text-green-500"
                          )}
                        />
                        <span className="font-semibold">
                          {consulta.fecha_envio}
                        </span>
                        <span className="text-gray-500">
                          {consulta.hora_actual}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                          consulta.estado === "pendiente"
                            ? "bg-yellow-100 text-yellow-800"
                            : consulta.estado === "rechazada"
                            ? "bg-red-100 text-red-500"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {consulta.estado}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
                      <MapPin className="w-4 h-4" />
                      <span> {consulta.sede}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
                      <FileText className="w-4 h-4" />
                      <span>{consulta.motivo}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
                      <BellRing className="w-4 h-4" />
                      <span>Fecha : {consulta.fecha_consulta}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-700 font-semibold justify-between">
                      <div className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
                        <ClockAlert className="w-4 h-4" />
                        <span>Hora : {consulta.hora_consulta}</span>
                      </div>

                      <span className="bg-gradient-to-br from-rose-950 to-pink-800 bg-clip-text text-transparent text-xl">
                        #{value}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
