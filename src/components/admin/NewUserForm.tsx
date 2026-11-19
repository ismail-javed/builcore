import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "@/services/userService";
import { newUserSchema, type NewUserFormValues } from "@/validation/userValidation";

interface NewUserFormProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

const passwordStrength = (value: string) => {
  if (!value) {
    return { label: "Weak", className: "bg-destructive/20" };
  }

  const score = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((rule) => rule.test(value)).length;

  if (value.length >= 8 && score >= 3) {
    return { label: "Strong", className: "bg-emerald-500" };
  }
  if (value.length >= 6 && score >= 2) {
    return { label: "Medium", className: "bg-amber-500" };
  }

  return { label: "Weak", className: "bg-destructive/20" };
};

export function NewUserForm({ open = true, onOpenChange, onSuccess }: NewUserFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<NewUserFormValues>({
    resolver: zodResolver(newUserSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");
  const strength = useMemo(() => passwordStrength(passwordValue ?? ""), [passwordValue]);

  useEffect(() => {
    if (!open) return;
    const firstField = document.getElementById("firstName");
    firstField?.focus();
  }, [open]);

  const closeForm = () => {
    reset();
    onOpenChange?.(false);
  };

  const onSubmit = async (data: NewUserFormValues) => {
    setIsSubmitting(true);

    try {
      const payload = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        phone: data.phone.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
      };

      await createUser(payload);
      toast.success("User created successfully");
      reset();
      onSuccess?.();
      closeForm();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to create user";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 px-3 py-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-xl border border-border bg-card shadow-2xl">
        <Card className="border-0 shadow-none">
          <CardHeader className="space-y-1 border-b border-border px-5 py-4 sm:px-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle className="text-lg">Create new user</CardTitle>
                <CardDescription className="mt-1">Add a new team member with secure access.</CardDescription>
              </div>
              <Button type="button" variant="ghost" size="sm" className="h-8 px-2" onClick={closeForm}>
                Close
              </Button>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <CardContent className="space-y-4 px-5 py-4 sm:px-6 sm:py-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name *</Label>
                  <Input id="firstName" autoFocus autoComplete="given-name" aria-invalid={!!errors.firstName} aria-describedby="firstName-error" {...register("firstName")} />
                  {errors.firstName && <p id="firstName-error" className="text-sm text-destructive">{errors.firstName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name *</Label>
                  <Input id="lastName" autoComplete="family-name" aria-invalid={!!errors.lastName} aria-describedby="lastName-error" {...register("lastName")} />
                  {errors.lastName && <p id="lastName-error" className="text-sm text-destructive">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number *</Label>
                  <Input id="phone" inputMode="numeric" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby="phone-error" {...register("phone")} />
                  {errors.phone && <p id="phone-error" className="text-sm text-destructive">{errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address *</Label>
                  <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby="email-error" {...register("email")} />
                  {errors.email && <p id="email-error" className="text-sm text-destructive">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input id="password" type={showPassword ? "text" : "password"} autoComplete="new-password" className="pr-10" aria-invalid={!!errors.password} aria-describedby="password-error" {...register("password")} />
                    <button type="button" tabIndex={-1} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPassword((value) => !value)}>
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-bc-surface2">
                      <div className={"h-full rounded-full transition-all " + strength.className} style={{ width: passwordValue ? (strength.label === "Strong" ? "100%" : strength.label === "Medium" ? "70%" : "35%") : "0%" }} />
                    </div>
                    <span className="text-[11px] font-medium text-muted-foreground">{strength.label}</span>
                  </div>
                  {errors.password && <p id="password-error" className="text-sm text-destructive">{errors.password.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm password *</Label>
                  <div className="relative">
                    <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} autoComplete="new-password" className="pr-10" aria-invalid={!!errors.confirmPassword} aria-describedby="confirmPassword-error" {...register("confirmPassword")} />
                    <button type="button" tabIndex={-1} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowConfirmPassword((value) => !value)}>
                      {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p id="confirmPassword-error" className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
              <Button type="button" variant="outline" onClick={closeForm} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" /> Creating...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 size-4" /> Create user
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
