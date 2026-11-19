import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Building2,
  ClipboardCheck,
  Eye,
  EyeOff,
  FileText,
  Loader2,
  Receipt,
  Shield,
} from "lucide-react";
import { getHomeRoute, isDemoMode, normalizeUser, type BuildCoreUser, type UserRole } from "@/utils/auth";
import { loginRequest, showApiError } from "@/utils/apiClient";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  ip: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition hover:bg-white/10">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
        <Icon className="size-5 text-white" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <p className="mt-0.5 text-xs text-white/70">{description}</p>
      </div>
    </div>
  );
}

export default function Login() {
  const [isLoadingIp, setIsLoadingIp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", ip: "" },
  });

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = (await response.json()) as { ip?: string };
        setValue("ip", data.ip || "0.0.0.0", { shouldValidate: true });
      } catch {
        setValue("ip", "0.0.0.0", { shouldValidate: true });
      } finally {
        setIsLoadingIp(false);
      }
    };
    void fetchIp();
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    if (isLoadingIp) {
      toast.error("Loading security check... Please wait.");
      return;
    }

    try {
      const result = await loginRequest({
        email: data.email.trim(),
        password: data.password,
        ip: data.ip.trim() || "0.0.0.0",
      });

      if (result.access_token) {
        localStorage.setItem("accessToken", result.access_token);
      }
      if (result.refresh_token) {
        localStorage.setItem("refreshToken", result.refresh_token);
      }
      if (result.user) {
        localStorage.setItem(
          "bc-user",
          JSON.stringify(normalizeUser(result.user as BuildCoreUser)),
        );
      }

      const role = (result.user?.role ?? "client") as UserRole;
      toast.success("Logged in successfully. Redirecting...");
      navigate(getHomeRoute(role), { replace: true });
    } catch (error) {
      showApiError(error, "Unable to login. Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 lg:flex lg:w-1/2 xl:w-[55%]">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 flex w-full flex-col justify-between p-8 xl:p-12">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl border border-white/20 bg-white/20">
              <Building2 className="size-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">BuildCore</h1>
              <p className="text-sm text-white/70">Construction management</p>
            </div>
          </div>

          <div className="max-w-lg">
            <h2 className="mb-4 text-3xl font-semibold leading-tight text-white xl:text-4xl">
              From lead to handover — one platform for your build
            </h2>
            <p className="mb-8 text-base text-white/80 xl:text-lg">
              Manage leads, drawings, agreements, payments, and client collaboration
              in a single workspace built for construction teams.
            </p>
            <div className="grid gap-3">
              <FeatureCard icon={FileText} title="Drawing review" description="Pin comments on plans with iteration tracking" />
              <FeatureCard icon={Receipt} title="Payment milestones" description="Track collections and client instalments" />
              <FeatureCard icon={ClipboardCheck} title="Project pipeline" description="Leads, agreements, and on-site progress" />
              <FeatureCard icon={Shield} title="Role-based portals" description="Separate admin and client experiences" />
            </div>
          </div>

          <div className="flex gap-8 border-t border-white/20 pt-6">
            <div>
              <p className="text-2xl font-semibold text-white">120+</p>
              <p className="text-sm text-white/70">Projects delivered</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">₹850Cr+</p>
              <p className="text-sm text-white/70">Pipeline value</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">99.9%</p>
              <p className="text-sm text-white/70">Uptime</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-6 sm:p-8 lg:w-1/2 xl:w-[45%]">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary">
              <Building2 className="size-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">BuildCore</h1>
              <p className="text-sm text-muted-foreground">Construction management</p>
            </div>
          </div>

          <Card className="border-border/50 shadow-lg">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>
                Sign in to your BuildCore account
                {isDemoMode() && (
                  <span className="mt-2 block rounded-md bg-accent px-2 py-1.5 text-xs text-accent-foreground">
                    Demo: admin@buildcore.com or client@buildcore.com · password{" "}
                    <strong>buildcore123</strong>
                  </span>
                )}
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pr-10"
                      autoComplete="current-password"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password.message}</p>
                  )}
                </div>
                <input type="hidden" {...register("ip")} />
              </CardContent>

              <CardFooter className="flex-col gap-4 pt-2">
                <Button type="submit" className="h-11 w-full" disabled={isSubmitting || isLoadingIp}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" /> Signing in...
                    </>
                  ) : isLoadingIp ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" /> Initializing...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield className="size-3" />
                  <span>Secured with enterprise-grade encryption</span>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
