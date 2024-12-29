import { AtendidosRepository } from '@/app/models/entity/AtendidosRepositoty';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const consultas = await AtendidosRepository.obtenerTodasLasConsultasAtendidas();
    return NextResponse.json(consultas, { status: 200 });
  } 
  catch (error) {
    return NextResponse.json({ message: `Error al obtener las citas ${error}` }, { status: 500 });
  }
}