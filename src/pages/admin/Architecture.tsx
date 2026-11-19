import { useState } from "react";
import { Link } from "react-router-dom";
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
import { architectureQueue } from "@/data/mock";

export default function ArchitecturePage() {
  const [query, setQuery] = useState("");
  const filtered = architectureQueue.filter(
    (d) => !query || d.project.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <ListPage
      title="Architecture"
      subtitle="Drawing queue & revision tracker"
      searchPlaceholder="Filter by project..."
      addLabel="Upload drawing"
      filterChips={["All", "Awaiting review", "New", "Approved"]}
      onSearch={setQuery}
    >
      <Card className="border-bc-amber/30 bg-bc-amber-bg p-3 text-xs text-bc-amber">
        <strong>2 drawings overdue</strong> — Verma Villa floor plan and Sharma elevation need client feedback.
      </Card>

      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {["Project", "Drawing", "Architect", "Iteration", "Status", "Due", ""].map((h) => (
                <TableHead key={h || "action"}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((d) => (
              <TableRow key={d.id}>
                <TableCell className="font-medium">{d.project}</TableCell>
                <TableCell>{d.drawing}</TableCell>
                <TableCell>{d.architect}</TableCell>
                <TableCell className="font-mono">{d.iteration}</TableCell>
                <TableCell>
                  <StatusPill variant={d.status === "done" ? "done" : d.status === "review" ? "review" : "new"}>
                    {d.status === "done" ? "Approved" : d.status === "review" ? "Awaiting review" : "New upload"}
                  </StatusPill>
                </TableCell>
                <TableCell className="font-mono">{d.due}</TableCell>
                <TableCell>
                  {d.project === "Verma Villa" && (
                    <Link to="/client/drawings/review">
                      <Button variant="outline" size="sm">Open review</Button>
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </ListPage>
  );
}
