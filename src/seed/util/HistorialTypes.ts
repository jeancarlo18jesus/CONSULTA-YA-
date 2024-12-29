export type Cita = {
  id:string
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
  };
export type Consulta = {
  id:string
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
  
export type EstudianteType = {
      id: string;
      customId: string;
      nombre: string;
      apellido: string;
      correo: string;
      dni: string;
      carrera: string;
      ciclo: string;
      sede: string;
      turno: string;
      telefono: string;
    }