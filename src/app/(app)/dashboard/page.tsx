'use client';

import React from 'react';
import { HeaderPageComponent } from '@/components/header-page';
import { UserIcon, Stethoscope, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockExpedientes } from '@/features/expedientes/mock/expedientes.mock';
import { mockPersonas } from '@/features/personas/mock/personas.mock';
import { mockCitas } from '@/features/expedientes/mock/expedientes.mock';
import { mockUsuarios } from '@/features/usuarios/mock/usuarios.mock';

export default function DashboardPage() {
  const totalExpedientes = mockExpedientes.length;
  const totalPersonas = mockPersonas.length;
  const citasHoy = mockCitas.filter(c => c.fecha === '2024-12-20').length;
  const totalUsuarios = mockUsuarios.length;

  return (
    <div className='flex flex-col gap-5'>
      <HeaderPageComponent title='Dashboard' />

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Expedientes</CardTitle>
            <Stethoscope className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalExpedientes}</div>
            <p className='text-xs text-muted-foreground'>Total de expedientes activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Personas</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalPersonas}</div>
            <p className='text-xs text-muted-foreground'>Personas registradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Citas Hoy</CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{citasHoy}</div>
            <p className='text-xs text-muted-foreground'>Citas programadas para hoy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Usuarios</CardTitle>
            <UserIcon className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalUsuarios}</div>
            <p className='text-xs text-muted-foreground'>Usuarios del sistema</p>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Bienvenido al Sistema EMD</CardTitle>
            <CardDescription>Expediente Medico Digital</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <p className='text-sm text-muted-foreground'>
                Sistema de gestión médica para el control y seguimiento de expedientes clínicos.
              </p>
              <div className='flex items-center gap-2 pt-4'>
                <UserIcon className='h-4 w-4 text-primary' />
                <span className='text-sm font-medium'>Usuario: Administrador</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accesos Rápidos</CardTitle>
            <CardDescription>Navegación rápida a módulos principales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 gap-2'>
              <a
                href='/expedientes/listar'
                className='p-3 border rounded-lg hover:bg-accent transition-colors text-sm font-medium'
              >
                Expedientes
              </a>
              <a
                href='/admin/personas'
                className='p-3 border rounded-lg hover:bg-accent transition-colors text-sm font-medium'
              >
                Personas
              </a>
              <a
                href='/recepcion/agendas'
                className='p-3 border rounded-lg hover:bg-accent transition-colors text-sm font-medium'
              >
                Agendas
              </a>
              <a
                href='/admin/usuarios'
                className='p-3 border rounded-lg hover:bg-accent transition-colors text-sm font-medium'
              >
                Usuarios
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
