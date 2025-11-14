"use client"

import * as React from "react"
import { Stethoscope, ChevronRight } from "lucide-react"
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
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { cn } from "@/lib/utils"

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
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set())

  // Filter navigation items based on permissions
  const filteredItems = React.useMemo(() => {
    return items.filter((item) => {
      if (!item.permission || hasRequiredPermission(user, item.permission)) {
        if (item.items) {
          const filteredSubItems = item.items.filter(
            (subItem) => !subItem.permission || hasRequiredPermission(user, subItem.permission),
          )
          return filteredSubItems.length > 0 ? { ...item, items: filteredSubItems } : false
        }
        return true
      }
      return false
    })
  }, [items, user])

  const isActive = (url: string) => pathname === url
  const isItemActive = (item: SidebarItem) =>
    isActive(item.url) || (item.items?.some((subItem) => isActive(subItem.url)) ?? false)

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev)
      if (next.has(title)) {
        next.delete(title)
      } else {
        next.add(title)
      }
      return next
    })
  }

  // Auto-expand items that have active sub-items
  React.useEffect(() => {
    filteredItems.forEach((item) => {
      if (item.items?.some((subItem) => isActive(subItem.url))) {
        setExpandedItems((prev) => new Set(prev).add(item.title))
      }
    })
  }, [pathname, filteredItems])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Stethoscope className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Sistema ECE</span>
                  <span className="truncate text-xs">Exámenes de Control</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {filteredItems.map((item) => {
          const Icon = item.icon
          const hasSubItems = item.items && item.items.length > 0
          const isExpanded = expandedItems.has(item.title)
          const itemIsActive = isItemActive(item)

          return (
            <SidebarGroup key={item.title}>
              {!hasSubItems && <SidebarGroupLabel>{item.title}</SidebarGroupLabel>}
              <SidebarGroupContent>
                <SidebarMenu>
                  {hasSubItems ? (
                    <>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={() => toggleExpanded(item.title)}
                          isActive={itemIsActive}
                          className="w-full justify-between"
                        >
                          <div className="flex items-center gap-2">
                            {Icon && <Icon className="size-4" />}
                            <span>{item.title}</span>
                          </div>
                          <ChevronRight
                            className={cn(
                              "size-4 transition-transform",
                              isExpanded && "rotate-90"
                            )}
                          />
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      {isExpanded &&
                        item.items?.map((subItem) => (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton asChild isActive={isActive(subItem.url)}>
                              <Link href={subItem.url}>
                                {subItem.icon && <subItem.icon className="size-4" />}
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                    </>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive(item.url)}>
                        <Link href={item.url}>
                          {Icon && <Icon className="size-4" />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}
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
      <SidebarRail />
    </Sidebar>
  )
}
