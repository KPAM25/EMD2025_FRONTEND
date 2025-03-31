'use client';

import { HeaderPageComponent } from '@/components/header-page';
import { UserListTable } from '@/features/users/components/UserListTable';
import { columns } from '@/features/users/components/UserListTableColumns';
import { User } from '@/features/users/interfaces/user';
import { Persona } from '@/features/users/interfaces/persona';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

const UsersPage = () => {
  const { data: personas, isLoading } = useQuery<Persona[]>({
    queryKey: ['personas'],
    queryFn: async () => {
      const response = await api.get('/persona/getAllEstatus/1');
      return response.data;
    },
  });

  const data: User[] = personas?.map((persona) => ({
    id: persona.idPersona.toString(),
    tipoPersonal: 'Nuevo',
    fullname: `${persona.nombresPersona} ${persona.primerApellidoPersona} ${persona.segundoApellidoPersona || ''}`,
    curp: persona.curpPersona,
    birthday: new Date(persona.fechaNacimientoPersona),
  })) || [];

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <HeaderPageComponent title='Lista de usuarios' />
      <div>
        <UserListTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default UsersPage;
