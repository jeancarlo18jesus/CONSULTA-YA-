'use client'

// import { getRoleValidate } from "@/app/lib/definitions";
import Link from "next/link";
// import { useEffect } from "react";
import {
  IoPerson,
  IoBriefcase,
} from "react-icons/io5";
import Image from "next/image";


export  function PageRole() {
    return (
        <div className="w-full ">
      <div className="w-full h-[300px]  bg-gradient-to-br from-red-950  to-pink-950 grid grid-cols-2 ">
        <div className="w-full h-full flex justify-center items-center">
          <section className=" w-[400px] h-[300px] translate-y-28  flex justify-center items-center ">
            <Image
              src="/imgs/image_role.png"
              alt="Ensalada"
              width={400}
              height={400}
              className=" "
            />
          </section>
        </div>
        <section className="w-full h-full flex justify-center p-8 flex-col text-white">
          <h1 className="text-[55px] font-semibold bg-gradient-to-br from-rose-700  to-pink-800 bg-clip-text text-transparent animate-pulse" >Bienvenidos </h1>
          <p className="text-sml text-white">
          Nuestros estudiantes son la esencia de nuestra comunidad. 
          Se dedican a aprender, crecer y prepararse para el futuro.
          </p>
        </section>
      </div>
      <div className="w-full h-[700px] flex flex-col justify-center items-center">
        <h1 className="font-bold  text-[35px] text-rose-700 ">
          Seleccion de roles
        </h1>
        <p className="text-sm text-gray-600 font-light">
          Acceso para estudiantes matriculados en cursos académicos y personal
          administrativo
        </p>
        <div className="w-3/4 h-[300px]  flex justify-center items-center gap-8 ">
          <Link
            href={"/login/estudiante"}
            className="w-[200px] h-[200px]   border-rose-900 border-2 flex justify-center items-center flex-col gap-5 ease-in-out duration-200  hover:bg-rose-900 group transition-colors"
          >
            <IoPerson className="w-24 h-24 text-rose-900 group-hover:text-white" />
            <h1 className="font-semibold text-[24px] text-gray-800">
              Estudiante
            </h1>
            {/* <IoBriefcase/> */}
          </Link>
          <Link
            href={"/login/trabajador"}
            className="w-[200px] h-[200px]  border-rose-900 border-2 flex justify-center items-center flex-col gap-5 ease-in-out duration-200  hover:bg-rose-900 group transition-colors"
          >
            <IoBriefcase className="w-24 h-24 text-rose-900 group-hover:text-white" />
            <h1 className="font-semibold  text-[24px] text-gray-800">
              Trabajador
            </h1>
            {/* <IoBriefcase/> */}
          </Link>
        </div>
        
      </div>
    </div>
    );
}