import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter, isRouteErrorResponse, Navigate, useRouteError } from "react-router";
import { UserProvider } from "@/providers/UserProvider";
import PrivateRoute from "@/pages/PrivateRoute";
import { AppLayout } from "@/layouts/AppLayout";
import { Loader2 } from "lucide-react";

const Login = lazy(() => import("@/pages/Login"));
const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminLeads = lazy(() => import("@/pages/admin/Leads"));
const AdminNewLead = lazy(() => import("@/pages/admin/NewLead"));
const AdminProjects = lazy(() => import("@/pages/admin/Projects"));
const AdminAgreements = lazy(() => import("@/pages/admin/Agreements"));
const AdminArchitecture = lazy(() => import("@/pages/admin/Architecture"));
const AdminSiteOps = lazy(() => import("@/pages/admin/SiteOps"));
const AdminPayments = lazy(() => import("@/pages/admin/Payments"));
const AdminPackages = lazy(() => import("@/pages/admin/Packages"));
const AdminAnalytics = lazy(() => import("@/pages/admin/Analytics"));
const AdminSettings = lazy(() => import("@/pages/admin/Settings"));
const ClientHome = lazy(() => import("@/pages/client/Home"));
const ClientProject = lazy(() => import("@/pages/client/Project"));
const ClientPackage = lazy(() => import("@/pages/client/Package"));
const ClientDrawings = lazy(() => import("@/pages/client/Drawings"));
const DrawingReview = lazy(() => import("@/pages/client/DrawingReview"));
const ClientAgreement = lazy(() => import("@/pages/client/Agreement"));
const ClientPayments = lazy(() => import("@/pages/client/Payments"));
const ClientMessages = lazy(() => import("@/pages/client/Messages"));
const ClientHelp = lazy(() => import("@/pages/client/Help"));

function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="size-8 animate-spin text-primary" />
    </div>
  );
}

function withSuspense(node: ReactNode) {
  return <Suspense fallback={<Loading />}>{node}</Suspense>;
}

function RouteErrorBoundary() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? error.statusText || error.data?.message || "Something went wrong"
    : error instanceof Error
      ? error.message
      : "Something went wrong";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-10">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-center shadow-sm">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">We hit an unexpected issue. Please refresh the page and try again.</p>
        <p className="mt-4 text-sm text-destructive">{message}</p>
        <button type="button" className="mt-5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" onClick={() => window.location.reload()}>
          Reload page
        </button>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  { path: "/login", element: withSuspense(<Login />), errorElement: <RouteErrorBoundary /> },
  { path: "/", element: <Navigate to="/login" replace />, errorElement: <RouteErrorBoundary /> },
  {
    path: "/admin",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <UserProvider>
          <AppLayout portal="admin" />
        </UserProvider>
      </PrivateRoute>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: withSuspense(<AdminDashboard />) },
      { path: "leads", element: withSuspense(<AdminLeads />) },
      { path: "leads/new", element: withSuspense(<AdminNewLead />) },
      { path: "projects", element: withSuspense(<AdminProjects />) },
      { path: "agreements", element: withSuspense(<AdminAgreements />) },
      { path: "architecture", element: withSuspense(<AdminArchitecture />) },
      { path: "site-ops", element: withSuspense(<AdminSiteOps />) },
      { path: "payments", element: withSuspense(<AdminPayments />) },
      { path: "packages", element: withSuspense(<AdminPackages />) },
      { path: "analytics", element: withSuspense(<AdminAnalytics />) },
      { path: "settings", element: withSuspense(<AdminSettings />) },
    ],
  },
  {
    path: "/client",
    element: (
      <PrivateRoute allowedRoles={["client"]}>
        <UserProvider>
          <AppLayout portal="client" />
        </UserProvider>
      </PrivateRoute>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: withSuspense(<ClientHome />) },
      { path: "project", element: withSuspense(<ClientProject />) },
      { path: "package", element: withSuspense(<ClientPackage />) },
      { path: "drawings", element: withSuspense(<ClientDrawings />) },
      { path: "drawings/review", element: withSuspense(<DrawingReview />) },
      { path: "agreement", element: withSuspense(<ClientAgreement />) },
      { path: "payments", element: withSuspense(<ClientPayments />) },
      { path: "messages", element: withSuspense(<ClientMessages />) },
      { path: "help", element: withSuspense(<ClientHelp />) },
    ],
  },
  { path: "*", element: <Navigate to="/login" replace />, errorElement: <RouteErrorBoundary /> },
]);

export default router;
