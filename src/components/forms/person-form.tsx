'use client';
import React, { useEffect, useMemo, KeyboardEvent, ChangeEvent } from 'react';
import { InputField } from './input-field';
import { ComboboxField } from './combobox-form';
import { Button } from '../ui/button';
import {
  ENTIDAD_FEDERATIVA_CATALOGO,
  SEXO_CATALOG,
} from '@/constants/catalogs';
import { getCatalogOptions } from '@/helpers/catalogs';
import { useForm, FormProvider } from 'react-hook-form';
import dayjs from 'dayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/components/ui/checkbox';
import useCurpBuilder from '@/hooks/curpBuilder';
import { evaluateBadWords } from '@/helpers/curp';
import { ExpedientePersonalInfo, expedientePersonalInfoSchema, obtenerFechaMinima, soloTextoProcesador } from '@/models/persona-info.schema';
import { usePaises } from '@/hooks/usePaises';
import { useEntidades } from '@/hooks/useEntidades';
import { useSexos } from '@/hooks/useSexos';

/**
 * Componente de formulario para información personal, que puede incluir campos de expediente.
 * Utiliza validaciones de Zod definidas en personal-info.schema.ts
 */
interface PersonalInfoFormProps {
  initialData?: Partial<ExpedientePersonalInfo>;
  submitButtonText?: string;
  isAddingPersonalSalud?: boolean;
  onSubmit?: (data: ExpedientePersonalInfo) => void;
  mostrarCamposPaciente?: boolean;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  initialData,
  submitButtonText = 'Guardar',
  isAddingPersonalSalud = false,
  onSubmit,
  mostrarCamposPaciente = false,
}) => {
  // Formulario con schema extendido
  const methods = useForm<ExpedientePersonalInfo>({
    resolver: zodResolver(expedientePersonalInfoSchema),
    defaultValues: {
      ...initialData,
      esDesconocido: initialData?.esDesconocido || false,
      tipoPerson: mostrarCamposPaciente ? 'paciente' : 'usuario',
    },
    mode: 'onChange', // Validar mientras el usuario escribe
  });

  const { setValue, watch, reset } = methods;
  const esDesconocido = watch('esDesconocido');
  const tipoPerson = watch('tipoPerson');

  // Calcular las fechas límite para el campo de fecha de nacimiento usando dayjs
  const fechaActual = dayjs();
  const maxFecha = fechaActual.format('YYYY-MM-DD'); // Hoy

  const minFecha = useMemo(() => {
    const currentTipoPerson =
      tipoPerson || (mostrarCamposPaciente ? 'paciente' : 'usuario');
    const fechaMin = obtenerFechaMinima(currentTipoPerson);
    return dayjs(fechaMin).format('YYYY-MM-DD');
  }, [mostrarCamposPaciente, tipoPerson]);

  // Agregar el hook de países
  const { paises, isLoading: paisesLoading, error: paisesError } = usePaises();

  // Obtener el valor actual del país seleccionado
  const paisSeleccionado = watch('paisNacimiento');

  // Agregar el hook de entidades
  const { 
    entidades, 
    isLoading: entidadesLoading, 
    error: entidadesError 
  } = useEntidades(paisSeleccionado);

  // Agregar el hook de sexos
  const { sexos, isLoading: sexosLoading, error: sexosError } = useSexos();

  // Transformar los datos de la API al formato esperado por el ComboboxField
  const paisesOptions = useMemo(() => {
    return paises.map(pais => ({
      id: pais.idPais,
      descripcion: pais.descripcion
    }));
  }, [paises]);

  const entidadesOptions = useMemo(() => {
    return entidades.map(entidad => ({
      id: entidad.catalogKey,
      descripcion: entidad.entidadFederativa,
    }));
  }, [entidades]);

  const sexosOptions = useMemo(() => {
    return sexos.map(sexo => ({
      id: sexo.catalogKey,
      descripcion: sexo.descripcion
    }));
  }, [sexos]);

  // Manejador para cambiar el estado de persona desconocida
  const handleUnknownPerson = () => {
    if (esDesconocido) {
      // Si estaba marcado y ahora se desmarca, resetear el formulario
      reset(initialData || {});
      setValue('esDesconocido', false, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      return;
    }

    // Si no estaba marcado y ahora se marca, llenar con valores predeterminados
    setValue('esDesconocido', true, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    setValue('nombre', 'Paciente', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue('primerApellido', 'Desconocido', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue('segundoApellido', 'XX', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue('sexo', '1', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue('curp', 'XXXX999999XXXXXX99', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    // Establecer fecha de nacimiento predeterminada (actual)
    setValue('fechaNacimiento', dayjs().format('YYYY-MM-DD'), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    // Si se muestran campos de paciente, establecer también sus valores predeterminados
    if (mostrarCamposPaciente) {
      setValue('numeroPaciente', 'DESC-' + Date.now().toString().slice(-6), {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue('tipoSangre', 'No especificado', {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  // Manejador para campos de texto (solo letras y mayúsculas)
  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = soloTextoProcesador(e.target.value);
    setValue(e.target.name as keyof ExpedientePersonalInfo, formattedValue, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const formData = watch();

  const curpFormValues = useMemo(
    () => ({
      apellidoPaterno: formData.primerApellido || '',
      apellidoMaterno: formData.segundoApellido || '',
      nombre: formData.nombre || '',
      fechaNacimiento: formData.fechaNacimiento
        ? dayjs(formData.fechaNacimiento).toDate()
        : dayjs().toDate(),
      sexo:
        SEXO_CATALOG.find((sexo) => sexo.id === +formData.sexo)?.descripcion ||
        '',
      estado:
        ENTIDAD_FEDERATIVA_CATALOGO.find(
          (estado) => estado.id === +formData.estadoNacimiento
        )?.abreviatura || '',
    }),
    [
      formData.primerApellido,
      formData.segundoApellido,
      formData.nombre,
      formData.fechaNacimiento,
      formData.sexo,
      formData.estadoNacimiento,
    ]
  );

  const { curp, setFormValues } = useCurpBuilder(curpFormValues);

  // Actualizar el CURP cuando cambie
  useEffect(() => {
    if (curp && !esDesconocido) {
      setFormValues(curpFormValues);
      setValue('curp', curp, { shouldValidate: true });
    }
  }, [curp, setValue, curpFormValues, setFormValues, esDesconocido]);

  // Modificar el manejador de cambio de país
  const handleCountryChange = () => {
    // Limpiar el estado de nacimiento cuando cambie el país
    setValue('estadoNacimiento', '', { shouldValidate: true });
  };

  // Manejar la tecla F9 para la CURP genérica
  const handleCurpKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'F9') {
      e.preventDefault();
      methods.setValue('curp', 'XXXX999999XXXXXX99');
    }
  };

  // Manejar cambio de fecha de nacimiento
  const handleFechaNacimientoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nuevaFecha = e.target.value;
    setValue('fechaNacimiento', nuevaFecha, { shouldValidate: true });
  };

  const handleFormSubmit = (data: ExpedientePersonalInfo) => {
    // Limpiar errores previos
    methods.clearErrors('curp');

    // Si es persona desconocida, aceptar los datos sin validación adicional
    if (data.esDesconocido) {
      onSubmit?.(data);
      return;
    }

    // Para no-desconocido, validar CURP
    const isValid = evaluateCURPs(data.curp, curp, data);
    if (isValid && onSubmit) {
      onSubmit(data);
    }
  };

  // Validación completa de CURP
  const evaluateCURPs = (
    inputCurpValue: string,
    suggestedCurp: string,
    PersonalInfo: ExpedientePersonalInfo
  ): boolean => {
    // Extraer datos necesarios del formulario
    const birthDate = dayjs(PersonalInfo.fechaNacimiento);
    const birthYear = birthDate.year();
    const inputSex = SEXO_CATALOG.find(
      (sexo) => sexo.id === +PersonalInfo.sexo
    )?.descripcion;
    const birthState = ENTIDAD_FEDERATIVA_CATALOGO.find(
      (estado) => estado.id === +PersonalInfo.estadoNacimiento
    )?.abreviatura;
    const country = PersonalInfo.paisNacimiento;
    const seventeenthDigit = inputCurpValue[16];
    const idMexico = '141';

    // Función auxiliar para identificar la CURP genérica
    const isGeneric = inputCurpValue === 'XXXX999999XXXXXX99';

    // Evaluación temprana de la CURP genérica
    if (isGeneric) {
      // Solo validar para personal de salud con país México
      if (isAddingPersonalSalud && country === idMexico) {
        methods.setError('curp', {
          type: 'custom',
          message:
            'El valor por default de la curp no es permitido para personal',
        });
        return false;
      }
      return true;
    }

    // Validación del sexo
    if (inputSex !== 'HOMBRE' && inputSex !== 'MUJER') {
      methods.setError('curp', {
        type: 'custom',
        message: 'El sexo no corresponde a los datos de la CURP ingresada.',
      });
      return false;
    }

    // Validación país/estado
    if (country !== idMexico && inputCurpValue.slice(11, 13) !== 'NE') {
      methods.setError('curp', {
        type: 'custom',
        message:
          'El país de origen no corresponde a los datos de la CURP ingresada.',
      });
      return false;
    }

    // Validación del primer apellido (primeras 2 letras)
    if (inputCurpValue.slice(0, 2) !== suggestedCurp.slice(0, 2)) {
      // Se permite la discrepancia si se debe a la corrección por palabra altisonante
      if (!evaluateBadWords(inputCurpValue.slice(0, 4))) {
        methods.setError('curp', {
          type: 'custom',
          message:
            'Los datos del primer apellido no corresponden a los datos de la CURP ingresada.',
        });
        return false;
      }
    }

    // Validación del segundo apellido (tercer carácter)
    if (inputCurpValue.slice(2, 3) !== suggestedCurp.slice(2, 3)) {
      methods.setError('curp', {
        type: 'custom',
        message:
          'Los datos del segundo apellido no corresponden a los datos de la CURP ingresada.',
      });
      return false;
    }

    // Validación del nombre (cuarto carácter)
    if (inputCurpValue.slice(3, 4) !== suggestedCurp.slice(3, 4)) {
      methods.setError('curp', {
        type: 'custom',
        message:
          'Los datos del nombre no corresponden a los datos de la CURP ingresada.',
      });
      return false;
    }

    // Validación de la fecha de nacimiento (posiciones 4 a 10)
    if (inputCurpValue.slice(4, 10) !== suggestedCurp.slice(4, 10)) {
      methods.setError('curp', {
        type: 'custom',
        message:
          'La fecha de nacimiento no corresponde a los datos de la CURP ingresada.',
      });
      return false;
    }

    // Validación del sexo en la CURP (posición 11, índice 10)
    if (inputCurpValue.slice(10, 11) !== suggestedCurp.slice(10, 11)) {
      methods.setError('curp', {
        type: 'custom',
        message: 'El sexo no corresponde a los datos de la CURP ingresada.',
      });
      return false;
    }

    // Validación del estado (posiciones 11-13)
    if (inputCurpValue.slice(11, 13) !== suggestedCurp.slice(11, 13)) {
      methods.setError('curp', {
        type: 'custom',
        message:
          'El estado de nacimiento no corresponde a los datos de la CURP ingresada.',
      });
      return false;
    }

    // Validación de las consonantes internas (posiciones 13, 14 y 15)
    if (inputCurpValue.slice(13, 14) !== suggestedCurp.slice(13, 14)) {
      methods.setError('curp', {
        type: 'custom',
        message:
          'El carácter número 14 de la CURP no corresponde a los datos ingresados del paciente.',
      });
      return false;
    }
    if (inputCurpValue.slice(14, 15) !== suggestedCurp.slice(14, 15)) {
      methods.setError('curp', {
        type: 'custom',
        message:
          'El carácter número 15 de la CURP no corresponde a los datos ingresados del paciente.',
      });
      return false;
    }
    if (inputCurpValue.slice(15, 16) !== suggestedCurp.slice(15, 16)) {
      methods.setError('curp', {
        type: 'custom',
        message:
          'El carácter número 16 de la CURP no corresponde a los datos ingresados del paciente.',
      });
      return false;
    }

    // Validación del dígito 17 según el año de nacimiento
    if (birthYear < 2000 && !/[0-9]/.test(seventeenthDigit)) {
      methods.setError('curp', {
        type: 'custom',
        message:
          'Para nacimientos antes del año 2000, el dígito 17 debe ser un número entre 0 y 9.',
      });
      return false;
    }
    if (birthYear >= 2000 && !/[A-J]/.test(seventeenthDigit)) {
      methods.setError('curp', {
        type: 'custom',
        message:
          'Para nacimientos después del año 2000, el dígito 17 debe ser letra entre A y J.',
      });
      return false;
    }

    // Validación del dígito 18 (debe ser un número)
    if (!/[0-9]/.test(inputCurpValue[17])) {
      methods.setError('curp', {
        type: 'custom',
        message: 'El dígito 18 debe ser un número.',
      });
      return false;
    }

    // Validaciones adicionales según país y estado
    if (
      country === idMexico &&
      (birthState === 'NA' || birthState === 'SI' || birthState === 'NE') &&
      inputCurpValue !== 'XXXX999999XXXXXX99'
    ) {
      methods.setError('curp', {
        type: 'custom',
        message:
          'El estado ingresado es incorrecto, favor de ingresar curp correcta o la curp genérica.',
      });
      return false;
    }

    if (
      !isAddingPersonalSalud &&
      country === idMexico &&
      birthState === 'NA' &&
      inputCurpValue !== 'XXXX999999XXXXXX99'
    ) {
      methods.setError('curp', {
        type: 'custom',
        message:
          'El dato ingresado es incorrecto (NO ESPECIFICADO), favor de ingresar curp correcta o la curp genérica.',
      });
      return false;
    }

    if (
      !isAddingPersonalSalud &&
      country === idMexico &&
      birthState === 'SI' &&
      inputCurpValue !== 'XXXX999999XXXXXX99'
    ) {
      methods.setError('curp', {
        type: 'custom',
        message:
          'El dato ingresado es incorrecto (SE IGNORA), favor de ingresar curp correcta o la curp genérica.',
      });
      return false;
    }

    // Si ninguna validación falla, la CURP es correcta
    return true;
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className='space-y-6'
      >
        {/* Sección de campos específicos de paciente */}
        {mostrarCamposPaciente && (
          <div className='mb-6'>
            <div className='flex items-start space-x-3 p-4 border rounded-md bg-slate-50 mb-6'>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='esDesconocido'
                  checked={esDesconocido}
                  onCheckedChange={() => handleUnknownPerson()}
                />
                <div className='space-y-1'>
                  <label
                    htmlFor='esDesconocido'
                    className='text-sm font-medium cursor-pointer'
                  >
                    Persona desconocida
                  </label>
                  <p className='text-sm text-muted-foreground'>
                    Marque esta opción si no conoce los datos personales del
                    paciente
                  </p>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
              {/* Campo para número de expediente */}
              <div className='min-h-[90px]'>
                <InputField
                  name='numeroPaciente'
                  label='Número de expediente'
                  inputProps={{
                    placeholder: 'Número de expediente del paciente',
                    disabled: esDesconocido,
                    onChange: handleTextInputChange,
                    className: 'uppercase',
                  }}
                />
              </div>

              {/* Campo para tipo de sangre */}
              <div className='min-h-[90px]'>
                <InputField
                  name='tipoSangre'
                  label='Tipo de sangre'
                  inputProps={{
                    placeholder: 'Tipo de sangre',
                    disabled: esDesconocido,
                    onChange: handleTextInputChange,
                    className: 'uppercase',
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Datos personales - común para todos */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Nombre */}
          <div className='min-h-[90px]'>
            <InputField
              name='nombre'
              label='Nombre'
              inputProps={{
                placeholder: 'Ingrese nombre(s)',
                disabled: esDesconocido,
                onChange: handleTextInputChange,
                className: 'uppercase',
              }}
            />
          </div>

          {/* Primer Apellido */}
          <div className='min-h-[90px]'>
            <InputField
              name='primerApellido'
              label='Primer Apellido'
              inputProps={{
                placeholder: 'Ingrese primer apellido',
                disabled: esDesconocido,
                onChange: handleTextInputChange,
                className: 'uppercase',
              }}
            />
          </div>

          {/* Segundo Apellido */}
          <div className='min-h-[90px]'>
            <InputField
              name='segundoApellido'
              label='Segundo Apellido'
              inputProps={{
                placeholder: 'Ingrese segundo apellido',
                disabled: esDesconocido,
                onChange: handleTextInputChange,
                className: 'uppercase',
              }}
            />
          </div>

          {/* Fecha de Nacimiento */}
          <div className='min-h-[90px]'>
            <InputField
              name='fechaNacimiento'
              label='Fecha de Nacimiento'
              inputProps={{
                type: 'date',
                min: minFecha,
                max: maxFecha,
                disabled: esDesconocido,
                onChange: handleFechaNacimientoChange,
              }}
            />
          </div>

          {/* Sexo */}
          <div className='min-h-[90px]'>
            <ComboboxField
              name='sexo'
              label='Sexo'
              options={getCatalogOptions(sexosOptions)}
              placeholder={sexosLoading ? 'Cargando sexos...' : 'Seleccione el sexo'}
              disabled={esDesconocido || sexosLoading}
            />
            {sexosError && (
              <p className='text-sm text-red-500 mt-1'>
                Error al cargar los sexos: {sexosError}
              </p>
            )}
          </div>

          {/* País de Nacimiento */}
          <div className='min-h-[90px]'>
            <ComboboxField
              name='paisNacimiento'
              label='País de Nacimiento'
              options={getCatalogOptions(paisesOptions)}
              placeholder={paisesLoading ? 'Cargando países...' : 'Seleccione el país'}
              onChange={handleCountryChange}
              disabled={esDesconocido || paisesLoading}
            />
            {paisesError && (
              <p className='text-sm text-red-500 mt-1'>
                Error al cargar los países: {paisesError}
              </p>
            )}
          </div>

          {/* Estado de Nacimiento */}
          <div className='min-h-[90px]'>
            <ComboboxField
              name='estadoNacimiento'
              label='Estado de Nacimiento'
              options={getCatalogOptions(entidadesOptions)}
              placeholder={
                entidadesLoading 
                  ? 'Cargando estados...' 
                  : !paisSeleccionado 
                    ? 'Seleccione primero un país' 
                    : 'Seleccione el estado'
              }
              disabled={esDesconocido || entidadesLoading || !paisSeleccionado}
            />
            {entidadesError && (
              <p className='text-sm text-red-500 mt-1'>
                Error al cargar los estados: {entidadesError}
              </p>
            )}
          </div>

          {/* CURP */}
          <div className='min-h-[90px]'>
            <InputField
              name='curp'
              label='CURP'
              inputProps={{
                placeholder: 'Ingrese CURP',
                maxLength: 18,
                pattern: '[A-Z0-9]+',
                className: 'uppercase',
                onKeyDown: handleCurpKeyDown,
                disabled: esDesconocido,
              }}
            />
            <div className='text-xs text-muted-foreground mt-1'>
              Presione F9 para usar CURP genérica (XXXX999999XXXXXX99)
            </div>
          </div>
        </div>

        <div className='flex justify-end mt-6'>
          <Button type='submit'>{submitButtonText}</Button>
        </div>
      </form>
    </FormProvider>
  );
};
