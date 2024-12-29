import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

// METODO DE ESTUDIANTE
export function GET(request:NextRequest){
    try {
        // Obtener la cookie "myToken"
        const myToken = request.cookies.get('access_token')?.value;
    
        // Si no existe la cookie
        if (!myToken) {
          return NextResponse.json({ message: 'Token no encontrado' }, { status: 401 });
        }
    
        // Verificar el token usando tu clave secreta
        // Verificar el token usando tu clave secreta
        const decoded = jwt.verify(myToken, 'your-secret-key');

        // Extraer customId del payload decodificado
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const { ...usuario } = decoded;   
        return NextResponse.json({
          usuario
        });
    
      } catch (error) {
        console.error('Error al verificar el token:', error);
        return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
      }

}