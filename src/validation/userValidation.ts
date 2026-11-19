import { z } from "zod";

const phoneRegex = /^\d{10}$/;

export const newUserSchema = z
  .object({
    firstName: z.string().trim().min(2, "First name must be at least 2 characters"),
    lastName: z.string().trim().min(2, "Last name must be at least 2 characters"),
    phone: z.string().trim().regex(phoneRegex, "Phone number must be 10 digits"),
    email: z.string().trim().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword && password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export type NewUserFormValues = z.infer<typeof newUserSchema>;
export type NewUserPayload = Omit<NewUserFormValues, "confirmPassword">;
