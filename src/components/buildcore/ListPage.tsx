import { Filter, Plus, Search } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { PageTopBar } from "@/components/buildcore/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function PageHeader({ title }: { title: string }) {
  return <h2 className="text-sm font-semibold text-primary">{title}</h2>;
}

interface ListPageProps {
  title: string;
  subtitle?: string;
  searchPlaceholder?: string;
  addLabel?: string;
  filterChips?: string[];
  actions?: ReactNode;
  onSearch?: (query: string) => void;
  children: ReactNode;
}

export function ListPage({
  title,
  subtitle,
  searchPlaceholder = "Search...",
  addLabel,
  filterChips,
  actions,
  onSearch,
  children,
}: ListPageProps) {
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState(filterChips?.[0] ?? "All");

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch?.(value);
  };

  return (
    <>
      <PageTopBar
        title={title}
        subtitle={subtitle}
        actions={
          actions ??
          (addLabel ? (
            <Button size="sm">
              <Plus className="size-3.5" /> {addLabel}
            </Button>
          ) : undefined)
        }
      />
      <div className="space-y-4 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="h-9 pl-9"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {filterChips && (
              <div className="flex flex-wrap gap-1">
                {filterChips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setActiveChip(chip)}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
                      activeChip === chip
                        ? "border-bc-blue/40 bg-bc-blue-bg text-bc-blue"
                        : "border-border text-muted-foreground hover:bg-bc-surface2",
                    )}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
            <Button variant="outline" size="sm">
              <Filter className="size-3.5" /> Filters
            </Button>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}

export function useClientFilter<T>(
  items: T[],
  query: string,
  keys: (item: T) => string[],
) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      keys(item).some((k) => k.toLowerCase().includes(q)),
    );
  }, [items, query, keys]);
}

export function PaginationBar({
  page,
  total,
  pageSize = 10,
}: {
  page: number;
  total: number;
  pageSize?: number;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
      <span>
        Showing {Math.min(total, pageSize)} of {total} records
      </span>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="sm" disabled={page <= 1}>
          Previous
        </Button>
        <span className="px-2 font-mono">
          {page} / {pages}
        </span>
        <Button variant="outline" size="sm" disabled={page >= pages}>
          Next
        </Button>
      </div>
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 max-w-sm text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
