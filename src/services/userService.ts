import axios from "axios";
import { apiClient } from "@/utils/apiClient";
import type { NewUserPayload } from "@/validation/userValidation";

export async function createUser(payload: NewUserPayload) {
  try {
    const response = await apiClient.post("/users", payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const apiMessage =
        (error.response?.data as { message?: string; error?: string } | undefined)?.message ||
        (error.response?.data as { message?: string; error?: string } | undefined)?.error;

      if (status === 409) {
        throw new Error("A user with this email or phone already exists.");
      }
      if (status === 401) {
        throw new Error("Your session expired. Please sign in again.");
      }
      if (status === 403) {
        throw new Error("You do not have permission to create users.");
      }
      if (status && status >= 500) {
        throw new Error("The server is currently unavailable. Please try again shortly.");
      }
      if (apiMessage) {
        throw new Error(apiMessage);
      }
    }

    throw new Error("Unable to create user right now.");
  }
}
