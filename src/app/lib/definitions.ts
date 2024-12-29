import axios from 'axios';
import { parseCookies } from 'nookies';
import { z } from 'zod'
 

export const RolSchemeId = z.object({
    customId: z.string().length(9, "El id  debe tener 9 caracteres").transform((val) => val.trim()), // Asumiendo que el teléfono en Perú tiene 9 dígitos
  });


export const getRoleValidateEstudiante = () => {
  const getPerfil = async () => {
    const response = await axios.get("/api/roles");
    // si el rol no es de edu manda a per
    if (response.data.usuario.rol !== "estudiante") {
      window.location.pathname = "/per";
    }
  };
  getPerfil();
}

export const getRoleValidateTrabajador = () => {
  const getPerfil = async () => {
    const response = await axios.get("/api/roles");
    // si el rol no es de edu manda a per
    if (response.data.usuario.rol !== "trabajador") {
      window.location.pathname = "/edu";
    }
  };
  getPerfil();
}

export const getLogout = async () =>{
  try{
    await axios.post('/api/auth/logout')
    window.location.pathname = '/role'

  }catch {
  }
}

export const getRoleValidate = async () => {
  const cookies = parseCookies();
    const token = cookies.access_token;

    if (token) {
        const response = await axios.get('/api/roles')
        // si el rol no es de edu manda a per
        if(response.data.usuario.rol !== "estudiante"){
          window.location.pathname = '/per';
        }else{
          window.location.pathname = '/edu';
        }
    } else {
      console.log('No hay token, puede iniciar sesión.');
    }
}