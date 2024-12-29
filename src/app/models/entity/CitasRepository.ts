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
    hora_actual:string,
    hora_cita:string
    fecha_cita:string,
    sede: string,
    tipo:string,
    estado:string,
    id_estudiante:string
    index:number,
}


export class CitasRepository {
  static async crearCita({ registroCitas }: { registroCitas: TypeRegistro }) {
      // Generar un ID de manera personalizada
      const customIdRecourt = uuidv4().slice(0, 9);
      // Agregar el nombre, correo y apellido de acuerdo al id_estudiante de registro de Citas como un find
      //@ts-ignore
      const {nombre, apellido, correo, ...estudiante} = await estudiantes.find(estudiante => estudiante.customId === registroCitas.id_estudiante);
      
      // Asignar el nombre, correo y apellido al registro de Citas


      // Crear una referencia de documento con el ID generado manualmente
      const docRef = doc(db_firebase, "citas_general", customIdRecourt); // Guardar el documento en la colección 'estudiantes' con el ID personalizado
      // Guardar el documento en Firestore con el ID personalizado
      await setDoc(docRef, { ...registroCitas,nombre: nombre,apellido:apellido,correo:correo });
      return {
        message: { error: "cita insertado" },
      }
  }
  static async obtenerCitaPorId(id: string) {
    const docRef = doc(db_firebase, "citas_general", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return { message: "No se encontró la cita" };
    }
  }
  static async obtenerCitasEstudiante({customId}: {customId:string}) {
    const citasRef = collection(db_firebase, "citas_general");
    const querySnapshot = await getDocs(citasRef);
    
    const citas = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    // @ts-ignore
    return citas.filter(cita => cita.id_estudiante === customId);
  }
  static async obtenerTodasLasCitas() {
    const citasRef = collection(db_firebase, "citas_general");
    const querySnapshot = await getDocs(citasRef);
    
    const citas = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return citas;
  }
  static async obtenerCantidadTotalCitas() {
    const citasRef = collection(db_firebase, "citas_general");
    const querySnapshot = await getDocs(citasRef);
    
    // Obtener el length del querySnapshot
    const totalCitas = querySnapshot.size; // El tamaño de los documentos
    
    // Mapear los documentos a un array de objetos
    const citas = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Puedes retornar las citas y el total, según lo que necesites
    return { citas, totalCitas };
  }
  static async eliminarCita(id: string) {
    const docRef = doc(db_firebase, "citas_general", id);
    
    await deleteDoc(docRef);
    
    return { message: "Cita eliminada con éxito" };
  }

  static async actualizarCita(id: string, datosActualizados: Partial<TypeRegistro>) {
    const docRef = doc(db_firebase, "citas_general", id);
    
    await updateDoc(docRef, datosActualizados);
    
    return { message: "Cita actualizada con éxito" };
  }

}
