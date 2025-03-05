import React from 'react';
import { AuthorizedUser, Permission } from '@/interfaces/permission';
import { hasRequiredPermission } from '@/utils/permissions';

interface ProtectedComponentProps<T extends Permission> {
  user: AuthorizedUser<T>;
  requiredPermission: T;
  children: React.ReactNode;
}

export function ProtectedComponent<T extends Permission>({
  user,
  requiredPermission,
  children,
}: ProtectedComponentProps<T>) {
  if (!hasRequiredPermission(user, requiredPermission)) {
    return null;
  }

  return <>{children}</>;
}
