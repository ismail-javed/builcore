import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { ListPage } from "@/components/buildcore/ListPage";
import { StatusPill } from "@/components/buildcore/ui";
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
import { adminAgreements } from "@/data/mock";

const statusMap = {
  draft: { label: "Draft", variant: "quote" as const },
  review: { label: "In review", variant: "review" as const },
  done: { label: "Signed", variant: "done" as const },
};

export default function AgreementsPage() {
  const [query, setQuery] = useState("");
  const filtered = adminAgreements.filter(
    (a) => !query || a.project.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <ListPage
      title="Agreements"
      subtitle="Legal documents & e-sign workflow"
      searchPlaceholder="Filter by project..."
      addLabel="Draft agreement"
      onSearch={setQuery}
    >
      <div className="grid gap-3 md:grid-cols-3">
        {[
          { label: "Pending signature", value: "2", tone: "text-bc-amber" },
          { label: "Signed this month", value: "4", tone: "text-bc-green" },
          { label: "Total contract value", value: "₹2.3Cr", tone: "text-foreground" },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className={`mt-1 text-2xl font-semibold ${s.tone}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {["Project", "Client", "Contract value", "Status", "Legal", "Due", "Actions"].map((h) => (
                <TableHead key={h}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((a) => (
              <TableRow key={a.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-muted-foreground" />
                    <span className="font-medium">{a.project}</span>
                  </div>
                </TableCell>
                <TableCell>{a.client}</TableCell>
                <TableCell className="font-semibold">{a.value}</TableCell>
                <TableCell>
                  <StatusPill variant={statusMap[a.status].variant}>
                    {statusMap[a.status].label}
                  </StatusPill>
                </TableCell>
                <TableCell className="text-muted-foreground">{a.lawyer}</TableCell>
                <TableCell className="font-mono">{a.due}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Download className="size-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </ListPage>
  );
}
