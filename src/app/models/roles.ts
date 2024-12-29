import estudiantes from "../schema/estudiante.json";
import trabajadores from "../schema/trabajadores.json";

// Modelo Roles
export class RolesModelos {
  static async getById({ customId, user }: { customId: string; user: string }) {
    if (user === "estudiante") {
      // si el customId es estudiante
      if (/^edu-/.test(customId)) {
        const estudiante = estudiantes.find(
          (estudiante) => estudiante.customId === customId
        );
        if (!estudiante) {
          // console.error(`Estudiante con customId ${customId} no encontrado`);
          return {
            login: true,
            usuario: estudiante,
            message: "Credenciales ingresados están invalidadas",
            rol: "ninguno",
          }; // O lanza un error si prefieres
        }
        const estudianteComplete = {
          ...estudiante,
          rol: "estudiante",
        };
        return {
          login: false,
          usuario: estudianteComplete,
          message: "login iniciado",
          rol: "estudiante",
        };
      } else {
        // console.error(`Estudiante con customId ${customId} no encontrado`);
        return {
          login: true,
          usuario: "ninguno",
          message: "Credenciales ingresados están invalidadas ",
          rol: "ninguno",
        }; // O lanza un error si prefieres
      }
    } else if (user === "trabajador") {
      // si el customId es estudiante
      if (/^per-/.test(customId)) {
        const trabajador = trabajadores.find(
          (trabajador) => trabajador.customId === customId
        );
        if (!trabajador) {
          // console.error(`Estudiante con customId ${customId} no encontrado`);
          return {
            login: true,
            usuario: trabajador,
            message: "Credenciales ingresados están invalidadas ",
            rol: "ninguno",
          }; // O lanza un error si prefieres
        }
        const trabajadorComplete = {
          ...trabajador,
          rol: "trabajador",
        };
        return {
          login: false,
          usuario: trabajadorComplete,
          message: "login iniciado",
          rol: "trabajador",
        };
      } else {
        // console.error(`Estudiante con customId ${customId} no encontrado`);
        return {
          login: true,
          usuario: "ninguno",
          message: "Credenciales ingresados están invalidadas ",
          rol: "ninguno",
        }; // O lanza un error si prefieres
      }
    } else {
      return {
        login: true,
        usuario: "ninguno",
        message: "Credenciales ingresados están invalidadas ",
        rol: "ninguno",
      }; // O lanza un error si prefieres
    }
  }
  // static async getValidateCheck({
  //   customIdRole,
  //   checkLogin,
  // }: {
  //   customIdRole: string;
  //   checkLogin: string;
  // }) {
  //   if (checkLogin === "Estudiante") {
  //     if (/^per-/.test(customIdRole)) {
  //       return {
  //         loginRole: false,
  //         messageRole: "El id ingresado no pertenece a un estudiante, sino a un trabajador.",
  //       };
  //     } else {
  //       return {
  //         loginRole: true,
  //         messageRole: "El id ingresado pertenece a un estudiante.",
  //       };
  //     }
  //   } else if (checkLogin === "Trabajador") {
  //     else if (/^edu-/.test(customIdRole)) {
  //       return {
  //         loginRole: false,
  //         messageRole: "El id ingresado no pertenece a un trabajador, sino a un estudiante.",
  //       };
  //     } else {
  //       return {
  //         loginRole: true,
  //         messageRole: "El id ingresado pertenece a un trabajador.",
  //       };
  //     }
  //   }

  //   // Retorno por defecto si el valor de checkLogin no es ni "estudiante" ni "trabajador"
  //   return {
  //     loginRole: false,
  //     messageRole: "Tipo de login no válido.",
  //   };
  // }
}
