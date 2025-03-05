import { SidebarItem } from '@/components/app-sidebar';
import { PERMISSIONS } from './permissions';
import {
  Home,
  Users
} from 'lucide-react';

// Elementos de navegación para el admin global
export const NAV_ITEMS: SidebarItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
    permission: PERMISSIONS.dashboard.view,
  },
  {
    title: 'Administración',
    url: '/admin',
    icon: Users,
    permission: PERMISSIONS.administration.view,
    items: [
      {
        title: 'Listado de usuarios',
        url: '/admin/usuarios',
        permission: PERMISSIONS.administration.view,
      },
      {
        title: 'Nuevo usuario',
        url: '/admin/usuarios/nuevo',
        permission: PERMISSIONS.administration.create,
      },
      
    ],
  }
];
