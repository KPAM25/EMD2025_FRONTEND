import { HeaderPageComponent } from '@/components/header-page';
import { UserListTable } from '@/features/users/components/UserListTable';
import { columns } from '@/features/users/components/UserListTableColumns';
import { User } from '@/features/users/interfaces/user';
import React from 'react';

const UsersPage = () => {
  // Sample data for demonstration
  const data: User[] = [
    {
      id: 'USR001',
      tipoPersonal: 'Administrativo',
      fullname: 'Juan Pérez García',
      curp: 'PEGJ800101HDFRRN09',
      birthday: new Date(1980, 0, 1),
    },
    {
      id: 'USR002',
      tipoPersonal: 'Docente',
      fullname: 'María Rodríguez López',
      curp: 'ROLM850215MDFDRR03',
      birthday: new Date(1985, 1, 15),
    },
    {
      id: 'USR003',
      tipoPersonal: 'Directivo',
      fullname: 'Carlos Sánchez Martínez',
      curp: 'SAMC790530HDFNRR07',
      birthday: new Date(1979, 4, 30),
    },
    {
      id: 'USR004',
      tipoPersonal: 'Administrativo',
      fullname: 'Ana González Flores',
      curp: 'GOFA830712MDFNLN01',
      birthday: new Date(1983, 6, 12),
    },
    {
      id: 'USR005',
      tipoPersonal: 'Docente',
      fullname: 'Roberto Torres Vega',
      curp: 'TOVR760925HDFRGB08',
      birthday: new Date(1976, 8, 25),
    },
    {
      id: 'USR006',
      tipoPersonal: 'Administrativo',
      fullname: 'Laura Ramírez Castro',
      curp: 'RACL900308MDFMSR02',
      birthday: new Date(1990, 2, 8),
    },
    {
      id: 'USR007',
      tipoPersonal: 'Docente',
      fullname: 'Miguel Hernández Díaz',
      curp: 'HEDM881117HDFRZG04',
      birthday: new Date(1988, 10, 17),
    },
    {
      id: 'USR008',
      tipoPersonal: 'Directivo',
      fullname: 'Patricia Morales Vargas',
      curp: 'MOVP720605MDFRRR06',
      birthday: new Date(1972, 5, 5),
    },
    {
      id: 'USR009',
      tipoPersonal: 'Administrativo',
      fullname: 'Fernando López Mendoza',
      curp: 'LOMF810420HDFPNR05',
      birthday: new Date(1981, 3, 20),
    },
    {
      id: 'USR010',
      tipoPersonal: 'Docente',
      fullname: 'Silvia Ortiz Jiménez',
      curp: 'OIJS770214MDFRMV00',
      birthday: new Date(1977, 1, 14),
    },
    {
      id: 'USR011',
      tipoPersonal: 'Administrativo',
      fullname: 'Javier Reyes Guzmán',
      curp: 'REGJ930712HDFYZV01',
      birthday: new Date(1993, 6, 12),
    },
    {
      id: 'USR012',
      tipoPersonal: 'Docente',
      fullname: 'Carmen Flores Medina',
      curp: 'FOMC680925MDFLDM09',
      birthday: new Date(1968, 8, 25),
    },
    {
      id: 'USR013',
      tipoPersonal: 'Directivo',
      fullname: 'Raúl Vázquez Soto',
      curp: 'VASR750308HDFZRL03',
      birthday: new Date(1975, 2, 8),
    },
    {
      id: 'USR014',
      tipoPersonal: 'Administrativo',
      fullname: 'Mónica Castillo Ramos',
      curp: 'CARM871117MDFSMN07',
      birthday: new Date(1987, 10, 17),
    },
    {
      id: 'USR015',
      tipoPersonal: 'Docente',
      fullname: 'Alejandro Díaz Fuentes',
      curp: 'DIFA800605HDFZNL02',
      birthday: new Date(1980, 5, 5),
    },
  ];
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
