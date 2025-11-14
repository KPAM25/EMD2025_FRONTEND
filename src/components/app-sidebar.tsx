"use client"

import * as React from "react"
import { Stethoscope } from "lucide-react"
import { NavUser } from "./nav-user"
import type { AuthorizedUser, Permission } from "@/interfaces/permission"
import { hasRequiredPermission } from "@/utils/permissions"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"

export interface SidebarItem {
  title: string
  url: string
  icon?: React.ElementType
  isActive?: boolean
  permission?: Permission
  items?: SidebarItem[]
}

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: AuthorizedUser<Permission>
  items: SidebarItem[]
}

export function AppSidebar({ items, user, ...props }: AppSidebarProps) {
  const pathname = usePathname()
  const [activeItem, setActiveItem] = React.useState<SidebarItem | null>(null)
  const { setOpen } = useSidebar()

  // Filter navigation items based on permissions
  const filteredItems = React.useMemo(() => {
    return items.filter((item) => {
      if (!item.permission || hasRequiredPermission(user, item.permission)) {
        if (item.items) {
          const filteredSubItems = item.items.filter(
            (subItem) => !subItem.permission || hasRequiredPermission(user, subItem.permission),
          )

          // Update the sub-items of the current item
          const newItem = { ...item, items: filteredSubItems }

          // Return true if there is at least one sub-item after filtering
          return filteredSubItems.length > 0 ? newItem : false
        }
        return true
      }
      return false
    })
  }, [items, user])

  // Find the active item based on the current path
  React.useEffect(() => {
    const findActiveItem = (items: SidebarItem[]): SidebarItem | null => {
      for (const item of items) {
        if (pathname === item.url) {
          return item
        }
        if (item.items) {
          const activeSubItem = item.items.find((subItem) => pathname === subItem.url)
          if (activeSubItem) {
            return item
          }
        }
      }
      return items[0] || null
    }

    const active = findActiveItem(filteredItems)
    setActiveItem(active)
  }, [pathname, filteredItems])

  const isActive = (url: string) => pathname === url
  const isItemActive = (item: SidebarItem) =>
    isActive(item.url) || (item.items?.some((subItem) => isActive(subItem.url)) ?? false)

  return (
    <Sidebar collapsible="icon" className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row" {...props}>
      {/* First sidebar - Navigation icons */}
      <Sidebar collapsible="none" className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <Link href="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Stethoscope className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Sistema EMD</span>
                    <span className="truncate text-xs">Expediente Medico Digital</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {filteredItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                        onClick={() => {
                          setActiveItem(item)
                          setOpen(true)
                        }}
                        isActive={isItemActive(item)}
                        className="px-2.5 md:px-2"
                      >
                        {Icon && <Icon className="size-4" />}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
        <NavUser
          user={{
            name: 'shadcn',
            email: 'm@example.com',
            avatar: '/avatars/shadcn.jpg',
          }}
        />
      </SidebarFooter>
      </Sidebar>

      {/* Second sidebar - Content for selected section */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
      <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {activeItem?.title}
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {activeItem && (
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {activeItem.items && activeItem.items.length > 0 ? (
                    activeItem.items.map((subItem) => (
                      <SidebarMenuItem key={subItem.title}>
                        <SidebarMenuButton asChild isActive={isActive(subItem.url)}>
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive(activeItem.url)}>
                        <Link href={activeItem.url}>
                          <span>{activeItem.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </Sidebar>
  )
}

