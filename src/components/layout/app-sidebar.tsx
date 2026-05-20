"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Droplets,
  Map,
  BarChart3,
  Bell,
  Settings,
  Mountain,
  ChevronDown,
  Building2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  {
    label: "Principal",
    items: [
      {
        title: "Inicio",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Módulos",
    items: [
      {
        title: "Análisis de Documentos",
        href: "/dashboard/documentos",
        icon: FileText,
        badge: "IA",
      },
      {
        title: "Gestión del Agua",
        href: "/dashboard/agua",
        icon: Droplets,
        badge: "Activo",
      },
      {
        title: "Mapa Geológico",
        href: "/dashboard/geologia",
        icon: Map,
      },
    ],
  },
  {
    label: "Operaciones",
    items: [
      {
        title: "Reportes",
        href: "/dashboard/reportes",
        icon: BarChart3,
      },
      {
        title: "Alertas",
        href: "/dashboard/alertas",
        icon: Bell,
        badge: "3",
        badgeVariant: "destructive" as const,
      },
    ],
  },
  {
    label: "Sistema",
    items: [
      {
        title: "Configuración",
        href: "/dashboard/configuracion",
        icon: Settings,
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Mountain className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">Minerva</p>
            <p className="text-xs text-muted-foreground">IA para Minería</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navItems.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => {
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={isActive}
                      render={
                        <Link href={item.href} className="flex items-center justify-between" />
                      }
                    >
                      <span className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </span>
                      {item.badge && (
                        <Badge
                          variant={"badgeVariant" in item ? item.badgeVariant ?? "secondary" : "secondary"}
                          className="ml-auto text-[10px] h-4 px-1"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
            <SidebarSeparator className="mt-2" />
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-sidebar-accent transition-colors">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  SC
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-xs font-medium leading-none">SQM Chile</p>
                <p className="text-xs text-muted-foreground">admin@sqm.cl</p>
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="w-56">
            <DropdownMenuLabel>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>SQM Chile S.A.</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Gestionar Empresa</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Cerrar Sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
