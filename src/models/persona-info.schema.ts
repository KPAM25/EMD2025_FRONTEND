import { z } from 'zod';

export const personalInfoSchema = z.object({
  nombre: z.string().min(1, { message: 'El nombre es requerido' }),
  primerApellido: z
    .string()
    .min(1, { message: 'El primer apellido es requerido' }),
  segundoApellido: z
    .string()
    .min(1, { message: 'El segundo apellido es requerido' }),
  fechaNacimiento: z
    .string()
    .min(1, { message: 'La fecha de nacimiento es requerida' }),
  sexo: z.string().min(1, { message: 'El sexo es requerido' }),
  paisNacimiento: z
    .string()
    .min(1, { message: 'El país de nacimiento es requerido' }),
  estadoNacimiento: z
    .string()
    .min(1, { message: 'El estado de nacimiento es requerido' }),
  curp: z.string().min(1, { message: 'El CURP es requerido' }),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
