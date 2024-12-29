import { RolSchemeId } from '@/app/lib/definitions'
import axios from 'axios'
import { RolesModelos } from '../models/roles'


export async function IniciarSesion(state:string, formData: FormData) {
  // Validamos si el id insertado tiene  9 caracteres
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // mapear si el customId esta vacio me saldira un error diciendo campo vacio
  if (!formData.get('customId')) {
    return {
      errors: "El ID no puede estar vacío.",
      validate: false
    }
  }

 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  const validatedFields = RolSchemeId.safeParse({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    customId: formData.get('customId').trim(), // quita los espacios
  })
  if (!validatedFields.success) {
    return {
      // errors: "Credenciales ingresados están invalidadas ",
      errors: "Credenciales ingresados están invalidadas",
      validate: false
    }
  }
  /// verificar si el usuario dice ser 
  const typeUser = formData.get('user')

  const customIdBuscado = validatedFields.data
  
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
  const {login, usuario, message, rol} = await RolesModelos.getById({customId:customIdBuscado.customId, user: typeUser}) // validamos al usuario que es
  // si el login es true entra aca y si es false no entra y el usuario se loquega
  if(login){  
    return {
      errors: message,
      validate: false // retornamos el mensaje si el id es invalido
    }
  }
  else{
    const response = await axios.post(`/api/auth/login`, usuario)
  if(response.status === 200) {
    if(rol === "estudiante"){
        window.location.pathname = '/edu' // habilitar despues
        return {errors: message , validate: true}
    }
    window.location.pathname = '/per'
    return {errors: message , validate: true}
  }else{
    return {
      message: 'Error al iniciar sesión',
    }
  }
  }
}