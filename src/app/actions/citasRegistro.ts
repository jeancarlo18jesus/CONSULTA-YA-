

import {CitasRepository} from '@/app/models/entity/CitasRepository'


export async function CitasRegistro(state:string, formData: FormData) {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const fecha_cita = await formData.get('fecha').trim()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const sede = await formData.get('sede').trim()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const tipo = await formData.get('tipo').trim()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const estado = 'pendiente'
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const id_estudiante = await formData.get('estado')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
     // @ts-expect-error
     const hora_cita = await formData.get('hora').trim()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // Asegura que tenga dos dígitos
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const hora_actual = `${hours}:${minutes}:${seconds}`;

    const {totalCitas} = await CitasRepository.obtenerCantidadTotalCitas()
    // obtener la fecha actual de la consulta
    const fecha_envio= `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;


    const registroCitas = {
        fecha_cita:fecha_cita,
        fecha_envio:fecha_envio,
        hora_actual:hora_actual,
        hora_cita:hora_cita,
        sede:sede,
        tipo:tipo,
        estado:estado,
        id_estudiante:id_estudiante,
        index: totalCitas + 1,
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const {message} =  await CitasRepository.crearCita({registroCitas})

    return {
        message: message,
        validate: true
    }

}