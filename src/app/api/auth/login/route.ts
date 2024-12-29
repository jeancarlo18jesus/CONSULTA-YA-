import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, customId , ...usuario  } = body;
    // Aquí debes asegurarte de usar una clave secreta válida para el JWT
    const secretKey = 'your-secret-key'; // Usa una clave fuerte
    const token = jwt.sign(
        { ...usuario },
        secretKey,
        { expiresIn: '2h' } // Expira en 30 días
      );
    // Crear la respuesta
    const response = NextResponse.json({ usuario });
    // Configurar la cookie en la respuesta
    response.cookies.set({
      name: "access_token",
      value: token,  
      // no quiere lectura en el token en la clave 
      httpOnly: false, // si queremos leer la clave
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 días en segundos
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',  
    });

    return response;

  } catch (error) {
    console.error('Error en el login:', error);
    return NextResponse.json({ error: 'Error al iniciar sesión' }, { status: 500 });
  }
}
