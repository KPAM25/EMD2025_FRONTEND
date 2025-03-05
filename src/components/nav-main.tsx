'use client';

import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { SidebarItem } from './app-sidebar';
import { AuthorizedUser, Permission } from '@/interfaces/permission';
import { hasRequiredPermission } from '@/utils/permissions';

import {
  Collapsible,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';

interface NavMainProps {
  items: SidebarItem[];
  user: AuthorizedUser<Permission>;
}

export function NavMain({ items, user }: NavMainProps) {
  const pathname = usePathname();

  // Filtra los elementos de navegación basado en permisos
  const filteredItems = items.filter((item) => {
    // Si el item no requiere permiso o el usuario tiene el permiso requerido
    if (!item.permission || hasRequiredPermission(user, item.permission)) {
      // Si tiene sub-items, filtra también esos
      if (item.items) {
        const filteredSubItems = item.items.filter(
          (subItem) =>
            !subItem.permission ||
            hasRequiredPermission(user, subItem.permission)
        );

        // Actualiza los sub-items del item actual
        item.items = filteredSubItems;

        // Devuelve true si hay al menos un sub-item después de filtrar
        return filteredSubItems.length > 0;
      }
      return true;
    }
    return false;
  });

  const isActive = (url: string) => pathname === url;
  const isItemActive = (item: SidebarItem) =>
    isActive(item.url) ||
    (item.items?.some((subItem) => isActive(subItem.url)) ?? false);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navegación</SidebarGroupLabel>
      <SidebarMenu>
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const hasSubItems = item.items && item.items.length > 0;
          const isCurrentActive = isItemActive(item);

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isCurrentActive}
              className='group/collapsible'
            >
              <SidebarMenuItem>
                {hasSubItems ? (
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={isActive(item.url)}
                    >
                      {Icon && <Icon className='h-4 w-4' />}
                      
                      <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                ) : (
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <a href={item.url}>
                      {Icon && <Icon className='h-4 w-4' />}
                      
                    </a>
                  </SidebarMenuButton>
                )}

                {/* {hasSubItems && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive(subItem.url)}
                          >
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )} */}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
