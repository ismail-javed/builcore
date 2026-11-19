import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Briefcase,
  FileText,
  Plus,
  Upload,
  UserPlus,
  Users,
} from "lucide-react";
import {
  MetricCard,
  PageTopBar,
  ProgressBar,
  StatusPill,
  UserAvatar,
} from "@/components/buildcore/ui";
import { NewUserForm } from "@/components/admin/NewUserForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const leads = [
  { initials: "AK", name: "Anita Kapoor", sub: "Turnkey · 3BHK · Pune", amount: "₹82L", pill: "quote" as const, bg: "#E6F1FB", fg: "#185FA5" },
  { initials: "SM", name: "Suresh Mehta", sub: "Structure only · 240 sqyd", amount: "₹36L", pill: "new" as const, bg: "#E1F5EE", fg: "#0F6E56" },
  { initials: "PV", name: "Priya Verma", sub: "Turnkey · Villa · Custom pkg", amount: "₹1.4Cr", pill: "draw" as const, bg: "#EEEDFE", fg: "#534AB7" },
  { initials: "RN", name: "Rahul Nair", sub: "Turnkey · 4BHK · Nashik", amount: "₹1.1Cr", pill: "agr" as const, bg: "#FAEEDA", fg: "#854F0B" },
];

const milestones = [
  { name: "Kapoor Villa · Foundation", pct: 85, color: "bg-[#1D9E75]", tone: "text-[#3B6D11]" },
  { name: "Sharma 3BHK · Structure", pct: 60, color: "bg-bc-blue", tone: "text-bc-blue" },
  { name: "Mehta Bungalow · Finishing", pct: 40, color: "bg-[#BA7517]", tone: "text-bc-amber" },
  { name: "Verma Villa · Drawings", pct: 20, color: "bg-bc-purple", tone: "text-bc-purple" },
  { name: "Nair 4BHK · Agreement", pct: 10, color: "bg-[#D4537E]", tone: "text-[#993556]" },
];

const projects = [
  { client: "Kapoor Villa", sub: "Pune · Turnkey", pkg: "Premium Plus", pm: "Kiran D.", stage: "wip" as const, pct: 85, due: "12 May" },
  { client: "Sharma 3BHK", sub: "Nagpur · Structure", pkg: "Structure Std.", pm: "Amit S.", stage: "wip" as const, pct: 60, due: "19 May" },
  { client: "Verma Villa", sub: "Mumbai · Turnkey", pkg: "Custom", pm: "Kiran D.", stage: "draw" as const, pct: 20, due: "10 May" },
  { client: "Nair 4BHK", sub: "Nashik · Turnkey", pkg: "Premium Std.", pm: "Ravi M.", stage: "agr" as const, pct: 10, due: "15 May" },
];

const activity = [
  { icon: Upload, text: "Drawing v2 uploaded — Verma Villa", sub: "Sneha R. · 2 hrs ago", bg: "bg-bc-green-bg", fg: "text-bc-green" },
  { icon: Briefcase, text: "Payment received ₹8L — Kapoor Villa", sub: "Auto-logged · 4 hrs ago", bg: "bg-bc-amber-bg", fg: "text-bc-amber" },
  { icon: FileText, text: "Agreement drafted — Nair 4BHK", sub: "Ravi M. · Yesterday", bg: "bg-bc-purple-bg", fg: "text-bc-purple" },
  { icon: UserPlus, text: "New lead onboarded — Suresh Mehta", sub: "Rohan S. · Yesterday", bg: "bg-bc-blue-bg", fg: "text-bc-blue" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);
  const today = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <>
      <PageTopBar
        title="Dashboard"
        subtitle={today}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Bell className="size-3.5" /> 3 alerts
            </Button>
            <Button size="sm" variant="outline" onClick={() => setIsNewUserOpen(true)}>
              <UserPlus className="size-3.5" /> New user
            </Button>
            <Button size="sm" onClick={() => navigate("/admin/leads/new")}>
              <Plus className="size-3.5" /> New lead
            </Button>
          </>
        }
      />

      <NewUserForm open={isNewUserOpen} onOpenChange={setIsNewUserOpen} />

      <div className="space-y-5 p-6">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Active leads" value="14" delta="↑ +3 this week" />
          <MetricCard label="Projects on-site" value="6" delta="✓ 4 on schedule" />
          <MetricCard label="Drawings pending" value="5" delta="⏱ 2 overdue" deltaTone="warn" />
          <MetricCard label="Collections · May" value="₹48L" delta="↑ 72% of target" />
        </div>

        <div className="grid gap-3.5 lg:grid-cols-2">
          <Card className="p-4">
            <div className="mb-3.5 flex items-center justify-between">
              <h2 className="flex items-center gap-1.5 text-[13px] font-semibold">
                <Users className="size-4 text-muted-foreground" /> Lead pipeline
              </h2>
              <button type="button" className="text-[11px] text-bc-blue hover:underline">
                View all →
              </button>
            </div>
            <div className="divide-y divide-border">
              {leads.map((lead) => (
                <div key={lead.name} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                  <UserAvatar initials={lead.initials} bg={lead.bg} fg={lead.fg} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium">{lead.name}</p>
                    <p className="text-[11px] text-muted-foreground">{lead.sub}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-semibold">{lead.amount}</p>
                    <div className="mt-1">
                      <StatusPill variant={lead.pill}>
                        {lead.pill === "quote" ? "Quoted" : lead.pill === "new" ? "New" : lead.pill === "draw" ? "Drawings" : "Agreement"}
                      </StatusPill>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <div className="mb-3.5 flex items-center justify-between">
              <h2 className="text-[13px] font-semibold">Project milestones</h2>
              <button type="button" className="text-[11px] text-bc-blue hover:underline">
                All projects →
              </button>
            </div>
            <div className="space-y-3">
              {milestones.map((m) => (
                <div key={m.name}>
                  <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
                    <span>{m.name}</span>
                    <span className={cnMono(m.tone)}>{m.pct}%</span>
                  </div>
                  <ProgressBar value={m.pct} color={m.color} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between border-b border-border p-4">
            <h2 className="flex items-center gap-1.5 text-[13px] font-semibold">
              <Briefcase className="size-4 text-muted-foreground" /> Active projects
            </h2>
            <div className="flex gap-1.5">
              <Button variant="secondary" size="sm">Table</Button>
              <Button variant="outline" size="sm">Board</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-xs">
              <thead>
                <tr className="bg-bc-surface2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {["Client", "Package", "Project manager", "Stage", "Progress", "Next due"].map((h) => (
                    <th key={h} className="px-3 py-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.client} className="border-t border-border hover:bg-bc-surface2/50">
                    <td className="px-3 py-2.5">
                      <p className="text-[13px] font-medium">{p.client}</p>
                      <p className="text-[11px] text-muted-foreground">{p.sub}</p>
                    </td>
                    <td className="px-3 py-2.5">{p.pkg}</td>
                    <td className="px-3 py-2.5">{p.pm}</td>
                    <td className="px-3 py-2.5">
                      <StatusPill variant={p.stage}>
                        {p.stage === "wip" ? "On-site" : p.stage === "draw" ? "Drawings" : "Agreement"}
                      </StatusPill>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <ProgressBar value={p.pct} color={p.pct > 50 ? "bg-[#1D9E75]" : "bg-bc-blue"} />
                        <span className="font-mono text-[11px] text-muted-foreground w-8 text-right">{p.pct}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 font-mono text-xs">{p.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="mb-3 text-[13px] font-semibold">Recent activity</h2>
          <div className="grid gap-x-7 md:grid-cols-2">
            {activity.map((a) => (
              <div key={a.text} className="flex gap-2.5 border-b border-border py-2 last:border-0">
                <div className={`flex size-7.5 shrink-0 items-center justify-center rounded-full ${a.bg} ${a.fg}`}>
                  <a.icon className="size-3.5" />
                </div>
                <div>
                  <p className="text-xs font-medium">{a.text}</p>
                  <p className="text-[11px] text-muted-foreground">{a.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

function cnMono(extra: string) {
  return `font-mono font-medium ${extra}`;
}
