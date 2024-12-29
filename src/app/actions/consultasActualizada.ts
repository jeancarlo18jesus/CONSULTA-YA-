import { AtendidosRepository } from "../models/entity/AtendidosRepositoty";
import { ConsultasRepository } from "../models/entity/ConsultasRepository";

type TypeActualizado = {
    nombre?: string
    apellido?: string
    correo?: string
    fecha: string,
    hora:string,
    sede: string,
    motivo:string,
    id_estudiante:string
    index:number
}


export  async function ConsultaAprobadaActualizada({id, estudiante}:{id:string, estudiante:TypeActualizado}){

    const estudianteActualizado = {
        estado: "aprobado",
        ...estudiante
    }
    const estudianteAtendido = {
        estado: "aprobado",
        id_consulta: id,
        ...estudiante
    }
    const {message} = await  ConsultasRepository.actualizarConsulta(id,estudianteActualizado)
    const {messages} = await  AtendidosRepository.crearConsultaAtendida({registroConsultas:estudianteAtendido})

    return {
        message: message,
        messages: messages
    }
}
export  async function ConsultaAtendidasActualizada({id, estudiante,id_consulta}:{id:string, estudiante:TypeActualizado,id_consulta:string}){

    const estudianteActualizado = {
        estado: "atendido",
        ...estudiante
    }
    const estudianteAtendido = {
        estado: "atendido",
        ...estudiante
    }

    const {message} = await  ConsultasRepository.actualizarConsulta(id_consulta,estudianteActualizado)
    const {messages} = await  AtendidosRepository.actualizarConsultaAtendida(id,estudianteAtendido)
    
    return {
        message: message,
        messages: messages
    }
}
export  async function ConsultaRechazadaActualizada({id, estudiante}:{id:string, estudiante:TypeActualizado}){

    const estudianteActualizado = {
        estado: "rechazada",
        ...estudiante
    }

    const {message} = await  ConsultasRepository.actualizarConsulta(id,estudianteActualizado)

    return {
        message: message
    }
}