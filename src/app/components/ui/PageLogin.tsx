'use client'

import {  
   useEffect } from "react"; /// usar en pruebas de integration  - FormEvent

import Image from "next/image";

import { useFormState } from "react-dom"; // <-- despues usar esto useFormStatus
import { IniciarSesion } from "@/app/actions/auth";

import clsx from "clsx";
import { Loader2 } from "lucide-react";




export function PageLogin({slug}:{ slug: string }) {
  // const [DATA , setDATA] = useState("No hay data")
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const [state, action] = useFormState(IniciarSesion, undefined);

     useEffect(() => {
      console.log(slug)
       
      }, [slug]);
      
  //   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   prueba dede integracion desde cypress mandamos recuperamos informacion del data desde cypress
  //   e.preventDefault();
  //   const  data = await (await (fetch('/api/data'))).json()
  //   setDATA(data)

  //   console.log("Submit desde cypress")
  // }
    return (
        <>
           <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="grid w-full max-w-4xl gap-8 lg:grid-cols-2">
        <div className="flex items-center justify-center">
          <div className="relative h-64 w-64">
            <div className="absolute inset-0 rounded-full "></div>
            <Image
              width={500}
              height={500}
              alt="Cartoon character"
              className="relative z-10 h-full w-full  "
              src={"/imgs/image_login.svg"}
            />
            <div className="absolute -left-4 -top-4 h-8 w-8 rounded-full bg-rose-900"></div>
            <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-pink-950"></div>
            <div className="absolute bottom-12 left-0 h-10 w-10 rounded-full border-4 border-dashed border-rose-400"></div>
            <div className="absolute -right-6 top-12 h-12 w-12 rounded-full border-4 border-dotted border-rose-400"></div>
          </div>
        </div>
        {/* HACER VALIDACION DE QUE SI EL LOGIN ES ESTUDAINTE O TRABAJADOR VALIDAR ESO EEST PENDIENTE */}
        <div className="rounded-lg bg-rose-900 p-8 shadow-lg h-max">
          <h2 className="mb-6 text-2xl font-bold text-white text-center capitalize">Iniciar {slug} </h2>
          <form autoComplete="off" action={action}  className="space-y-4 flex  flex-col justify-center items-center" > {/* onSubmit={handleSubmit} */}
            <div className="space-y-2 flex justify-center items-center full">
               <input type="text" name="user"  defaultValue={slug} className="hidden"/>
              <input
            name="customId"
            type="text"
            id="id-input"
            color="danger"
            minLength={1}
            placeholder={"ingrese su id..."}
            className="w-[250px] h-9 bg-transparent text-white outline-none border-b  placeholder:text-white text-sm font-semibold  "
          /> 
            </div>
          
                {state?.errors && (
          <p
          id="error-login"
            className={` ${clsx`${
              state?.validate
                ? " text-[#fafafa]  bg-green-500"
                : "text-[#fafafa] bg-red-500 "
            }`} mb-5  font-bold   rounded-2xl  w-full flex justify-center text-center items-center text-sm`}
          >
            {state.errors}
          </p>
        )}
           <button
              id="button-login"
              disabled={state?.validate}
              className="bg-white text-rose-700 font-semibold py-2 px-6 rounded-full hover:bg-opacity-90 transition-colors duration-300 mb-8 flex items-center justify-center"
            >
               { state?.validate ? (
                 <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ingresando...
                </>
              ) : (
                'Ingresar'
              )}
            </button>
          
          </form>
        </div>
       
      </div>
    </div>
    {/* <p>{JSON.stringify(DATA)}</p> */}
        </>
    );
}