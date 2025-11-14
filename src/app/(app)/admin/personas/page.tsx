'use client';

import React, { useMemo } from 'react';
import { HeaderPageComponent } from '@/components/header-page';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Persona } from '@/features/personas/interfaces/persona';
import { mockPersonas } from '@/features/personas/mock/personas.mock';
import { DataTablePagination } from '@/components/tables/data-table-pagination';
import { DataTableColumnHeader } from '@/components/tables/data-table-column-header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Plus } from 'lucide-react';
import Link from 'next/link';

const columns: ColumnDef<Persona>[] = [
  {
    accessorKey: 'nombreCompleto',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Nombre Completo' />,
    cell: ({ row }) => (
      <div className='font-medium'>{row.getValue('nombreCompleto')}</div>
    ),
  },
  {
    accessorKey: 'curp',
    header: ({ column }) => <DataTableColumnHeader column={column} title='CURP' />,
    cell: ({ row }) => (
      <div className='font-mono text-sm'>{row.getValue('curp')}</div>
    ),
  },
  {
    accessorKey: 'rfc',
    header: ({ column }) => <DataTableColumnHeader column={column} title='RFC' />,
    cell: ({ row }) => (
      <div className='font-mono text-sm'>{row.getValue('rfc')}</div>
    ),
  },
  {
    accessorKey: 'fechaNacimiento',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Fecha Nacimiento' />,
    cell: ({ row }) => (
      <div>{new Date(row.getValue('fechaNacimiento')).toLocaleDateString('es-MX')}</div>
    ),
  },
  {
    accessorKey: 'sexo',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Sexo' />,
  },
  {
    accessorKey: 'estado',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Estado' />,
  },
  {
    accessorKey: 'estatusPersona',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Estatus' />,
    cell: ({ row }) => {
      const estatus = row.getValue('estatusPersona') as number | undefined;
      return (
        <Badge variant={estatus === 1 ? 'default' : 'secondary'}>
          {estatus === 1 ? 'Activo' : 'Inactivo'}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const persona = row.original;
      return (
        <Link href={`/admin/personas/${persona.idPersona}`}>
          <Button variant='ghost' size='sm'>
            <Eye className='h-4 w-4' />
          </Button>
        </Link>
      );
    },
  },
];

export default function PersonasListPage() {
  const data = useMemo(() => mockPersonas, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <HeaderPageComponent title='Personas' />
        <Link href='/admin/personas/nueva'>
          <Button>
            <Plus className='h-4 w-4 mr-2' />
            Nueva Persona
          </Button>
        </Link>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}

