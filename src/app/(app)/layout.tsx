'use client';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ROLE_PERMISSIONS } from '@/constants/rolePermissions';
import { Role } from '@/interfaces/roles';
import { NAV_ITEMS } from '@/constants/navigationItems';
import { BellIcon, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthorizedUser } from '@/interfaces/permission';
import { Permission } from '@/interfaces/permission';
import { Footer } from '@/components/ui/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  const userRole = Role.ADMIN_GLOBAL; // Ejemplo: el usuario es un médico
  const userPermissions = ROLE_PERMISSIONS[userRole];
  console.log(userPermissions);
  const user: AuthorizedUser<Permission> = {
    id: '1',
    name: 'John Doe',
    permissions: userPermissions,
    hasPermission: (permission) =>
      userPermissions.some(
        (p) => p.module === permission.module && p.action === permission.action
      ),
  };

  return (
    <SidebarProvider>
      <div className='flex h-screen w-full overflow-hidden bg-background'>
        {/* Sidebar */}
        <AppSidebar user={user} items={NAV_ITEMS} />

        {/* Contenido principal */}
        <div className='flex flex-col flex-1 w-full min-w-0 overflow-hidden'>
          {/* Barra de navegación superior */}
          <header className='sticky top-0 z-10 flex items-center justify-between w-full px-4 h-16 border-b bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div className='flex items-center'>
              <SidebarTrigger className='mr-4' />
              <h1 className='text-lg font-medium'>Sistema de Gestión Médica</h1>
            </div>
            <div className='flex items-center space-x-3'>
              <Button variant='ghost' size='icon' className='relative'>
                <BellIcon className='h-5 w-5' />
                <span className='absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full' />
              </Button>
              <div className='h-6 w-px bg-border'></div>
              <Button variant='ghost' size='sm' className='gap-2'>
                <UserIcon className='h-4 w-4' />
                <span>Perfil</span>
              </Button>
            </div>
          </header>

          {/* Área de contenido principal */}
          <main className='flex-1 w-full overflow-auto'>
            <div className='h-full w-full p-6'>
              {/* Contenedor con sombra y borde sutil para el contenido */}
              <div className='h-full w-full bg-card rounded-lg border shadow-sm p-6 overflow-auto'>
                {children}
              </div>
            </div>
          </main>

          {/* Footer como componente */}
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}
