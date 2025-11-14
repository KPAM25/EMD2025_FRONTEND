'use client';

import React from 'react';
import { HeaderPageComponent } from '@/components/header-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2 } from 'lucide-react';

const mockUnidades = [
  {
    id: '1',
    nombre: 'Unidad Médica Central',
    clues: 'CLUES-001',
    direccion: 'Av. Principal 123, Ciudad de México',
    estatus: 'Activa',
  },
  {
    id: '2',
    nombre: 'Unidad Médica Norte',
    clues: 'CLUES-002',
    direccion: 'Calle Norte 456, Estado de México',
    estatus: 'Activa',
  },
  {
    id: '3',
    nombre: 'Unidad Médica Sur',
    clues: 'CLUES-003',
    direccion: 'Av. Sur 789, Ciudad de México',
    estatus: 'Inactiva',
  },
];

export default function UnidadesPage() {
  return (
    <div className='flex flex-col gap-5'>
      <HeaderPageComponent title='Unidades Médicas' />

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {mockUnidades.map((unidad) => (
          <Card key={unidad.id}>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='flex items-center gap-2'>
                  <Building2 className='h-5 w-5' />
                  {unidad.nombre}
                </CardTitle>
                <Badge variant={unidad.estatus === 'Activa' ? 'default' : 'secondary'}>
                  {unidad.estatus}
                </Badge>
              </div>
              <CardDescription>CLUES: {unidad.clues}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>{unidad.direccion}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

