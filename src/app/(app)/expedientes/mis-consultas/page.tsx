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
import { Consulta } from '@/features/expedientes/interfaces/expediente';
import { mockConsultas } from '@/features/expedientes/mock/expedientes.mock';
import { DataTablePagination } from '@/components/tables/data-table-pagination';
import { DataTableColumnHeader } from '@/components/tables/data-table-column-header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const columns: ColumnDef<Consulta>[] = [
  {
    accessorKey: 'fecha',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Fecha' />,
    cell: ({ row }) => (
      <div>{new Date(row.getValue('fecha')).toLocaleDateString('es-MX')}</div>
    ),
  },
  {
    accessorKey: 'paciente.nombreCompleto',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Paciente' />,
    cell: ({ row }) => (
      <div>{row.original.paciente.nombreCompleto}</div>
    ),
  },
  {
    accessorKey: 'medico',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Médico' />,
  },
  {
    accessorKey: 'diagnostico',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Diagnóstico' />,
  },
  {
    accessorKey: 'tratamiento',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Tratamiento' />,
  },
  {
    accessorKey: 'estatus',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Estatus' />,
    cell: ({ row }) => {
      const estatus = row.getValue('estatus') as string;
      return (
        <Badge variant={estatus === 'cerrada' ? 'default' : 'secondary'}>
          {estatus === 'cerrada' ? 'Cerrada' : 'Abierta'}
        </Badge>
      );
    },
  },
];

export default function MisConsultasPage() {
  const data = useMemo(() => mockConsultas, []);

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
      <HeaderPageComponent title='Mis Consultas' />

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
                  No hay consultas registradas.
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

