import { ConsultasRepository } from '@/app/models/entity/ConsultasRepository';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const citas = await ConsultasRepository.obtenerTodasLasConsultas();
    return NextResponse.json(citas, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error al obtener las citas' ,error: error}, { status: 500 });
  }
}