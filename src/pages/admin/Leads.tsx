import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListPage } from "@/components/buildcore/ListPage";
import { StatusPill, UserAvatar } from "@/components/buildcore/ui";
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
import { adminLeads } from "@/data/mock";

const stageLabel: Record<string, string> = {
  new: "New",
  quote: "Quoted",
  draw: "Drawings",
  agr: "Agreement",
};

const avatarMap: Record<string, { bg: string; fg: string }> = {
  "Anita Kapoor": { bg: "#E6F1FB", fg: "#185FA5" },
  "Suresh Mehta": { bg: "#E1F5EE", fg: "#0F6E56" },
  "Priya Verma": { bg: "#EEEDFE", fg: "#534AB7" },
  "Rahul Nair": { bg: "#FAEEDA", fg: "#854F0B" },
  "Deepak Joshi": { bg: "#FCEBEB", fg: "#A32D2D" },
};

export default function LeadsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const filtered = adminLeads.filter(
    (l) =>
      !query ||
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.city.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <ListPage
      title="Leads"
      subtitle={`${adminLeads.length} active · 4 need follow-up`}
      searchPlaceholder="Filter by name or city..."
      addLabel="New lead"
      filterChips={["All", "New", "Quoted", "Drawings", "Agreement"]}
      onSearch={setQuery}
      actions={
        <Button size="sm" onClick={() => navigate("/admin/leads/new")}>
          New lead
        </Button>
      }
    >
      <div className="grid gap-3 lg:grid-cols-4">
        {[
          { label: "Pipeline value", value: "₹3.6Cr" },
          { label: "New this week", value: "3" },
          { label: "Conversion rate", value: "28%" },
          { label: "Avg. deal size", value: "₹72L" },
        ].map((s) => (
          <Card key={s.label} className="p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-xl font-semibold">{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {["Lead", "Location", "Package", "Value", "Stage", "Owner", "Updated"].map((h) => (
                <TableHead key={h}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((lead) => {
              const av = avatarMap[lead.name] ?? { bg: "#F0EDE7", fg: "#1A1917" };
              return (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <UserAvatar initials={lead.name.split(" ").map((n) => n[0]).join("")} bg={av.bg} fg={av.fg} />
                      <div>
                        <p className="font-medium text-[13px]">{lead.name}</p>
                        <p className="text-[11px] text-muted-foreground">{lead.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{lead.city}</TableCell>
                  <TableCell className="max-w-[140px] truncate">{lead.type}</TableCell>
                  <TableCell className="font-semibold">{lead.value}</TableCell>
                  <TableCell>
                    <StatusPill variant={lead.stage}>{stageLabel[lead.stage]}</StatusPill>
                  </TableCell>
                  <TableCell>{lead.owner}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.updated}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </ListPage>
  );
}
