

import {ConsultasRepository} from '@/app/models/entity/ConsultasRepository'


export async function ConsultasRegistro(state:string, formData: FormData) {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const fecha_consulta = await formData.get('fecha').trim()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const sede = await formData.get('sede').trim()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const tipo = await formData.get('motivo').trim()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
     // @ts-expect-error
    const hora_consulta = await formData.get('hora').trim()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const estado = 'pendiente'
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const id_estudiante = await formData.get('estado')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // Asegura que tenga dos dígitos
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const hora_actual = `${hours}:${minutes}:${seconds}`;

    // obtener la fecha actual de la consulta
    const fecha_envio= `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;


    const {totalConsultas} = await ConsultasRepository.obtenerCantidadTotalConsultas()


    const registroConsultas = {
        fecha_envio:fecha_envio,
        fecha_consulta:fecha_consulta,
        hora_actual:hora_actual,
        hora_consulta:hora_consulta,
        sede:sede,
        motivo:tipo,
        estado:estado,
        id_estudiante:id_estudiante,
        index: totalConsultas
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const {message} =  await ConsultasRepository.crearConsulta({registroConsultas})

    return {
        message: message,
        validate: true
    }

}