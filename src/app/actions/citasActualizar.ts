/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AtendidosRepository } from "../models/entity/AtendidosRepositoty";
import { CitasRepository } from "../models/entity/CitasRepository";

  type TypeActualizado = {
    nombre?: string
    apellido?: string
    correo?: string
    fecha: string,
    hora:string,
    sede: string,
    tipo:string,
    id_estudiante:string
    index:number,
}

export  async function CitaAprobadaActualizada({id, estudiante}:{id:string, estudiante:TypeActualizado}){

    const estudianteActualizado = {
        estado: "aprobado",
        ...estudiante
    }
    const estudianteAtendido = {
        estado: "aprobado",
        id_cita: id,
        ...estudiante
    }

    const {message} = await  CitasRepository.actualizarCita(id,estudianteActualizado)
    //@ts-ignore
    const {messages} = await  AtendidosRepository.crearCitaAtendida({registroCitas:estudianteAtendido})
    
    return {
        message: message,
        messages: messages
    }
}

export  async function CitaAtendidasActualizada({id, estudiante,id_cita}:{id:string, estudiante:TypeActualizado,id_cita:string}){

    const estudianteActualizado = {
        estado: "atendido",
        ...estudiante
    }
    const estudianteAtendido = {
        estado: "atendido",
        ...estudiante
    }

    const {message} = await  CitasRepository.actualizarCita(id_cita,estudianteActualizado)
    const {messages} = await  AtendidosRepository.actualizarCitaAtendida(id,estudianteAtendido)
    
    return {
        message: message,
        messages: messages
    }
}
export  async function CitaRechazadaActualizada({id, estudiante}:{id:string, estudiante:TypeActualizado}){

    const estudianteActualizado = {
        estado: "rechazada",
        ...estudiante
    }

    const {message} = await  CitasRepository.actualizarCita(id,estudianteActualizado)

    return {
        message: message
    }
}

