import z from "zod";

// creacion de la validacion del id tiene 9 caracteres
const RolSchemeId = z.object({
  customId: z
    .string()
    .transform((val) => val.trim()) // Primero aplica trim
    .refine((val) => val.length === 9, {
      // Luego valida la longitud
      message: "El custom debe tener 9 caracteres",
    }), // Asumiendo que el teléfono en Perú tiene 9 dígitos
});

export function ValidamosRolId(object) {
  return RolSchemeId.safeParse(object);
}