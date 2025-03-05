import { SidebarItem } from '@/components/app-sidebar';

export const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
  },
  {
    title: 'Sección Médica',
    url: '/areas-medicas',
    items: [
      {
        title: 'Consultas',
        url: '/areas-medicas/consultas',
      },
      {
        title: 'Notas Médicas',
        url: '/areas-medicas/notas-medicas',
      },
    ],
  },
  {
    title: 'Recepción',
    url: '/recepcion',
  },
  {
    title: 'Reportes',
    url: '/reportes',
    items: [
      {
        title: 'Reportes Generales',
        url: '/reportes/general',
      },
      {
        title: 'Reportes Locales',
        url: '/reportes/local',
        // Solo admin-local tiene acceso a este reporte
        permission: { module: 'reports', action: 'view' },
      },
    ],
  },
];
