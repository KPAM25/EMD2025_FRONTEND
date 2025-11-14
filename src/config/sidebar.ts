import { SidebarItem } from '@/components/app-sidebar';
import {
  Home,
  UserPlus,
  Users,
  CalendarRange,
  Building2,
  Settings,
  Stethoscope,
  Activity,
} from 'lucide-react';

export const sidebarItems: SidebarItem[] = [
  {
    title: 'Principal',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Administración',
    url: '/admin',
    icon: Settings,
    items: [
      {
        title: 'Personas',
        url: '/admin/personas',
        icon: Users,
      },
      {
        title: 'Nueva Persona',
        url: '/admin/personas/nueva',
        icon: UserPlus,
      },
      {
        title: 'Usuarios',
        url: '/admin/usuarios',
        icon: Users,
      },
      {
        title: 'Unidades',
        url: '/admin/unidades',
        icon: Building2,
      },
    ],
  },
  {
    title: 'Recepción',
    url: '/recepcion',
    icon: CalendarRange,
    items: [
      {
        title: 'Personas',
        url: '/recepcion/personas',
        icon: Users,
      },
      {
        title: 'Nueva Persona',
        url: '/recepcion/personas/nueva',
        icon: UserPlus,
      },
      {
        title: 'Mis Agendas',
        url: '/recepcion/agendas',
        icon: CalendarRange,
      },
    ],
  },
  {
    title: 'Expedientes',
    url: '/expedientes',
    icon: Stethoscope,
    items: [
      {
        title: 'Expedientes',
        url: '/expedientes/listar',
        icon: Users,
      },
      {
        title: 'Mis Citas',
        url: '/expedientes/mis-citas',
        icon: CalendarRange,
      },
      {
        title: 'Mis Consultas',
        url: '/expedientes/mis-consultas',
        icon: CalendarRange,
      },
    ],
  },
  {
    title: 'Enfermería',
    url: '/enfermeria',
    icon: Activity,
    items: [
      {
        title: 'Toma de Signos Vitales',
        url: '/enfermeria/signos-vitales',
        icon: Activity,
      },
      {
        title: 'Pacientes Citados',
        url: '/enfermeria/pacientes-citados',
        icon: Stethoscope,
      },
    ],
  },
];
