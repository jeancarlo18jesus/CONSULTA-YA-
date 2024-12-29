

// middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  // Verifica si el usuario tiene un token
  if (token) {
    try {
      // Intenta verificar el token usando tu clave secreta
      await jwtVerify(token, new TextEncoder().encode('your-secret-key'));

      // Si el usuario está autenticado y está intentando acceder a la página de login
      if (request.nextUrl.pathname === '/login/estudiante') {
        return NextResponse.redirect(new URL('/edu', request.url));
      }
      if (request.nextUrl.pathname === '/login/trabajador') {
        return NextResponse.redirect(new URL('/per', request.url));
      }
      
    } catch (error) {
      // Token inválido o expirado
      console.error('Token inválido o expirado:', error);
      return NextResponse.redirect(new URL('/role', request.url));
    }
  }else{
      // Si no hay token y la ruta es protegida
    if (!token && request.nextUrl.pathname.startsWith('/edu')) {
      return NextResponse.redirect(new URL('/role', request.url));
    }
    if (!token && request.nextUrl.pathname.startsWith('/per')) {
      return NextResponse.redirect(new URL('/role', request.url));
    }
    return NextResponse.next();
  }

  
}

// Define las rutas donde se aplicará el middleware
export const config = {
  matcher: ['/edu/:path*', '/edu', '/per', '/per/:path*'], // Aplica el middleware a las rutas protegidas
};