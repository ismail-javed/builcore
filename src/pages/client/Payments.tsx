import { CreditCard, Download } from "lucide-react";
import { PageTopBar, MetricCard, StatusPill } from "@/components/buildcore/ui";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { clientPaymentSchedule } from "@/data/mock";

const statusLabels = { paid: "Paid", due: "Due soon", upcoming: "Upcoming" };

export default function ClientPaymentsPage() {
  return (
    <>
      <PageTopBar
        title="Payments"
        subtitle="Milestone schedule · Verma Villa"
        actions={
          <Button size="sm">
            <CreditCard className="size-3.5" /> Pay ₹12L
          </Button>
        }
      />
      <div className="space-y-4 p-6">
        <div className="grid gap-3 sm:grid-cols-3">
          <MetricCard label="Total contract" value="₹1.4Cr" delta="Custom turnkey" />
          <MetricCard label="Paid to date" value="₹5L" delta="Booking amount" />
          <MetricCard label="Next due" value="₹12L" delta="20 May 2026" deltaTone="warn" />
        </div>

        <Card className="overflow-hidden p-0">
          <div className="border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold">Payment schedule</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                {["Milestone", "Due date", "Amount", "Status", ""].map((h) => (
                  <TableHead key={h || "action"}>{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientPaymentSchedule.map((p) => (
                <TableRow key={p.name}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-muted-foreground">{p.date}</TableCell>
                  <TableCell className="font-semibold">{p.amount}</TableCell>
                  <TableCell>
                    <StatusPill variant={p.status}>{statusLabels[p.status]}</StatusPill>
                  </TableCell>
                  <TableCell>
                    {p.status === "due" && (
                      <Button size="sm">Pay now</Button>
                    )}
                    {p.status === "paid" && (
                      <Button variant="ghost" size="sm">
                        <Download className="size-3.5" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  );
}
