import {
  Bell,
  Check,
  File,
  MapPin,
  MessageSquare,
  Pencil,
  Receipt,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  PageTopBar,
  StatusPill,
  UserAvatar,
} from "@/components/buildcore/ui";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@/providers/UserProvider";

const stages = [
  { label: "Lead &\npackage", state: "done" as const },
  { label: "Booking\npayment", state: "done" as const },
  { label: "Drawings\n& review", state: "active" as const },
  { label: "Agreement\nsign", state: "pending" as const, num: 4 },
  { label: "Construction\nstarts", state: "pending" as const, num: 5 },
  { label: "Handover", state: "pending" as const, num: 6 },
];

export default function ClientHome() {
  const { user } = useUser();

  return (
    <>
      <PageTopBar
        title={`Welcome back, ${user?.first_name ?? "there"}`}
        subtitle="Verma Villa · Turnkey · Custom package"
        actions={
          <Button variant="outline" size="sm">
            <Bell className="size-3.5" /> 2
          </Button>
        }
      />

      <div className="space-y-4 p-6">
        <div className="flex flex-col gap-4 rounded-xl bg-bc-green p-5 text-bc-green-bg shadow-md sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[15px] font-semibold">
              Your architect has uploaded drawing revision 2
            </p>
            <p className="mt-1 text-xs text-[#5DCAA5]">
              Please review and share feedback before 10 May · 1 of 3 iterations used
            </p>
          </div>
          <Link to="/client/drawings/review">
            <Button className="shrink-0 bg-bc-green-bg text-[#085041] hover:bg-bc-green-bg/90 border-0">
              Review drawings →
            </Button>
          </Link>
        </div>

        <Card className="p-4">
          <h2 className="mb-4 flex items-center gap-1.5 text-[13px] font-semibold">
            <MapPin className="size-4 text-muted-foreground" /> Project journey
          </h2>
          <div className="flex items-start overflow-x-auto pb-2">
            {stages.map((stage, i) => (
              <div key={stage.label} className="flex min-w-0 flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex size-8 items-center justify-center rounded-full border-2 text-[13px] font-semibold ${
                      stage.state === "done"
                        ? "border-[#1D9E75] bg-[#1D9E75] text-white"
                        : stage.state === "active"
                          ? "border-[#1D9E75] bg-card text-[#1D9E75]"
                          : "border-border bg-bc-surface2 text-muted-foreground"
                    }`}
                  >
                    {stage.state === "done" ? (
                      <Check className="size-3.5" />
                    ) : stage.state === "active" ? (
                      <Pencil className="size-3.5" />
                    ) : (
                      stage.num
                    )}
                  </div>
                  <p
                    className={`mt-1.5 max-w-[60px] whitespace-pre-line text-center text-[10px] leading-tight ${
                      stage.state === "active"
                        ? "font-semibold text-[#1D9E75]"
                        : "text-muted-foreground"
                    }`}
                  >
                    {stage.label}
                  </p>
                </div>
                {i < stages.length - 1 && (
                  <div
                    className={`mb-5 h-0.5 flex-1 ${
                      stage.state === "done" ? "bg-[#1D9E75]" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-3 md:grid-cols-3">
          {[
            { icon: Pencil, title: "Review drawings", sub: "Revision 2 ready", to: "/client/drawings/review", bg: "bg-bc-green-bg", fg: "text-bc-green" },
            { icon: Receipt, title: "Pay instalment", sub: "₹12L due · 20 May", to: "/client/payments", bg: "bg-bc-amber-bg", fg: "text-bc-amber" },
            { icon: MessageSquare, title: "Messages", sub: "2 unread", to: "/client/messages", bg: "bg-bc-blue-bg", fg: "text-bc-blue" },
          ].map((action) => (
            <Link
              key={action.title}
              to={action.to}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 shadow-sm transition hover:-translate-y-px hover:shadow-md"
            >
              <div className={`flex size-9 items-center justify-center rounded-lg ${action.bg} ${action.fg}`}>
                <action.icon className="size-4.5" />
              </div>
              <div>
                <p className="text-xs font-semibold">{action.title}</p>
                <p className="text-[11px] text-muted-foreground">{action.sub}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid gap-3.5 lg:grid-cols-2">
          <Card className="p-4">
            <div className="mb-3 flex justify-between">
              <h2 className="flex items-center gap-1.5 text-[13px] font-semibold">
                <Receipt className="size-4 text-muted-foreground" /> Payments
              </h2>
              <button type="button" className="text-[11px] text-bc-blue">Full schedule →</button>
            </div>
            {[
              { name: "Booking amount", date: "Paid 1 Apr 2026", amount: "₹5L", pill: "paid" as const },
              { name: "Design milestone", date: "Due 20 May 2026", amount: "₹12L", pill: "due" as const },
              { name: "Foundation stage", date: "After agreement sign", amount: "₹28L", pill: "upcoming" as const },
            ].map((p) => (
              <div key={p.name} className="flex items-center justify-between border-b border-border py-2 last:border-0">
                <div>
                  <p className="text-xs font-medium">{p.name}</p>
                  <p className="text-[11px] text-muted-foreground">{p.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-semibold">{p.amount}</p>
                  <div className="mt-1">
                    <StatusPill variant={p.pill}>
                      {p.pill === "paid" ? "Paid" : p.pill === "due" ? "Due soon" : "Upcoming"}
                    </StatusPill>
                  </div>
                </div>
              </div>
            ))}
          </Card>

          <Card className="p-4">
            <div className="mb-3 flex justify-between">
              <h2 className="flex items-center gap-1.5 text-[13px] font-semibold">
                <Pencil className="size-4 text-muted-foreground" /> Drawings
              </h2>
              <button type="button" className="text-[11px] text-bc-blue">View all →</button>
            </div>
            {[
              { name: "Floor plan v2", meta: "Updated 6 May · Rev 2 of 3", pill: "review" as const, bg: "bg-bc-blue-bg", fg: "text-bc-blue" },
              { name: "Elevation drawing v1", meta: "Uploaded 28 Apr · Rev 1 of 3", pill: "done" as const, bg: "bg-bc-green-bg", fg: "text-bc-green" },
              { name: "Structural layout v1", meta: "Uploaded 30 Apr · Rev 1 of 3", pill: "new" as const, bg: "bg-bc-purple-bg", fg: "text-bc-purple" },
            ].map((d) => (
              <div key={d.name} className="flex items-center gap-2.5 border-b border-border py-2 last:border-0">
                <div className={`flex size-8 items-center justify-center rounded-lg ${d.bg} ${d.fg}`}>
                  <File className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium">{d.name}</p>
                  <p className="text-[10px] text-muted-foreground">{d.meta}</p>
                </div>
                <StatusPill variant={d.pill}>
                  {d.pill === "review" ? "Awaiting review" : d.pill === "done" ? "Feedback given" : "New"}
                </StatusPill>
              </div>
            ))}
          </Card>
        </div>

        <Card className="p-4">
          <div className="mb-3 flex justify-between">
            <h2 className="text-[13px] font-semibold">Messages from your team</h2>
            <button type="button" className="text-[11px] text-bc-blue">Open inbox →</button>
          </div>
          {[
            { initials: "SR", text: "Sneha R. (Architect) — Floor plan v2 is ready. Please review the open kitchen layout we discussed.", sub: "Today 10:42 am", unread: true, bg: "#E1F5EE", fg: "#0F6E56" },
            { initials: "RS", text: "Rohan S. (Sales) — Your next payment of ₹12L is due on 20 May.", sub: "Yesterday 3:15 pm", unread: true, bg: "#E6F1FB", fg: "#185FA5" },
            { initials: "KD", text: "Kiran D. (PM) — Agreement draft will be shared once drawings are finalised.", sub: "5 May, 11:00 am", unread: false, bg: "#FAEEDA", fg: "#854F0B" },
          ].map((m) => (
            <div key={m.sub} className="flex gap-2.5 border-b border-border py-2 last:border-0">
              <UserAvatar initials={m.initials} bg={m.bg} fg={m.fg} />
              <div className="min-w-0 flex-1">
                <p className="text-xs">{m.text}</p>
                <p className="text-[10px] text-muted-foreground">{m.sub}</p>
              </div>
              {m.unread && <span className="mt-1 size-1.5 shrink-0 rounded-full bg-bc-blue" />}
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}
