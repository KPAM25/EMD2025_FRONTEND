'use client';

import React from 'react';
import { HeaderPageComponent } from '@/components/header-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope } from 'lucide-react';

export default function PacientesCitadosPage() {
  return (
    <div className='flex flex-col gap-5'>
      <HeaderPageComponent title='Pacientes Citados' />

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Stethoscope className='h-5 w-5' />
            Lista de Pacientes Citados
          </CardTitle>
          <CardDescription>
            Visualización de pacientes con citas programadas para el día de hoy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>
            Módulo en desarrollo. Aquí se mostrarán los pacientes citados para el día.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

