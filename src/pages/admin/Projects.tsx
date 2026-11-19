import { useState } from "react";
import { ListPage } from "@/components/buildcore/ListPage";
import { ProgressBar, StatusPill } from "@/components/buildcore/ui";
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
import { adminProjects } from "@/data/mock";

const stageLabels = { wip: "On-site", draw: "Drawings", agr: "Agreement" };

export default function ProjectsPage() {
  const [view, setView] = useState<"table" | "board">("table");
  const [query, setQuery] = useState("");

  const filtered = adminProjects.filter(
    (p) => !query || p.client.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <ListPage
      title="Projects"
      subtitle="6 active on-site · 2 in pre-construction"
      searchPlaceholder="Filter by client..."
      addLabel="New project"
      filterChips={["All", "On-site", "Drawings", "Agreement"]}
      onSearch={setQuery}
      actions={
        <div className="flex gap-1.5">
          <Button variant={view === "table" ? "secondary" : "outline"} size="sm" onClick={() => setView("table")}>
            Table
          </Button>
          <Button variant={view === "board" ? "secondary" : "outline"} size="sm" onClick={() => setView("board")}>
            Board
          </Button>
          <Button size="sm">New project</Button>
        </div>
      }
    >
      {view === "board" ? (
        <div className="grid gap-3 md:grid-cols-3">
          {(["draw", "agr", "wip"] as const).map((col) => (
            <div key={col} className="rounded-xl border border-border bg-card p-3">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {stageLabels[col]}
              </h3>
              <div className="space-y-2">
                {filtered
                  .filter((p) => p.stage === col)
                  .map((p) => (
                    <Card key={p.id} className="p-3 shadow-sm">
                      <p className="text-sm font-medium">{p.client}</p>
                      <p className="text-[11px] text-muted-foreground">{p.location} · {p.package}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <ProgressBar value={p.progress} />
                        <span className="font-mono text-[10px]">{p.progress}%</span>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden p-0">
          <Table>
            <TableHeader>
              <TableRow>
                {["Client", "Location", "Package", "PM", "Stage", "Progress", "Budget", "Next due"].map((h) => (
                  <TableHead key={h}>{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium text-[13px]">{p.client}</TableCell>
                  <TableCell>{p.location}</TableCell>
                  <TableCell>{p.package}</TableCell>
                  <TableCell>{p.pm}</TableCell>
                  <TableCell>
                    <StatusPill variant={p.stage}>{stageLabels[p.stage]}</StatusPill>
                  </TableCell>
                  <TableCell>
                    <div className="flex min-w-[100px] items-center gap-2">
                      <ProgressBar value={p.progress} />
                      <span className="font-mono text-[10px]">{p.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">{p.budget}</TableCell>
                  <TableCell className="font-mono">{p.nextDue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </ListPage>
  );
}
