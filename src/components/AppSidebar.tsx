import {
  BarChart3,
  Briefcase,
  Building2,
  FileText,
  LayoutDashboard,
  Menu,
  Package,
  Pencil,
  Receipt,
  Settings,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useUser } from "@/providers/UserProvider";

export interface NavItem {
  name: string;
  href?: string;
  icon: LucideIcon;
  badge?: string | number;
  dot?: boolean;
  children?: NavItem[];
}

const adminNav: NavItem[] = [
  {
    name: "Main",
    icon: LayoutDashboard,
    children: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { name: "Leads", href: "/admin/leads", icon: Users, badge: 4 },
      { name: "Projects", href: "/admin/projects", icon: Briefcase },
      { name: "Agreements", href: "/admin/agreements", icon: FileText },
    ],
  },
  {
    name: "Teams",
    icon: Wrench,
    children: [
      { name: "Architecture", href: "/admin/architecture", icon: Pencil },
      { name: "Site ops", href: "/admin/site-ops", icon: Wrench },
      { name: "Payments", href: "/admin/payments", icon: Receipt },
      { name: "Packages", href: "/admin/packages", icon: Package },
    ],
  },
  {
    name: "Reports",
    icon: BarChart3,
    children: [
      { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

const clientNav: NavItem[] = [
  {
    name: "Overview",
    icon: LayoutDashboard,
    children: [
      { name: "Home", href: "/client", icon: LayoutDashboard },
      { name: "My project", href: "/client/project", icon: Briefcase },
      { name: "My package", href: "/client/package", icon: Package },
    ],
  },
  {
    name: "Documents",
    icon: FileText,
    children: [
      { name: "Drawings", href: "/client/drawings", icon: Pencil, dot: true },
      { name: "Agreement", href: "/client/agreement", icon: FileText },
      { name: "Payments", href: "/client/payments", icon: Receipt },
    ],
  },
  {
    name: "Support",
    icon: Users,
    children: [
      { name: "Messages", href: "/client/messages", icon: FileText, dot: true },
      { name: "Help", href: "/client/help", icon: Settings },
    ],
  },
];

function NavLinkItem({
  item,
  isCollapsed,
  level = 0,
}: {
  item: NavItem;
  isCollapsed: boolean;
  level?: number;
}) {
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <div>
        {!isCollapsed && (
          <p className="mb-1 px-3 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            {item.name}
          </p>
        )}
        <div className="space-y-0.5">
          {item.children?.map((child) => (
            <NavLinkItem
              key={child.href || child.name}
              item={child}
              isCollapsed={isCollapsed}
              level={level + 1}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <NavLink
      to={item.href!}
      title={isCollapsed ? item.name : undefined}
      className={({ isActive }) =>
        cn(
          "flex items-center space-x-3 rounded-md px-3 py-2 text-sm transition-colors duration-150",
          isCollapsed ? "justify-center" : "justify-start",
          isActive
            ? "text-sidebar-primary"
            : "text-sidebar-foreground hover:bg-sidebar-accent",
        )
      }
      style={{
        paddingLeft: isCollapsed ? undefined : `${0.75 + level * 0.5}rem`,
      }}
    >
      {({ isActive }) => (
        <>
          <Icon
            className={cn(
              "h-5 w-5 shrink-0",
              isActive ? "text-sidebar-primary" : "",
            )}
          />
          {!isCollapsed && <span className="truncate">{item.name}</span>}
          {!isCollapsed && item.badge !== undefined && (
            <span className="ml-auto flex min-w-5 items-center justify-center rounded-full bg-[#F0156A] px-1.5 text-[10px] font-semibold text-white">
              {item.badge}
            </span>
          )}
          {!isCollapsed && item.dot && (
            <span className="ml-auto size-1.5 rounded-full bg-[#F0156A]" />
          )}
        </>
      )}
    </NavLink>
  );
}

interface AppSidebarProps {
  portal: "admin" | "client";
  isCollapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ portal, isCollapsed, onToggle }: AppSidebarProps) {
  const { user } = useUser();
  const nav = portal === "admin" ? adminNav : clientNav;
  const initials = `${user?.first_name?.[0] ?? ""}${user?.last_name?.[0] ?? ""}`;

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-150 ease-out",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b border-sidebar-border p-4",
          isCollapsed ? "justify-center" : "justify-between",
        )}
      >
        {!isCollapsed && (
          <div className="flex items-center space-x-2 overflow-hidden">
            <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Building2 className="size-4" />
            </div>
            <div className="min-w-0">
              <span className="block truncate text-sm font-semibold text-foreground">
                BuildCore
              </span>
              <p className="truncate text-xs text-muted-foreground">
                {portal === "admin" ? "Admin portal" : "My project"}
              </p>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={onToggle}
          className="shrink-0 rounded-md p-1.5 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? <Menu className="size-4" /> : <X className="size-4" />}
        </button>
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto p-2 custom-scrollbar">
        {nav.map((section) => (
          <NavLinkItem key={section.name} item={section} isCollapsed={isCollapsed} />
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-2">
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg p-2",
            !isCollapsed && "hover:bg-sidebar-accent",
          )}
        >
          <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sm font-medium text-sidebar-primary-foreground">
            {initials || "U"}
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user?.title ?? user?.role_name}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
