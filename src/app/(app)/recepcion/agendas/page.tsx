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
import { Agenda } from '@/features/recepcion/interfaces/agenda';
import { mockAgendas } from '@/features/recepcion/mock/agendas.mock';
import { DataTablePagination } from '@/components/tables/data-table-pagination';
import { DataTableColumnHeader } from '@/components/tables/data-table-column-header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const columns: ColumnDef<Agenda>[] = [
  {
    accessorKey: 'fecha',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Fecha' />,
    cell: ({ row }) => (
      <div>{new Date(row.getValue('fecha')).toLocaleDateString('es-MX')}</div>
    ),
  },
  {
    accessorKey: 'horaInicio',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Hora' />,
    cell: ({ row }) => (
      <div>{row.original.horaInicio} - {row.original.horaFin}</div>
    ),
  },
  {
    accessorKey: 'medico',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Médico' />,
  },
  {
    accessorKey: 'especialidad',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Especialidad' />,
  },
  {
    accessorKey: 'paciente',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Paciente' />,
    cell: ({ row }) => (
      <div>{row.original.paciente?.nombreCompleto || '-'}</div>
    ),
  },
  {
    accessorKey: 'motivo',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Motivo' />,
    cell: ({ row }) => (
      <div>{row.original.motivo || '-'}</div>
    ),
  },
  {
    accessorKey: 'disponible',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Estado' />,
    cell: ({ row }) => {
      const disponible = row.getValue('disponible') as boolean;
      return (
        <Badge variant={disponible ? 'default' : 'secondary'}>
          {disponible ? 'Disponible' : 'Ocupada'}
        </Badge>
      );
    },
  },
];

export default function AgendasPage() {
  const data = useMemo(() => mockAgendas, []);

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
      <HeaderPageComponent title='Mis Agendas' />

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
                  No hay agendas disponibles.
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

