'use client';

import React from 'react';
import { HeaderPageComponent } from '@/components/header-page';
import { mockExpedientes } from '@/features/expedientes/mock/expedientes.mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
interface ExpedienteDetailPageProps {
  params: {
    id: string;
  };
}

export default function ExpedienteDetailPage({ params }: ExpedienteDetailPageProps) {
  const expediente = mockExpedientes.find((e) => e.idPaciente === params.id);

  if (!expediente) {
    return (
      <div className='flex flex-col gap-5'>
        <HeaderPageComponent title='Expediente no encontrado' />
        <Card>
          <CardContent className='pt-6'>
            <p className='text-center text-muted-foreground'>
              No se encontró el expediente solicitado.
            </p>
            <div className='flex justify-center mt-4'>
              <Link href='/expedientes/listar'>
                <Button variant='outline'>Volver a Expedientes</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { persona } = expediente;

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center gap-4'>
        <Link href='/expedientes/listar'>
          <Button variant='ghost' size='sm'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Volver
          </Button>
        </Link>
        <HeaderPageComponent title={`Expediente: ${expediente.expedienteGeneral}`} />
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Información del Expediente</CardTitle>
            <CardDescription>Datos generales del expediente médico</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <p className='text-sm text-muted-foreground'>Expediente General</p>
              <p className='font-medium'>{expediente.expedienteGeneral}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Expediente UM</p>
              <p className='font-medium'>{expediente.expedienteUm}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Tipo de Sangre</p>
              <Badge variant='outline'>{expediente.tipoSangre}</Badge>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Estatus</p>
              <Badge variant={expediente.estatus === 1 ? 'default' : 'secondary'}>
                {expediente.estatus === 1 ? 'Activo' : 'Inactivo'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Información del Paciente</CardTitle>
            <CardDescription>Datos personales del paciente</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <p className='text-sm text-muted-foreground'>Nombre Completo</p>
              <p className='font-medium'>{persona.nombreCompleto}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>CURP</p>
              <p className='font-mono text-sm'>{persona.curp}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>RFC</p>
              <p className='font-mono text-sm'>{persona.rfc}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Fecha de Nacimiento</p>
              <p className='font-medium'>
                {new Date(persona.fechaNacimiento).toLocaleDateString('es-MX', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Sexo</p>
              <p className='font-medium'>{persona.sexo}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Estado</p>
              <p className='font-medium'>{persona.estado}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

