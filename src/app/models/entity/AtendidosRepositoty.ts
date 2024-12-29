/* eslint-disable @typescript-eslint/ban-ts-comment */

import db from "@/util/firebase";
import { doc, setDoc,collection,getDocs ,updateDoc} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const db_firebase = db;

type TypeRegistroCitas = {
  nombre?: string
  apellido?: string
  correo?: string
  fecha_envio: string,
  hora_actual:string,
  hora_cita:string
  fecha_cita:string,
  sede: string,
  tipo:string,
  estado:string,
  id_estudiante:string
  index:number,
}
type TypeRegistroConsultas = {
  nombre?: string
  apellido?: string
  correo?: string
  fecha_envio: string,
  fecha_consulta: string,
  hora_actual:string,
  hora_consulta:string,
  sede: string,
  motivo:string,
  estado:string,
  id_estudiante:string
  index:number
}

export class AtendidosRepository {
  static async crearCitaAtendida({ registroCitas }: { registroCitas: TypeRegistroCitas }) {

    const customIdRecourt = uuidv4().slice(0, 9);
      // Crear una referencia de documento con el ID generado manualmente
      const docRef = doc(db_firebase, "citas_atendidas", customIdRecourt); // Guardar el documento en la colección 'estudiantes' con el ID personalizado
      // Guardar el documento en Firestore con el ID personalizado
      await setDoc(docRef, { ...registroCitas });
      return {
        messages: { error: "cita atendida" },
      }
  }
  static async crearConsultaAtendida({ registroConsultas }: { registroConsultas: TypeRegistroConsultas }) {


    const customIdRecourt = uuidv4().slice(0, 9);
      // Crear una referencia de documento con el ID generado manualmente
      const docRef = doc(db_firebase, "consultas_atendidas", customIdRecourt); // Guardar el documento en la colección 'estudiantes' con el ID personalizado
      // Guardar el documento en Firestore con el ID personalizado
      await setDoc(docRef, { ...registroConsultas });
      return {
        messages: { error: "consulta atendida" },
      }
  }


 
  static async obtenerTodasLasCitasAtendidas() {
    const citasRef = collection(db_firebase, "citas_atendidas");
    const querySnapshot = await getDocs(citasRef);
    
    const citas = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return citas;
  }

  static async obtenerTodasLasConsultasAtendidas() {
    const citasRef = collection(db_firebase, "consultas_atendidas");
    const querySnapshot = await getDocs(citasRef);
    
    const consultas = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return consultas;

  }

  static async actualizarCitaAtendida(id: string, datosActualizados: Partial<TypeRegistroCitas>) {
    const docRef = doc(db_firebase, "citas_atendidas", id);
    
    await updateDoc(docRef, datosActualizados);
    
    return { messages: "Cita atendida actualizada con éxito" };
  }
  static async actualizarConsultaAtendida(id: string, datosActualizados: Partial<TypeRegistroCitas>) {
    const docRef = doc(db_firebase, "consultas_atendidas", id);
    
    await updateDoc(docRef, datosActualizados);
    
    return { messages: "Consulta atendida actualizada con éxito" };
  }

}
