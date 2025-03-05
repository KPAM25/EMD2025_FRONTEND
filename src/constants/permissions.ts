import { Permission, Module, Action } from '@/interfaces/permission';

// Define todos los permisos posibles del sistema

export const PERMISSIONS: Record<
  Module,
  Partial<Record<Action, Permission>>
> = {
  dashboard: {
    view: { module: 'dashboard', action: 'view' },
    export: { module: 'dashboard', action: 'export' },
    edit_profile_button: { module: 'dashboard', action: 'edit_profile_button' },
  },
  administration: {
    view: { module: 'administration', action: 'view' },
    create: { module: 'administration', action: 'create' },
    edit: { module: 'administration', action: 'edit' },
    delete: { module: 'administration', action: 'delete' },
    expedientes_fusion: {
      module: 'administration',
      action: 'expedientes_fusion',
    },
  },
  records: {
    view: { module: 'records', action: 'view' },
    create: { module: 'records', action: 'create' },
    edit: { module: 'records', action: 'edit' },
    delete: { module: 'records', action: 'delete' },
    archive: { module: 'records', action: 'archive' },
    export: { module: 'records', action: 'export' },
  },
  appointments: {
    view: { module: 'appointments', action: 'view' },
    schedule: { module: 'appointments', action: 'schedule' },
    cancel: { module: 'appointments', action: 'cancel' },
    edit: { module: 'appointments', action: 'edit' },
    confirm: { module: 'appointments', action: 'confirm' },
  },
  users: {
    view: { module: 'users', action: 'view' },
    create: { module: 'users', action: 'create' },
    edit: { module: 'users', action: 'edit' },
    delete: { module: 'users', action: 'delete' },
    assign_role: { module: 'users', action: 'assign_role' },
  },
  configuration: {
    view: { module: 'configuration', action: 'view' },
    edit: { module: 'configuration', action: 'edit' },
    system_config: { module: 'configuration', action: 'system_config' },
  },
  centers: {
    view: { module: 'centers', action: 'view' },
    create: { module: 'centers', action: 'create' },
    edit: { module: 'centers', action: 'edit' },
    delete: { module: 'centers', action: 'delete' },
    assign_staff: { module: 'centers', action: 'assign_staff' },
  },
  reports: {
    view: { module: 'reports', action: 'view' },
    export: { module: 'reports', action: 'export' },
    create: { module: 'reports', action: 'create' },
  },
  catalogs: {
    view: { module: 'catalogs', action: 'view' },
    edit: { module: 'catalogs', action: 'edit' },
    create: { module: 'catalogs', action: 'create' },
    delete: { module: 'catalogs', action: 'delete' },
  },
  security: {
    view: { module: 'security', action: 'view' },
    manage: { module: 'security', action: 'manage' },
    audit: { module: 'security', action: 'audit' },
  },
  patients: {
    view: { module: 'patients', action: 'view' },
    create: { module: 'patients', action: 'create' },
    edit: { module: 'patients', action: 'edit' },
    delete: { module: 'patients', action: 'delete' },
  },
  urgency: {},
};
