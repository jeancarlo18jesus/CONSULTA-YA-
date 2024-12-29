"use client";
import { Calendar, Clock } from "lucide-react";
// import { getRoleValidateEstudiante } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";
// import { useEffect } from "react";
export default function Page() {
  // useEffect(() => {
  //   getRoleValidateEstudiante() ;
  // }, []);
  const horarios = [
    { dia: "Lunes", horas: "9:00 - 18:00" },
    { dia: "Martes", horas: "9:00 - 18:00" },
    { dia: "Miércoles", horas: "9:00 - 18:00" },
    { dia: "Jueves", horas: "9:00 - 18:00" },
    { dia: "Viernes", horas: "9:00 - 18:00" },
    { dia: "Sábado", horas: "10:00 - 14:00" },
    { dia: "Domingo", horas: "Cerrado" },
  ];
  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full mx-auto   ">
        <div className="flex flex-col md:flex-row items-center  gap-8">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#f31260] mb-4">
              Agenda tus citas y consultas estudiantiles
            </h1>
            <p className="text-gray-600 mb-6">
              Simplifica tu vida académica. Programa citas con profesores y
              asesores de forma rápida y sencilla
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
              <Link
                href={"/edu/citas"}
                className="bg-[#f31260] text-white font-semibold py-2 px-6 rounded-full hover:bg-rose-600 transition duration-300 ease-in-out"
              >
                Agendar citas
              </Link>
              <Link
                href={"/edu/consultas"}
                className="border-2 border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                Agendar consultas
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <Image
              src="/imgs/image_estudiante_main.svg"
              alt="Estudiante agendando citas"
              width={400}
              height={400}
              className="w-full h-auto object-contain"
            />
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[250px] h-[250px] mx-auto flex flex-col absolute top-9 right-[75px] ">
              <div className="bg-[#f31260] text-white p-2">
                <h2 className="text-lg font-bold flex items-center justify-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Horarios de atención
                </h2>
              </div>
              <div className="p-2 flex-grow overflow-y-auto">
                <ul className="space-y-1">
                  {horarios.map((horario) => (
                    <li
                      key={horario.dia}
                      className="flex justify-between items-center text-sm"
                    >
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3 text-gray-500" />
                        <span className="font-medium">{horario.dia}</span>
                      </div>
                      <span
                        className={`px-1 py-0.5 rounded text-xs font-semibold ${
                          horario.horas === "Cerrado"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {horario.horas}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
