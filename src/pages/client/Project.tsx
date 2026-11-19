import { Calendar, MapPin, User } from "lucide-react";
import { PageTopBar, ProgressBar, StatusPill } from "@/components/buildcore/ui";
import { Card } from "@/components/ui/card";
import { projectMilestones } from "@/data/mock";

export default function ClientProjectPage() {
  return (
    <>
      <PageTopBar
        title="My project"
        subtitle="Verma Villa · Mumbai · Turnkey"
      />
      <div className="space-y-4 p-6">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { icon: MapPin, label: "Plot size", value: "2,400 sq ft" },
            { icon: User, label: "Project manager", value: "Kiran D." },
            { icon: Calendar, label: "Est. handover", value: "Dec 2026" },
          ].map((item) => (
            <Card key={item.label} className="flex items-center gap-3 p-4">
              <div className="flex size-9 items-center justify-center rounded-lg bg-bc-blue-bg text-bc-blue">
                <item.icon className="size-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.label}</p>
                <p className="font-medium">{item.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Overall progress</h2>
            <span className="font-mono text-sm font-semibold text-bc-green">20%</span>
          </div>
          <ProgressBar value={20} color="bg-[#1D9E75]" className="h-2" />
          <p className="mt-2 text-xs text-muted-foreground">Pre-construction · Drawings & review phase</p>
        </Card>

        <Card className="p-4">
          <h2 className="mb-4 text-sm font-semibold">Milestone timeline</h2>
          <div className="relative space-y-0">
            {projectMilestones.map((m, i) => (
              <div key={m.name} className="flex gap-4 pb-6 last:pb-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`size-3 rounded-full ${
                      m.status === "done"
                        ? "bg-[#1D9E75]"
                        : m.status === "wip"
                          ? "bg-bc-blue ring-4 ring-bc-blue-bg"
                          : "bg-border"
                    }`}
                  />
                  {i < projectMilestones.length - 1 && (
                    <div className={`mt-1 w-px flex-1 min-h-[40px] ${m.status === "done" ? "bg-[#1D9E75]" : "bg-border"}`} />
                  )}
                </div>
                <div className="flex-1 pt-[-2px]">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{m.name}</p>
                    <StatusPill variant={m.status === "done" ? "done" : m.status === "wip" ? "review" : "upcoming"}>
                      {m.status === "done" ? "Complete" : m.status === "wip" ? "In progress" : "Upcoming"}
                    </StatusPill>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{m.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="mb-3 text-sm font-semibold">Site team</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { name: "Sneha R.", role: "Lead architect" },
              { name: "Rohan S.", role: "Sales contact" },
              { name: "Kiran D.", role: "Project manager" },
              { name: "Vikram T.", role: "Site supervisor (from Jun)" },
            ].map((t) => (
              <div key={t.name} className="rounded-lg border border-border px-3 py-2">
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
