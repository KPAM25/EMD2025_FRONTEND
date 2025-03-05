import { Permission } from './permission';
export enum Role {
  ADMIN_GLOBAL = 'ADMIN_GLOBAL',
  ADMIN_LOCAL = 'ADMIN_LOCAL',
  ADMIN = 'ADMIN',
  MEDICO = 'MEDICO',
  ENFERMERIA = 'ENFERMERIA',
  RECEPCIONISTA = 'RECEPCIONISTA',
  PACIENTE = 'PACIENTE',
  TECNICO = 'TECNICO',
}

export type PermissionsByRole = { [role in Role]: Permission[] };

export interface UserRole {
  id: string;
  name: string;
  role: Role;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
