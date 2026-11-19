import { useTheme, type AccentColor } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/providers/UserProvider";
import { apiClient } from "@/utils/apiClient";
import { isDemoMode } from "@/utils/auth";

const accentColors = [
  { name: "blue", value: "blue", color: "oklch(0.646 0.222 264.376)" },
  { name: "Green", value: "green", color: "oklch(0.696 0.17 162.48)" },
  { name: "Purple", value: "purple", color: "oklch(0.627 0.265 303.9)" },
  { name: "Red", value: "red", color: "oklch(0.645 0.246 16.439)" },
  { name: "Orange", value: "orange", color: "oklch(0.769 0.188 70.08)" },
] as const;

export function AccentSelector() {
  const { accentColor, setAccentColor } = useTheme();
  const { user } = useUser();

  const currentColor = accentColors.find((color) => color.value == accentColor);

  const handleColorSelect = async (colorValue: string) => {
    setAccentColor(colorValue as AccentColor);

    const visible =
      user?.role_name === "superadmin" ||
      (user?.is_admin && user?.accent_color === "all");

    if (visible && user?.role_name === "admin" && !isDemoMode()) {
      try {
        await apiClient.post("accent-color/admin", { accent_color: colorValue });
      } catch (error) {
        console.error("Failed to update accent color", error);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 border-border">
          <div
            className="h-4 w-4 rounded-full border border-border"
            style={{ backgroundColor: currentColor?.color }}
          />
          <span className="sr-only">Select accent color</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {accentColors.map((color) => (
          <DropdownMenuItem
            key={color.value}
            onClick={() => handleColorSelect(color.value)}
            className="flex items-center gap-2"
          >
            <div
              className="h-4 w-4 rounded-full border border-border"
              style={{ backgroundColor: color.color }}
            />
            {color.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
