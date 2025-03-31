import { z } from 'zod';
import dayjs from 'dayjs';

// Funciones auxiliares para validaciones
export const soloTextoProcesador = (value: string) => {
  // Eliminar caracteres no alfabéticos (excepto espacios, acentos, ñ y guiones para nombres compuestos)
  const valueWithoutNumbers = value.replace(/\d/g, '');
  return valueWithoutNumbers
    .toUpperCase()
    .replace(
      /[^A-ZÁÉÍÓÚÜÑÄËÏÖÜàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ \-]/g,
      ''
    )
    .replace(/\s{2,}/g, ' ') // Mantiene un solo espacio cuando hay múltiples
    .replace(/\-{2,}/g, '-'); // Mantiene un solo guión cuando hay múltiples
};

// Cálculo de fecha mínima según tipo
export const obtenerFechaMinima = (
  tipoPerson: 'usuario' | 'paciente'
): Date => {
  const hoy = dayjs();
  const maxAnios = tipoPerson === 'usuario' ? 90 : 120;

  return hoy.subtract(maxAnios, 'year').toDate();
};

// Cálculo de edad mínima para usuarios (18 años)
export const validarEdadMinimaPaciente = (
  fechaNacimiento: string,
  tipoPerson?: string
): boolean => {
  if (tipoPerson !== 'usuario') return true;

  const fechaNac = dayjs(fechaNacimiento);
  const hoy = dayjs();

  // Calcular edad usando dayjs
  const edad = hoy.diff(fechaNac, 'year');

  return edad >= 18;
};

export const personalInfoSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: 'El nombre es requerido' })
    .transform(soloTextoProcesador)
    .refine((val) => val.length > 0, {
      message: 'El nombre debe contener al menos un carácter alfabético',
    }),

  primerApellido: z
    .string()
    .min(1, { message: 'El primer apellido es requerido' })
    .transform(soloTextoProcesador)
    .refine((val) => val.length > 0, {
      message:
        'El primer apellido debe contener al menos un carácter alfabético',
    }),

  segundoApellido: z.string().transform(soloTextoProcesador),

  fechaNacimiento: z
    .string()
    .min(1, { message: 'La fecha de nacimiento es requerida' })
    .refine(
      (fecha) => {
        const fechaIngresada = dayjs(fecha);
        const hoy = dayjs();

        return (
          (fechaIngresada.isValid() && fechaIngresada.isBefore(hoy)) ||
          fechaIngresada.isSame(hoy)
        );
      },
      {
        message: 'La fecha de nacimiento no puede ser mayor a la fecha actual',
      }
    ),

  sexo: z.string().min(1, { message: 'El sexo es requerido' }),

  paisNacimiento: z
    .string()
    .min(1, { message: 'El país de nacimiento es requerido' }),

  estadoNacimiento: z
    .string()
    .min(1, { message: 'El estado de nacimiento es requerido' }),

  curp: z
    .string()
    .min(1, { message: 'El CURP es requerido' })
    .transform((val) => val.toUpperCase()),
});

// Esquema extendido que incluye validaciones adicionales basadas en el tipo de persona
export const personalInfoSchemaConTipo = personalInfoSchema
  .extend({
    tipoPerson: z.enum(['usuario', 'paciente']).default('usuario'),
  })
  .superRefine((data, ctx) => {
    // Validación de edad mínima para usuarios (18 años)
    if (data.tipoPerson === 'usuario') {
      const esMayorDe18 = validarEdadMinimaPaciente(
        data.fechaNacimiento,
        data.tipoPerson
      );
      if (!esMayorDe18) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Los usuarios deben ser mayores de 18 años',
          path: ['fechaNacimiento'],
        });
      }
    }

    // Validación de fecha mínima según tipo de persona
    const fechaNac = dayjs(data.fechaNacimiento);
    const fechaMinima = obtenerFechaMinima(data.tipoPerson);

    if (fechaNac.isBefore(dayjs(fechaMinima))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `La fecha de nacimiento no puede ser anterior a ${dayjs(fechaMinima).format('YYYY')} (${
          data.tipoPerson === 'usuario' ? '90' : '120'
        } años)`,
        path: ['fechaNacimiento'],
      });
    }
  });

// Esquema extendido con campos adicionales para expediente
export const expedientePersonalInfoSchema = z
  .object({
    // Campos del personalInfoSchema
    nombre: personalInfoSchema.shape.nombre,
    primerApellido: personalInfoSchema.shape.primerApellido,
    segundoApellido: personalInfoSchema.shape.segundoApellido,
    fechaNacimiento: personalInfoSchema.shape.fechaNacimiento,
    sexo: personalInfoSchema.shape.sexo,
    paisNacimiento: personalInfoSchema.shape.paisNacimiento,
    estadoNacimiento: personalInfoSchema.shape.estadoNacimiento,
    curp: personalInfoSchema.shape.curp,

    // Campo de tipo de persona
    tipoPerson: z.enum(['usuario', 'paciente']).default('usuario'),

    // Campos adicionales de expediente
    numeroPaciente: z.string().optional(),
    tipoSangre: z.string().optional(),
    esDesconocido: z.boolean().default(false).optional(),
  })
  .superRefine((data, ctx) => {
    // Validación de edad mínima para usuarios (18 años)
    if (data.tipoPerson === 'usuario') {
      const esMayorDe18 = validarEdadMinimaPaciente(
        data.fechaNacimiento,
        data.tipoPerson
      );
      if (!esMayorDe18) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Los usuarios deben ser mayores de 18 años',
          path: ['fechaNacimiento'],
        });
      }
    }

    // Validación de fecha mínima según tipo de persona
    const fechaNac = dayjs(data.fechaNacimiento);
    const fechaMinima = obtenerFechaMinima(data.tipoPerson);

    if (fechaNac.isBefore(dayjs(fechaMinima))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `La fecha de nacimiento no puede ser anterior a ${dayjs(fechaMinima).format('YYYY')} (${
          data.tipoPerson === 'usuario' ? '90' : '120'
        } años)`,
        path: ['fechaNacimiento'],
      });
    }
  });

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type PersonalInfoConTipo = z.infer<typeof personalInfoSchemaConTipo>;
export type ExpedientePersonalInfo = z.infer<
  typeof expedientePersonalInfoSchema
>;
