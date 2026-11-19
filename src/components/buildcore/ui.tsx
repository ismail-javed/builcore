import { cn } from "@/lib/utils";

const pillStyles = {
  new: "bg-bc-blue-bg text-bc-blue",
  quote: "bg-bc-amber-bg text-bc-amber",
  draw: "bg-bc-purple-bg text-bc-purple",
  agr: "bg-[#FBEAF0] text-[#993556]",
  wip: "bg-bc-green-bg text-bc-green",
  review: "bg-bc-amber-bg text-bc-amber",
  done: "bg-bc-green-bg text-bc-green",
  paid: "bg-bc-green-bg text-bc-green",
  due: "bg-bc-amber-bg text-bc-amber",
  upcoming: "bg-bc-surface2 text-muted-foreground",
  iter: "bg-bc-amber-bg text-bc-amber",
  urgent: "bg-bc-red-bg text-bc-red",
} as const;

export type PillVariant = keyof typeof pillStyles;

export function StatusPill({
  variant,
  children,
  className,
}: {
  variant: PillVariant;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap",
        pillStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function MetricCard({
  label,
  value,
  delta,
  deltaTone = "up",
}: {
  label: string;
  value: string;
  delta: string;
  deltaTone?: "up" | "warn" | "down";
}) {
  const toneClass = {
    up: "text-[#3B6D11]",
    warn: "text-bc-amber",
    down: "text-bc-red",
  }[deltaTone];

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="text-[26px] font-semibold leading-none text-foreground">{value}</p>
      <p className={cn("mt-1.5 flex items-center gap-1 text-[11px]", toneClass)}>{delta}</p>
    </div>
  );
}

export function ProgressBar({
  value,
  color = "bg-bc-green",
  className,
}: {
  value: number;
  color?: string;
  className?: string;
}) {
  return (
    <div className={cn("h-1.5 flex-1 overflow-hidden rounded-full bg-bc-surface2", className)}>
      <div
        className={cn("h-full rounded-full transition-all", color)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function UserAvatar({
  initials,
  bg,
  fg,
  size = "sm",
}: {
  initials: string;
  bg: string;
  fg: string;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "sm" ? "size-7.5 text-[11px]" : "size-9 text-[13px]";
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold",
        sizeClass,
      )}
      style={{ backgroundColor: bg, color: fg }}
    >
      {initials}
    </div>
  );
}

export function PageTopBar({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-card px-6 py-3.5">
      <div className="min-w-0 flex-1">
        <h1 className="text-base font-semibold text-foreground">{title}</h1>
        {subtitle && (
          <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
