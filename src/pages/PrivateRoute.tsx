import { Loader2 } from "lucide-react";
import { useEffect, useState, type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { clearSession, getHomeRoute, type UserRole } from "@/utils/auth";
import { refreshAccessToken, validateSessionRequest } from "@/utils/apiClient";

interface PrivateRouteProps extends PropsWithChildren {
  allowedRoles?: UserRole[];
}

export default function PrivateRoute({
  children,
  allowedRoles,
}: PrivateRouteProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validate = async () => {
      let accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        try {
          accessToken = await refreshAccessToken();
        } catch {
          clearSession();
          navigate("/login", { replace: true });
          setIsLoading(false);
          return;
        }
      }

      try {
        const response = await validateSessionRequest();
        const role = response.data.role_name as UserRole;

        if (allowedRoles && !allowedRoles.includes(role)) {
          navigate(getHomeRoute(role), { replace: true });
          setIsLoading(false);
          return;
        }

        setIsLoading(false);
      } catch {
        clearSession();
        navigate("/login", { replace: true });
        setIsLoading(false);
      }
    };

    void validate();
  }, [allowedRoles, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
