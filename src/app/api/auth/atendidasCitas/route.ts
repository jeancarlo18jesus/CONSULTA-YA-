import { AtendidosRepository } from '@/app/models/entity/AtendidosRepositoty';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const citas = await AtendidosRepository.obtenerTodasLasCitasAtendidas();
    return NextResponse.json(citas, { status: 200 });
  } 
  catch (error) {
    return NextResponse.json({ message: `Error al obtener las citas ${error}` }, { status: 500 });
  }
}