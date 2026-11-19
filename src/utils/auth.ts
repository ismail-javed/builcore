export type UserRole = "admin" | "client";

export interface BuildCoreUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  role_name: string;
  title?: string;
  is_admin?: boolean;
  accent_color?: string;
}

const DEMO_USERS: Record<
  string,
  { password: string; user: BuildCoreUser }
> = {
  "admin@buildcore.com": {
    password: "buildcore123",
    user: {
      id: "1",
      email: "admin@buildcore.com",
      first_name: "Rohan",
      last_name: "Shah",
      role: "admin",
      role_name: "admin",
      title: "Sales manager",
      is_admin: true,
      accent_color: "all",
    },
  },
  "client@buildcore.com": {
    password: "buildcore123",
    user: {
      id: "2",
      email: "client@buildcore.com",
      first_name: "Priya",
      last_name: "Verma",
      role: "client",
      role_name: "client",
      title: "Client",
      is_admin: false,
      accent_color: "green",
    },
  },
};

export function isDemoMode() {
  return !import.meta.env.VITE_API_URL;
}

/** Ensures accent picker fields exist (fixes older localStorage sessions). */
export function normalizeUser(user: BuildCoreUser): BuildCoreUser {
  const demoEntry = DEMO_USERS[user.email?.toLowerCase()];

  if (demoEntry) {
    return {
      ...demoEntry.user,
      ...user,
      is_admin: user.is_admin ?? demoEntry.user.is_admin,
      accent_color: user.accent_color ?? demoEntry.user.accent_color,
    };
  }

  if (user.role === "admin" || user.role_name === "admin") {
    return {
      ...user,
      is_admin: user.is_admin ?? true,
      accent_color: user.accent_color ?? "all",
    };
  }

  return {
    ...user,
    is_admin: user.is_admin ?? false,
    accent_color: user.accent_color ?? "green",
  };
}

export async function demoLogin(
  email: string,
  password: string,
): Promise<{ access_token: string; refresh_token: string; user: BuildCoreUser }> {
  await new Promise((r) => setTimeout(r, 400));
  const entry = DEMO_USERS[email.toLowerCase().trim()];
  if (!entry || entry.password !== password) {
    throw new Error("Invalid email or password");
  }
  const token = `demo-${entry.user.role}-${Date.now()}`;
  const user = normalizeUser(entry.user);
  localStorage.setItem("bc-user", JSON.stringify(user));
  return {
    access_token: token,
    refresh_token: `refresh-${token}`,
    user,
  };
}

export function getStoredUser(): BuildCoreUser | null {
  const raw = localStorage.getItem("bc-user");
  if (!raw) return null;
  try {
    const user = normalizeUser(JSON.parse(raw) as BuildCoreUser);
    const normalized = JSON.stringify(user);
    if (normalized !== raw) {
      localStorage.setItem("bc-user", normalized);
    }
    return user;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("bc-user");
}

export function getHomeRoute(role: UserRole) {
  return role === "admin" ? "/admin" : "/client";
}
