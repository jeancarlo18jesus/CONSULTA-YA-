import Link from "next/link";
import Image from "next/image";


export const PageProgramados = () => {
    return (
        <>
        <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 text-[#F31260]">
        ESTA ES LA SECCION DE PROGRAMADOS DE CITAS Y CONSULTAS
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
        <div className="w-[400px] h-[400px] aspect-square  mb-4 overflow-hidden object-cover "><Image src={"/imgs/per_programados_citas.svg"} width={400} height={400} alt="imagen de per citas pendientes" /></div>
          <Link href={"/per/programados/citas"} className="bg-[#F31260] hover:bg-rose-800 text-white font-bold py-2 px-4 rounded">
            Citas
          </Link>
        </div>
        
        <div className="flex flex-col items-center">
        <div className="w-[400px] h-[400px] aspect-square  mb-4 overflow-hidden object-cover "><Image src={"/imgs/per_programados_consultas.svg"} width={400} height={400} alt="imagen de per citas pendientes" /></div>
          <Link href={"/per/programados/consultas"} className="bg-[#F31260] hover:bg-rose-800 text-white font-bold py-2 px-4 rounded">
            Consultas
          </Link>
        </div>
      </div>
      
      {/* <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Innovación constructiva</h3>
        <p className="text-gray-600">
          El resultado de nuestro proceso es una guía integral que se puede utilizar para diseñar 
          estrategias de marketing y otros activos de diseño que reflejan nuestra nueva marca.
        </p>
      </div> */}
    </div>
        </>
    )
}