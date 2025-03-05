// interfaces/permissions.ts
export type Action =
  | 'view'
  | 'create'
  | 'edit'
  | 'delete'
  | 'export'
  | 'archive'
  | 'schedule'
  | 'cancel'
  | 'confirm'
  | 'assign_role'
  | 'system_config'
  | 'assign_staff'
  | 'manage'
  | 'audit'
  | 'expedientes_fusion'
  | 'edit_profile_button';

export type Module =
  | 'dashboard'
  | 'administration'
  | 'records'
  | 'appointments'
  | 'users'
  | 'configuration'
  | 'centers'
  | 'reports'
  | 'catalogs'
  | 'security'
  | 'patients'
  | 'urgency';

export interface Permission {
  module: Module;
  action: Action;
}

// Tipo utilitario para verificar permisos
export type HasPermission<T extends Permission> = {
  hasPermission: (permission: T) => boolean;
};

// Tipo para usuario autorizado con permisos específicos
export type AuthorizedUser<T extends Permission> = {
  id: string;
  name: string;
  permissions: T[];
} & HasPermission<T>;
