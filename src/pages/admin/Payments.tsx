import { useState } from "react";
import { ListPage } from "@/components/buildcore/ListPage";
import { MetricCard, StatusPill } from "@/components/buildcore/ui";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { adminPayments } from "@/data/mock";

const statusLabels = { paid: "Paid", due: "Due soon", upcoming: "Upcoming" };

export default function PaymentsPage() {
  const [query, setQuery] = useState("");
  const filtered = adminPayments.filter(
    (p) => !query || p.project.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <ListPage
      title="Payments"
      subtitle="Collections & milestone billing"
      searchPlaceholder="Filter by project..."
      addLabel="Record payment"
      filterChips={["All", "Paid", "Due", "Upcoming"]}
      onSearch={setQuery}
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Collected · May" value="₹48L" delta="↑ 72% of target" />
        <MetricCard label="Due this week" value="₹12L" delta="1 client" deltaTone="warn" />
        <MetricCard label="Overdue" value="₹0" delta="✓ None" />
        <MetricCard label="Pipeline (Q2)" value="₹1.2Cr" delta="6 milestones" />
      </div>

      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {["Project", "Client", "Milestone", "Amount", "Status", "Date"].map((h) => (
                <TableHead key={h}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.project}</TableCell>
                <TableCell>{p.client}</TableCell>
                <TableCell>{p.milestone}</TableCell>
                <TableCell className="font-semibold">{p.amount}</TableCell>
                <TableCell>
                  <StatusPill variant={p.status}>{statusLabels[p.status]}</StatusPill>
                </TableCell>
                <TableCell className="font-mono text-muted-foreground">{p.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </ListPage>
  );
}
