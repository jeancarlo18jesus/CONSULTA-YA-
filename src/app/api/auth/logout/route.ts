import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    // Obtener la cookie "access_token"
    const myToken = request.cookies.get('access_token')?.value;

    // Si no existe la cookie
    if (!myToken) {
      return NextResponse.json({ message: 'Token no encontrado' }, { status: 401 });
    }

    // Verificar el token usando tu clave secreta
    try {
      jwt.verify(myToken, 'your-secret-key');

      // Crear la respuesta y eliminar la cookie 'access_token'
      const response = NextResponse.json({ message: 'Sesión cerrada' }, { status: 200 });
      
      // Configurar la cookie para eliminarla
      response.cookies.set('access_token', '', {
        httpOnly: true,
        maxAge: 0, // Eliminar la cookie inmediatamente
        secure: process.env.SESSION_SECRET === 'production',
        sameSite: 'strict',
        path: '/', // Asegúrate de establecer el path
      });

      return response;
    } catch (error) {
      console.error('Error al verificar el token:', error);
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

  } catch (error) {
    console.error('Error en el manejo de la solicitud:', error);
    return NextResponse.json({ error: 'Error en la solicitud' }, { status: 500 });
  }
}
