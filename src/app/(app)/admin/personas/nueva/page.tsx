'use client';

import React from 'react';
import { HeaderPageComponent } from '@/components/header-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NuevaPersonaPage() {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center gap-4'>
        <Link href='/admin/personas'>
          <Button variant='ghost' size='sm'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Volver
          </Button>
        </Link>
        <HeaderPageComponent title='Nueva Persona' />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Datos Personales</CardTitle>
          <CardDescription>Ingrese la información de la nueva persona</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='nombre'>Nombre</Label>
              <Input id='nombre' placeholder='Nombre' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='primerApellido'>Primer Apellido</Label>
              <Input id='primerApellido' placeholder='Primer Apellido' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='segundoApellido'>Segundo Apellido</Label>
              <Input id='segundoApellido' placeholder='Segundo Apellido' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='curp'>CURP</Label>
              <Input id='curp' placeholder='CURP' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='rfc'>RFC</Label>
              <Input id='rfc' placeholder='RFC' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='fechaNacimiento'>Fecha de Nacimiento</Label>
              <Input id='fechaNacimiento' type='date' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='sexo'>Sexo</Label>
              <Input id='sexo' placeholder='Sexo' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='estado'>Estado</Label>
              <Input id='estado' placeholder='Estado' />
            </div>
          </div>
          <div className='flex justify-end gap-2 pt-4'>
            <Link href='/admin/personas'>
              <Button variant='outline'>Cancelar</Button>
            </Link>
            <Button>Guardar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

