import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { BuildCoreUser } from "@/utils/auth";
import { getStoredUser, normalizeUser } from "@/utils/auth";
import { apiClient, validateSessionRequest } from "@/utils/apiClient";

interface UserContextValue {
  user: BuildCoreUser | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextValue>({
  user: null,
  isLoading: true,
  refreshUser: async () => {},
});

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<BuildCoreUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const response = await validateSessionRequest();
      const sessionUser =
        (response.data as { user?: BuildCoreUser }).user ?? getStoredUser();
      setUser(sessionUser ? normalizeUser(sessionUser) : null);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  const value = useMemo(
    () => ({ user, isLoading, refreshUser }),
    [user, isLoading, refreshUser],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}

export { apiClient };
