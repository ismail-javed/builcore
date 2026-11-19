import { Download, FileText, PenLine } from "lucide-react";
import { PageTopBar, StatusPill } from "@/components/buildcore/ui";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ClientAgreementPage() {
  return (
    <>
      <PageTopBar
        title="Agreement"
        subtitle="Construction contract · Verma Villa"
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="size-3.5" /> Download PDF
            </Button>
            <Button size="sm" disabled>
              <PenLine className="size-3.5" /> E-sign
            </Button>
          </>
        }
      />
      <div className="space-y-4 p-6">
        <Card className="border-bc-amber/30 bg-bc-amber-bg p-4 text-sm text-bc-amber">
          Agreement will be available for e-sign once all drawings are approved. You are currently on <strong>revision 2 of 3</strong> for floor plan.
        </Card>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="p-4 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <FileText className="size-4 text-muted-foreground" />
                Draft agreement preview
              </h2>
              <StatusPill variant="quote">Draft</StatusPill>
            </div>
            <div className="rounded-lg border border-border bg-bc-surface2/50 p-6 text-xs leading-relaxed text-muted-foreground">
              <p className="mb-3 font-semibold text-foreground">TURNKEY CONSTRUCTION AGREEMENT</p>
              <p className="mb-2">Between BuildCore Construction Pvt. Ltd. (&quot;Contractor&quot;) and Priya Verma (&quot;Client&quot;) for construction of a G+1 villa at Mumbai...</p>
              <p className="mb-2"><strong>Contract value:</strong> ₹1,40,00,000 (inclusive of taxes as applicable)</p>
              <p className="mb-2"><strong>Timeline:</strong> 14 months from date of commencement</p>
              <p><strong>Payment schedule:</strong> As per milestone schedule in Annexure A</p>
              <div className="mt-6 h-32 rounded border border-dashed border-border bg-card" />
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="mb-3 text-sm font-semibold">Document checklist</h3>
            <ul className="space-y-2 text-xs">
              {[
                { item: "Drawings approved", done: false },
                { item: "KYC verified", done: true },
                { item: "Booking payment", done: true },
                { item: "Agreement draft", done: true },
                { item: "Client e-sign", done: false },
              ].map((c) => (
                <li key={c.item} className="flex items-center justify-between rounded-lg border border-border px-2 py-1.5">
                  <span>{c.item}</span>
                  <StatusPill variant={c.done ? "done" : "upcoming"}>
                    {c.done ? "Done" : "Pending"}
                  </StatusPill>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
