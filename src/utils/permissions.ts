import { Permission } from '@/interfaces/permission';

import { AuthorizedUser } from '@/interfaces/permission';

export function checkPermission<T extends Permission>(
  user: AuthorizedUser<T>,
  requiredPermission: T
): boolean {
  return user.permissions.some(
    (p) =>
      p.module === requiredPermission.module &&
      p.action === requiredPermission.action
  );
}

export function hasRequiredPermission<T extends Permission>(
  user: AuthorizedUser<T>,
  permission: T
): user is AuthorizedUser<T> {
  if (!user) {
    return false;
  }
  return checkPermission(user, permission);
}
