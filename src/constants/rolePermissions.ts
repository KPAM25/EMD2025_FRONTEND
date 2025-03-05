import { PermissionsByRole, Role } from '@/interfaces/roles';
import { PERMISSIONS } from './permissions';

export const ROLE_PERMISSIONS: PermissionsByRole = {
  [Role.ADMIN_GLOBAL]: [
    PERMISSIONS.dashboard.view!,
    PERMISSIONS.records.view!,
    PERMISSIONS.appointments.view!,
    PERMISSIONS.users.view!,
    PERMISSIONS.configuration.view!,
    PERMISSIONS.centers.view!,
    PERMISSIONS.reports.view!,
    PERMISSIONS.catalogs.view!,
    PERMISSIONS.security.manage!,
    PERMISSIONS.patients.view!,
    PERMISSIONS.administration.view!,
    PERMISSIONS.administration.create!,
    PERMISSIONS.administration.expedientes_fusion!,
  ],
  [Role.ADMIN_LOCAL]: [
    PERMISSIONS.dashboard.view!,
    PERMISSIONS.records.view!,
    PERMISSIONS.appointments.view!,
    PERMISSIONS.users.view!,
    PERMISSIONS.configuration.view!,
  ],
  [Role.ADMIN]: [
    PERMISSIONS.dashboard.view!,
    PERMISSIONS.records.view!,
    PERMISSIONS.appointments.view!,
    PERMISSIONS.users.view!,
  ],
  [Role.MEDICO]: [
    PERMISSIONS.dashboard.view!,
    PERMISSIONS.records.view!,
    PERMISSIONS.appointments.view!,
    PERMISSIONS.users.view!,
  ],
  [Role.ENFERMERIA]: [
    PERMISSIONS.dashboard.view!,
    PERMISSIONS.records.view!,
    PERMISSIONS.records.edit!,
    PERMISSIONS.appointments.view!,
  ],
  [Role.RECEPCIONISTA]: [
    PERMISSIONS.dashboard.view!,
    PERMISSIONS.records.view!,
    PERMISSIONS.records.create!,
    PERMISSIONS.appointments.view!,
  ],
  [Role.PACIENTE]: [
    PERMISSIONS.dashboard.view!,
    PERMISSIONS.records.view!,
    PERMISSIONS.appointments.view!,
    PERMISSIONS.appointments.schedule!,
  ],
  [Role.TECNICO]: [
    PERMISSIONS.dashboard.view!,
    PERMISSIONS.records.view!,
    PERMISSIONS.records.edit!,
    PERMISSIONS.appointments.view!,
  ],
};
