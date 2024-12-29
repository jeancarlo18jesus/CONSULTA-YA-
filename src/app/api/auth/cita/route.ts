/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CitasRepository } from '@/app/models/entity/CitasRepository';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const citas = await CitasRepository.obtenerTodasLasCitas();
    return NextResponse.json(citas, { status: 200 });
  } 
  catch (error) {
    return NextResponse.json({ message: `Error al obtener las citas ${error}` }, { status: 500 });
  }
}

// export async function POST(req: Request) {
//     try {
//       const body = await req.json();
//       const nuevaCita = await CitasRepository.crearCita({ registroCitas: body });
//       return NextResponse.json(nuevaCita, { status: 201 });
//     } catch (error) {
//       return NextResponse.json({ message: 'Error al crear la cita' }, { status: 500 });
//     }
//   }