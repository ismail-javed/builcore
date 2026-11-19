import { HardHat, Users } from "lucide-react";
import { ListPage } from "@/components/buildcore/ListPage";
import { ProgressBar, StatusPill } from "@/components/buildcore/ui";
import { Card } from "@/components/ui/card";
import { siteOps } from "@/data/mock";

export default function SiteOpsPage() {
  return (
    <ListPage
      title="Site ops"
      subtitle="On-site milestones & crew allocation"
      searchPlaceholder="Filter by project..."
      addLabel="Log site update"
      filterChips={["All", "On track", "At risk", "Delayed"]}
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { icon: HardHat, label: "Active sites", value: "6" },
          { icon: Users, label: "Crew on-site", value: "38" },
          { label: "Safety incidents", value: "0", month: "this month" },
        ].map((s) => (
          <Card key={s.label} className="flex items-center gap-3 p-4">
            {"icon" in s && s.icon && (
              <div className="flex size-10 items-center justify-center rounded-lg bg-bc-green-bg text-bc-green">
                <s.icon className="size-5" />
              </div>
            )}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-semibold">{s.value}</p>
              {"month" in s && <p className="text-[10px] text-muted-foreground">{s.month}</p>}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {siteOps.map((site) => (
          <Card key={site.id} className="p-4">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <p className="font-semibold">{site.project}</p>
                <p className="text-xs text-muted-foreground">{site.milestone} · {site.supervisor}</p>
              </div>
              <StatusPill variant={site.status === "due" ? "due" : "wip"}>
                {site.status === "due" ? "At risk" : "On track"}
              </StatusPill>
            </div>
            <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="size-3.5" /> {site.crew} workers on-site
            </div>
            <div className="flex items-center gap-2">
              <ProgressBar value={site.progress} color={site.status === "due" ? "bg-[#BA7517]" : "bg-[#1D9E75]"} />
              <span className="font-mono text-[11px]">{site.progress}%</span>
            </div>
          </Card>
        ))}
      </div>
    </ListPage>
  );
}
