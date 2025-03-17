'use client';
import React from 'react';
import { ZodForm } from './form-provider';
import { InputField } from './input-field';
import { ComboboxField } from './combobox-form';
import { Button } from '../ui/button';

import {
  PAIS_CATALOGO,
  ENTIDAD_FEDERATIVA_CATALOGO,
  SEXO_CATALOG,
} from '@/constants/catalogs';
import { getCatalogOptions } from '@/helpers/catalogs';
import { PersonalInfo, personalInfoSchema } from '@/models/persona-info.schema';

interface PersonalInfoFormProps {
  onSubmit: (data: PersonalInfo) => void;
  initialData?: Partial<PersonalInfo>;
  submitButtonText?: string;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  onSubmit,
  initialData,
  submitButtonText = 'Guardar',
}) => {
  // Transformar fecha inicial si existe
  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : undefined;

  return (
    <ZodForm
      schema={personalInfoSchema}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      className='space-y-4'
    >
      <div className=''>
        <InputField
          name='nombre'
          label='Nombre'
          inputProps={{ placeholder: 'Ingrese nombre(s)' }}
        />

        <InputField
          name='primerApellido'
          label='Primer Apellido'
          inputProps={{ placeholder: 'Ingrese primer apellido' }}
        />

        <InputField
          name='segundoApellido'
          label='Segundo Apellido'
          inputProps={{ placeholder: 'Ingrese segundo apellido' }}
        />

        <InputField
          name='fechaNacimiento'
          label='Fecha de Nacimiento'
          inputProps={{
            type: 'date',
            max: new Date().toISOString().split('T')[0],
          }}
        />

        <ComboboxField
          name='sexo'
          label='Sexo'
          options={getCatalogOptions(SEXO_CATALOG)}
          placeholder='Seleccione el sexo'
        />

        <ComboboxField
          name='paisNacimiento'
          label='País de Nacimiento'
          options={getCatalogOptions(PAIS_CATALOGO)}
          placeholder='Seleccione el país'
        />

        <ComboboxField
          name='estadoNacimiento'
          label='Estado de Nacimiento'
          options={getCatalogOptions(ENTIDAD_FEDERATIVA_CATALOGO)}
          placeholder='Seleccione el estado'
        />

        <InputField
          name='curp'
          label='CURP'
          inputProps={{
            placeholder: 'Ingrese CURP',
            maxLength: 18,
            pattern: '[A-Z0-9]+',
            className: 'uppercase',
          }}
        />
      </div>

      <div className='flex justify-end mt-6'>
        <Button type='submit'>{submitButtonText}</Button>
      </div>
    </ZodForm>
  );
};
