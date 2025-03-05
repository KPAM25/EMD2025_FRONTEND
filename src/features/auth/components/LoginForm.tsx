'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';

// Esquema de validación para el formulario
const formSchema = z.object({
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres',
  }),
  remember: z.boolean().default(false),
});

export function LoginForm() {
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const router = useRouter();

  // Definir el formulario con React Hook Form y Zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  // Función para manejar el envío del formulario
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Esta función se conectará con el backend más adelante
    router.push('/dashboard');
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder='correo@ejemplo.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <FormLabel>Contraseña</FormLabel>
            <Link
              href='/auth/recuperar-contraseña'
              className='text-sm text-blue-600 hover:underline'
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={mostrarContraseña ? 'text' : 'password'}
                      placeholder='••••••••'
                      {...field}
                    />
                    <button
                      type='button'
                      onClick={() => setMostrarContraseña(!mostrarContraseña)}
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                    >
                      {mostrarContraseña ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='remember'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-2 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>Recordar mi sesión</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full'>
          Iniciar Sesión
        </Button>
      </form>
    </Form>
  );
}
