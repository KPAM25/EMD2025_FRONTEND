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
import { Expediente } from '@/features/expedientes/interfaces/expediente';
import { mockExpedientes } from '@/features/expedientes/mock/expedientes.mock';
import { DataTablePagination } from '@/components/tables/data-table-pagination';
import { DataTableColumnHeader } from '@/components/tables/data-table-column-header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import Link from 'next/link';

const columns: ColumnDef<Expediente>[] = [
  {
    accessorKey: 'expedienteGeneral',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Expediente' />,
    cell: ({ row }) => (
      <div className='font-medium'>{row.getValue('expedienteGeneral')}</div>
    ),
  },
  {
    accessorKey: 'persona.nombreCompleto',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Paciente' />,
    cell: ({ row }) => (
      <div>{row.original.persona.nombreCompleto}</div>
    ),
  },
  {
    accessorKey: 'persona.curp',
    header: ({ column }) => <DataTableColumnHeader column={column} title='CURP' />,
    cell: ({ row }) => (
      <div className='font-mono text-sm'>{row.original.persona.curp}</div>
    ),
  },
  {
    accessorKey: 'tipoSangre',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Tipo de Sangre' />,
    cell: ({ row }) => (
      <Badge variant='outline'>{row.getValue('tipoSangre')}</Badge>
    ),
  },
  {
    accessorKey: 'persona.fechaNacimiento',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Fecha Nacimiento' />,
    cell: ({ row }) => (
      <div>{new Date(row.original.persona.fechaNacimiento).toLocaleDateString('es-MX')}</div>
    ),
  },
  {
    accessorKey: 'estatus',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Estatus' />,
    cell: ({ row }) => {
      const estatus = row.getValue('estatus') as number;
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
      const expediente = row.original;
      return (
        <Link href={`/expedientes/${expediente.idPaciente}`}>
          <Button variant='ghost' size='sm'>
            <Eye className='h-4 w-4' />
          </Button>
        </Link>
      );
    },
  },
];

export default function ExpedientesListPage() {
  const data = useMemo(() => mockExpedientes, []);

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
      <HeaderPageComponent title='Expedientes' />

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

