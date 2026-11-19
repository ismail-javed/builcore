import { useEffect, useState } from "react";
import { useIsMobile } from "./use-mobile";

export function useSidebar() {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.innerWidth < 768) return true;
    const saved = localStorage.getItem("bc-sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("bc-sidebar-collapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsCollapsed(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isCollapsed,
    isMobile,
    toggle: () => setIsCollapsed((p: boolean) => !p),
    collapse: () => setIsCollapsed(true),
    expand: () => setIsCollapsed(false),
  };
}
