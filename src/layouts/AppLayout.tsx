import { LogOut, Menu } from "lucide-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme, type AccentColor } from "@/components/theme-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/hooks/useSidebar";
import { useUser } from "@/providers/UserProvider";
import { clearSession } from "@/utils/auth";

interface AppLayoutProps {
  portal: "admin" | "client";
}

export function AppLayout({ portal }: AppLayoutProps) {
  const { isCollapsed, toggle, collapse, isMobile } = useSidebar();
  const { user } = useUser();
  const { setAccentColor, accentColor } = useTheme();
  const navigate = useNavigate();

  const accentPickerVisible = portal === "admin";

  useEffect(() => {
    if (portal === "client" && user?.accent_color && user.accent_color !== "all") {
      if (user.accent_color !== accentColor) {
        setAccentColor(user.accent_color as AccentColor);
      }
    }
  }, [user?.accent_color, portal, accentColor, setAccentColor]);

  const handleLogout = () => {
    clearSession();
    navigate("/login", { replace: true });
  };

  const initials = `${user?.first_name?.[0] ?? ""}${user?.last_name?.[0] ?? ""}`;

  return (
    <div className="flex h-screen overflow-hidden">
      {!isCollapsed && isMobile && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={collapse}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-150 ease-out ${
          isCollapsed ? "-translate-x-full md:translate-x-0" : "translate-x-0"
        } ${isCollapsed ? "md:w-16" : "md:w-64"} w-64`}
        style={{ willChange: "transform" }}
      >
        <AppSidebar portal={portal} isCollapsed={isCollapsed} onToggle={toggle} />
      </aside>

      <div
        className={`flex min-w-0 flex-1 flex-col overflow-hidden transition-[margin-left] duration-150 ease-out ${
          isCollapsed ? "md:ml-16" : "md:ml-64"
        }`}
        style={{ willChange: "margin-left" }}
      >
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary/20" />

          <div className="relative z-10 flex h-16 items-center justify-between px-6">
            <button
              type="button"
              onClick={toggle}
              className="rounded-md p-2 transition-colors hover:bg-accent md:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="ml-auto flex items-center space-x-3">
              <ModeToggle visible={accentPickerVisible} />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="User menu"
                  >
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-primary text-sm font-medium text-white">
                        {initials || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.first_name} {user?.last_name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
