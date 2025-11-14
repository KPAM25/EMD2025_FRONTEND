'use client';

import React from 'react';
import { HeaderPageComponent } from '@/components/header-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';

export default function SignosVitalesPage() {
  return (
    <div className='flex flex-col gap-5'>
      <HeaderPageComponent title='Toma de Signos Vitales' />

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Activity className='h-5 w-5' />
            Registro de Signos Vitales
          </CardTitle>
          <CardDescription>
            Sistema para el registro y seguimiento de signos vitales de los pacientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>
            Módulo en desarrollo. Aquí se registrarán los signos vitales de los pacientes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

