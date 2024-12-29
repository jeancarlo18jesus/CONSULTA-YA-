/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import db from "@/util/firebase";
import { doc, setDoc,getDoc,collection,getDocs , deleteDoc,updateDoc} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import estudiantes from '../../schema/estudiante.json'
const db_firebase = db;

type TypeRegistro = {
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


export class ConsultasRepository {
  static async crearConsulta({ registroConsultas}: { registroConsultas: TypeRegistro }) {
      // Generar un ID de manera personalizada
      const customIdRecourt = uuidv4().slice(0, 9);
      
      // Agregar el nombre, correo y apellido de acuerdo al id_estudiante de registro de Citas como un find
      //@ts-ignore
      const {nombre, apellido, correo, ...estudiante} = await estudiantes.find(estudiante => estudiante.customId === registroConsultas.id_estudiante);
      
      // Asignar el nombre, correo y apellido al registro de Citas
      
      // Asignar el nombre, correo y apellido al registro de Citas

      // Crear una referencia de documento con el ID generado manualmente
      const docRef = doc(db_firebase, "consultas_general", customIdRecourt); // Guardar el documento en la colección 'estudiantes' con el ID personalizado
      // Guardar el documento en Firestore con el ID personalizado
      await setDoc(docRef, { ...registroConsultas,nombre: nombre, apellido:apellido, correo:correo });
      return {
        message: { error: "consulta insertado" },
      }
  }
  static async obtenerConsultaPorId(id: string) {
    const docRef = doc(db_firebase, "consultas_general", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return { message: "No se encontró la consulta" };
    }
  }
  static async obtenerConsultasEstudiante(id: string) {
    const docRef = doc(db_firebase, "consultas_general", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return { message: "No se encontró la consulta" };
    }
  }
  static async obtenerCantidadTotalConsultas() {
    const citasRef = collection(db_firebase, "consultas_general");
    const querySnapshot = await getDocs(citasRef);
    
    // Obtener el length del querySnapshot
    const totalConsultas = querySnapshot.size; // El tamaño de los documentos
    
    // Mapear los documentos a un array de objetos
    const citas = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Puedes retornar las citas y el total, según lo que necesites
    return { citas, totalConsultas };
  }
  static async obtenerTodasLasConsultas() {
    const consultaRef = collection(db_firebase, "consultas_general");
    const querySnapshot = await getDocs(consultaRef);
    
    const consultas = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return consultas;
  }
  static async eliminarConsulta(id: string) {
    const docRef = doc(db_firebase, "consultas_general", id);
    
    await deleteDoc(docRef);
    
    return { message: "Consulta eliminada con éxito" };
  }

  static async actualizarConsulta(id: string, datosActualizados: Partial<TypeRegistro>) {
    const docRef = doc(db_firebase, "consultas_general", id);
    
    await updateDoc(docRef, datosActualizados);
    
    return { message: "Consulta actualizada con éxito" };
  }
}
