import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { toast } from "sonner";
import { clearSession, demoLogin, getStoredUser, isDemoMode, normalizeUser } from "./auth";

const baseURL = import.meta.env.VITE_API_URL as string | undefined;

interface RetriableRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const apiClient = axios.create({
  baseURL: baseURL || undefined,
  withCredentials: true,
});

export const refreshAccessToken = async (): Promise<string> => {
  if (isDemoMode()) {
    const token = localStorage.getItem("accessToken");
    if (token) return token;
    throw new Error("Missing demo token");
  }

  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("Missing refresh token");

  const response = await axios.post(
    `${baseURL}/refresh-token`,
    { refresh_token: refreshToken },
    { withCredentials: true },
  );

  const newAccessToken = response.data?.access_token;
  if (!newAccessToken) throw new Error("Failed to obtain new access token");
  localStorage.setItem("accessToken", newAccessToken);
  return newAccessToken;
};

const handleUnauthorized = () => {
  clearSession();
  window.location.replace("/login");
};

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = token;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetriableRequestConfig | undefined;
    if (
      error.response?.status === 401 &&
      original &&
      !original._retry &&
      !isDemoMode()
    ) {
      original._retry = true;
      try {
        const token = await refreshAccessToken();
        original.headers = original.headers ?? {};
        original.headers.Authorization = token;
        return apiClient(original);
      } catch {
        handleUnauthorized();
      }
    }
    return Promise.reject(error);
  },
);

export async function loginRequest(payload: {
  email: string;
  password: string;
  ip: string;
}) {
  if (isDemoMode()) {
    return demoLogin(payload.email, payload.password);
  }

  const response = await axios.post(`${baseURL}/login`, payload, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

export async function validateSessionRequest() {
  if (isDemoMode()) {
    const user = getStoredUser();
    const token = localStorage.getItem("accessToken");
    if (!user || !token) throw new Error("Invalid demo session");
    return { data: { role_name: user.role_name, user: normalizeUser(user) } };
  }

  return apiClient.post("/validate-session", {});
}

export function showApiError(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    toast.error(
      (error.response?.data as { message?: string; error?: string })?.message ||
        (error.response?.data as { error?: string })?.error ||
        fallback,
    );
    return;
  }
  if (error instanceof Error) {
    toast.error(error.message);
    return;
  }
  toast.error(fallback);
}
