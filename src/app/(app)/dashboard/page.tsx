'use client';

import React from 'react';
//import { Role } from '@/interfaces/roles';
//import { useMemo } from 'react';
import { HeaderPageComponent } from '@/components/header-page';
//import { dashboardConfig } from '@/config/dashboard';

// Importamos componentes específicos del dashboard
export default function DashboardPage() {
  // En un caso real, obtendríamos el rol del usuario desde un contexto o hook
  //const userRole = Role.ADMIN_GLOBAL;

  // Utilizamos useMemo para evitar recalcular la configuración del dashboard en cada render
  /* const dashboardData = useMemo(() => {
    return dashboardConfig[userRole] || dashboardConfig.default;
  }, [userRole]); */

  return (
    <div className='flex flex-col gap-5'>
      <HeaderPageComponent title='Dashboard' />


    </div>
  );
}
