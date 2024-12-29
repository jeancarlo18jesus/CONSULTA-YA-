"use client";
import Link from "next/link";
import Image from "next/image";
// import { useEffect } from "react";
// import { getRoleValidateTrabajador } from "@/app/lib/definitions";
export default function Page() {
  // useEffect(() => {
  //   getRoleValidateTrabajador();
  // });
  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#f31260] mb-4">
              Gestiona tus citas y consultas de estudiantes
            </h1>
            <p className="text-gray-600 mb-6">
              Facilita tu labor académica. Organiza citas con estudiantes para
              orientación o consultas de forma rápida y sencilla.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
              <Link
                href={"/per/pendientes"}
                className="bg-[#f31260] text-white font-semibold py-2 px-6 rounded-full hover:bg-rose-600 transition duration-300 ease-in-out"
              >
                Gestiona pendientes
              </Link>
              <Link
                href={"/per/programados"}
                className="border-2 border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                Ver programadas 
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/imgs/image_personal_main.svg"
              alt="Estudiante agendando citas"
              width={400}
              height={400}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
