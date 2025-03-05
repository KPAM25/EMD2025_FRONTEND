'use client';
import { DropdownMenuContent } from '@/components/ui/dropdown-menu';

import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

import { DropdownMenuLabel } from '@/components/ui/dropdown-menu';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

import { ColumnDef } from '@tanstack/react-table';
import { User } from '../interfaces/user';
import { DataTableColumnHeader } from '@/components/tables/data-table-column-header';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className='font-medium'>{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'tipoPersonal',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Tipo de personal' />;
    },
  },
  {
    accessorKey: 'fullname',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Nombre completo' />;
    },
  },
  {
    accessorKey: 'curp',
    header: 'CURP',
  },
  {
    accessorKey: 'birthday',
    header: 'Fecha de Nacimiento',
    cell: ({ row }) => {
      const birthday = row.getValue('birthday') as Date;
      return <div>{dayjs(birthday).format('DD/MM/YYYY')}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0 hover:bg-gray-100'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => console.log('View', user)}>
              Ver detalles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Edit', user)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => console.log('Block', user)}
              className='text-red-600'
            >
              Bloquear
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
