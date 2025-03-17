'use client';
import { HeaderPageComponent } from '@/components/header-page';
import React from 'react';
import { PersonalInfoForm } from '@/components/forms/person-form';
import dayjs from 'dayjs';
const NewUserPage = () => {
  return (
    <div>
      <HeaderPageComponent title='Nueva persona' />
      <PersonalInfoForm
        onSubmit={() => {}}
        initialData={{
          nombre: 'Juan',
          primerApellido: 'Perez',
          segundoApellido: 'Gomez',
          fechaNacimiento: dayjs('2025-01-01', 'yyyy-MM-dd').format(
            'YYYY-MM-DD'
          ),
          sexo: '1',
          paisNacimiento: '142',
          estadoNacimiento: '1',
          curp: '',
        }}
      />
    </div>
  );
};

export default NewUserPage;
