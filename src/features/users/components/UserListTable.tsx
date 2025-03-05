'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import { TableBody } from '@/components/ui/table';
import { TableHead } from '@/components/ui/table';
import { TableHeader } from '@/components/ui/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { ColumnFiltersState } from '@tanstack/react-table';

import { SortingState } from '@tanstack/react-table';
import { FC, useState } from 'react';
import { User } from '../interfaces/user';
import { CirclePlus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table } from '@/components/ui/table';
import { DataTablePagination } from '@/components/tables/data-table-pagination';
import { DataTableViewOptions } from '@/components/tables/data-table-view-options';
import { Button } from '@/components/ui/button';

interface UserListDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const UserListTable: FC<UserListDataTableProps<User, unknown>> = ({
  columns,
  data,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  return (
    <div className='w-full'>
      <div className='py-4 w-full'>
        <div className='w-full flex items-center gap-2 justify-between'>
          <div className='flex items-center gap-2 w-[460px]'>
            <div className='w-full relative flex-1'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Buscar por nombre...'
                value={
                  (table.getColumn('fullname')?.getFilterValue() as string) ??
                  ''
                }
                onChange={(event) =>
                  table
                    .getColumn('fullname')
                    ?.setFilterValue(event.target.value)
                }
                className='pl-8'
              />
            </div>
            <Button
              variant='outline'
              size='sm'
              className='ml-auto hidden h-8 lg:flex'
            >
              <CirclePlus />
              Agregar usuario
            </Button>
          </div>

          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader className='bg-gray-100'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className='font-semibold text-gray-700'
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='hover:bg-muted/50'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
};
