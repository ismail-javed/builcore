import { ListPage } from "@/components/buildcore/ListPage";
import { MetricCard, ProgressBar } from "@/components/buildcore/ui";
import { Card } from "@/components/ui/card";

const monthlyData = [
  { month: "Jan", leads: 8, revenue: 32 },
  { month: "Feb", leads: 11, revenue: 38 },
  { month: "Mar", leads: 9, revenue: 41 },
  { month: "Apr", leads: 14, revenue: 48 },
  { month: "May", leads: 12, revenue: 48 },
];

const funnel = [
  { stage: "Leads", count: 14, pct: 100 },
  { stage: "Quoted", count: 9, pct: 64 },
  { stage: "Agreement", count: 4, pct: 29 },
  { stage: "On-site", count: 6, pct: 43 },
];

export default function AnalyticsPage() {
  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <ListPage
      title="Analytics"
      subtitle="Pipeline, collections & conversion"
      actions={undefined}
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Lead → Quote" value="64%" delta="↑ 4% vs last month" />
        <MetricCard label="Quote → Close" value="44%" delta="↓ 2% vs last month" deltaTone="warn" />
        <MetricCard label="Avg. project duration" value="14 mo" delta="Turnkey avg." />
        <MetricCard label="NPS (clients)" value="72" delta="↑ Strong" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <h3 className="mb-4 text-sm font-semibold">Collections (₹ Lakhs)</h3>
          <div className="flex h-48 items-end justify-between gap-2">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-bc-blue transition-all"
                  style={{ height: `${(d.revenue / maxRevenue) * 100}%`, minHeight: 8 }}
                />
                <span className="text-[10px] text-muted-foreground">{d.month}</span>
                <span className="font-mono text-[10px] font-medium">₹{d.revenue}L</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="mb-4 text-sm font-semibold">Sales funnel</h3>
          <div className="space-y-4">
            {funnel.map((f) => (
              <div key={f.stage}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-medium">{f.stage}</span>
                  <span className="font-mono text-muted-foreground">{f.count}</span>
                </div>
                <ProgressBar value={f.pct} color="bg-bc-blue" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="mb-3 text-sm font-semibold">Top performers · May</h3>
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            { name: "Rohan Shah", metric: "₹1.8Cr pipeline", role: "Sales" },
            { name: "Kiran D.", metric: "4 projects on track", role: "PM" },
            { name: "Sneha R.", metric: "92% drawing SLA", role: "Architecture" },
          ].map((p) => (
            <div key={p.name} className="rounded-lg border border-border bg-bc-surface2/50 p-3">
              <p className="font-medium">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.role}</p>
              <p className="mt-1 text-sm text-bc-blue">{p.metric}</p>
            </div>
          ))}
        </div>
      </Card>
    </ListPage>
  );
}
