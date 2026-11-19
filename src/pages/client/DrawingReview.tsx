import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Download,
  Eraser,
  MapPin,
  MessageSquare,
  MousePointer2,
  Paperclip,
  RefreshCw,
  Ruler,
  Square,
  Type,
  Undo2,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ProgressBar, StatusPill } from "@/components/buildcore/ui";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FloorPlanSvg } from "./FloorPlanSvg";

type Tool = "select" | "pin" | "rect" | "arrow" | "text" | "ruler";
type ReviewTab = "comments" | "files";
type Chip = "change" | "query" | "ok";

const tools: { id: Tool; icon: React.ElementType; label: string }[] = [
  { id: "select", icon: MousePointer2, label: "select" },
  { id: "pin", icon: MapPin, label: "pin" },
  { id: "rect", icon: Square, label: "rect" },
  { id: "arrow", icon: ArrowUpRight, label: "arrow" },
  { id: "text", icon: Type, label: "note" },
  { id: "ruler", icon: Ruler, label: "ruler" },
];

export default function DrawingReview() {
  const [activeTool, setActiveTool] = useState<Tool>("select");
  const [tab, setTab] = useState<ReviewTab>("comments");
  const [chip, setChip] = useState<Chip>("change");
  const [zoom, setZoom] = useState(100);
  const [approved, setApproved] = useState(false);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <div className="flex shrink-0 flex-wrap items-center gap-3 border-b border-border bg-card px-4 py-3">
        <Link to="/client">
          <Button variant="outline" size="sm">
            <ArrowLeft className="size-3.5" /> Back
          </Button>
        </Link>
        <div className="min-w-0">
          <h1 className="text-base font-semibold">Floor plan · Revision 2</h1>
          <p className="text-xs text-muted-foreground">
            Verma Villa · Uploaded by Sneha R. · 6 May 2026
          </p>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <StatusPill variant="iter">
            <RefreshCw className="mr-0.5 inline size-3" /> Iteration 2 of 3
          </StatusPill>
          <Button variant="outline" size="sm">
            <Download className="size-3.5" /> Download
          </Button>
          <Button variant="outline" size="sm" onClick={() => setChip("change")}>
            <MessageSquare className="size-3.5" /> Request changes
          </Button>
          <Button
            variant="default"
            size="sm"
            className={approved ? "bg-bc-green hover:bg-bc-green/90" : undefined}
            disabled={approved}
            onClick={() => setApproved(true)}
          >
            <Check className="size-3.5" />
            {approved ? "Approved" : "Approve drawing"}
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        <aside className="flex w-12 shrink-0 flex-col items-center border-r border-border bg-card py-3">
          {tools.map((tool, i) => (
            <div key={tool.id} className="flex flex-col items-center">
              {i === 1 && <div className="my-1 h-px w-6 bg-border" />}
              <button
                type="button"
                title={tool.label}
                onClick={() => setActiveTool(tool.id)}
                className={cn(
                  "mb-0.5 flex size-8.5 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-colors",
                  activeTool === tool.id && "border-bc-blue/40 bg-bc-blue-bg text-bc-blue",
                  "hover:bg-bc-surface2 hover:text-foreground",
                )}
              >
                <tool.icon className="size-4" />
              </button>
              <span className="mb-2 text-[8px] uppercase tracking-wide text-muted-foreground">
                {tool.label}
              </span>
            </div>
          ))}
          <div className="mt-auto space-y-1">
            <div className="mb-1 h-px w-6 bg-border" />
            <button type="button" className="flex size-8.5 items-center justify-center rounded-lg text-muted-foreground hover:bg-bc-surface2">
              <Undo2 className="size-4" />
            </button>
            <button type="button" className="flex size-8.5 items-center justify-center rounded-lg text-muted-foreground hover:bg-bc-surface2">
              <Eraser className="size-4" />
            </button>
          </div>
        </aside>

        <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#E8E5DE]">
          <div className="pointer-events-none absolute left-14 top-2.5 rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] text-muted-foreground">
            <MousePointer2 className="mr-1 inline size-3" />
            Click on drawing to drop a pin · Scroll to zoom
          </div>
          <div
            className="relative transition-transform duration-200"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "center" }}
          >
            <FloorPlanSvg />
            <div className="absolute left-[74px] top-[55px] flex size-6 items-center justify-center rounded-full border-2 border-white bg-bc-blue text-[10px] font-bold text-white shadow">
              1
            </div>
            <div className="absolute left-[228px] top-[162px] flex size-6 items-center justify-center rounded-full border-2 border-white bg-[#BA7517] text-[10px] font-bold text-white shadow">
              2
            </div>
            <div className="absolute left-[46px] top-[256px] flex size-6 items-center justify-center rounded-full border-2 border-white bg-[#1D9E75] text-white shadow">
              <Check className="size-2.5" />
            </div>
            <div className="absolute left-[298px] top-[314px] flex size-6 items-center justify-center rounded-full border-2 border-white bg-bc-red text-[10px] font-bold text-white shadow">
              4
            </div>
            <div className="pointer-events-none absolute left-[288px] top-[29px] h-[117px] w-[110px] rounded border-2 border-dashed border-[#E24B4A]" />
          </div>
        </div>

        <aside className="flex w-[230px] shrink-0 flex-col border-l border-border bg-card">
          <div className="flex border-b border-border">
            {(["comments", "files"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "flex-1 border-b-2 py-2.5 text-[11px] font-medium capitalize transition-colors",
                  tab === t
                    ? "border-bc-blue text-bc-blue"
                    : "border-transparent text-muted-foreground",
                )}
              >
                {t === "comments" ? (
                  <>Comments <span className="ml-1 rounded-full bg-[#E24B4A] px-1 text-[9px] text-white">3</span></>
                ) : (
                  "All files"
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {tab === "comments" ? (
              <>
                <div className="mb-2.5 flex flex-wrap gap-1">
                  {["All (4)", "Open", "Resolved"].map((f, i) => (
                    <button
                      key={f}
                      type="button"
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[10px] font-medium",
                        i === 0
                          ? "border-bc-blue/40 bg-bc-blue-bg text-bc-blue"
                          : "border-border text-muted-foreground",
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <CommentCard
                  pin={1}
                  pinColor="bg-bc-blue"
                  highlight
                  body="Can we keep the kitchen open to the dining area? The partition feels too closed."
                  tag="Change request"
                  location="Pin 1 · Kitchen"
                  reply="Sneha R.: Noted, will revise in v3."
                />
                <CommentCard
                  pin={2}
                  pinColor="bg-[#BA7517]"
                  body="Bedroom 2 wardrobe space — can we add a built-in wardrobe on the north wall?"
                  tag="Change request"
                  location="Pin 2 · Bed 2"
                />
                <CommentCard
                  pin={3}
                  pinColor="bg-[#1D9E75]"
                  resolved
                  body="Toilet 1 door swing conflicts with passage. Please revise."
                  tag="Resolved"
                  location="Pin 3 · Toilet"
                />
                <CommentCard
                  pin={4}
                  pinColor="bg-bc-red"
                  urgent
                  body="Garage width seems narrow for 2 cars. Can we extend by at least 1.5m on the eastern side?"
                  tag="Change request"
                  location="Pin 4 · Garage"
                />
              </>
            ) : (
              <FilesPanel />
            )}
          </div>

          <div className="border-t border-border p-3">
            <p className="mb-1.5 flex items-center gap-1 text-[10px] text-muted-foreground">
              <MapPin className="size-3 text-bc-blue" /> Drop a pin, then add your comment
            </p>
            <div className="overflow-hidden rounded-lg border border-border">
              <div className="flex gap-1 border-b border-border p-2">
                {(
                  [
                    ["change", "Change request"],
                    ["query", "Query"],
                    ["ok", "Approve"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setChip(id)}
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[10px] font-medium",
                      chip === id
                        ? "border-bc-blue/40 bg-bc-blue-bg text-bc-blue"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <textarea
                rows={2}
                placeholder="Add your comment here..."
                className="w-full resize-none border-0 bg-transparent px-2.5 py-2 text-[11px] outline-none"
              />
              <div className="flex items-center border-t border-border px-2 py-1.5">
                <Paperclip className="size-3.5 text-muted-foreground" />
                <Button size="sm" className="ml-auto h-7 px-3 text-[11px]">
                  Post
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="flex h-9 shrink-0 items-center gap-4 border-t border-border bg-card px-4 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-bc-blue" /> 2 open
        </span>
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-[#1D9E75]" /> 1 resolved
        </span>
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-bc-red" /> 1 urgent
        </span>
        <span className="font-mono">Last saved 2 min ago</span>
        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            className="flex size-6 items-center justify-center rounded border border-border"
            onClick={() => setZoom((z) => Math.max(50, z - 25))}
          >
            −
          </button>
          <span className="w-9 text-center font-mono">{zoom}%</span>
          <button
            type="button"
            className="flex size-6 items-center justify-center rounded border border-border"
            onClick={() => setZoom((z) => Math.min(200, z + 25))}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

function CommentCard({
  pin,
  pinColor,
  body,
  tag,
  location,
  highlight,
  urgent,
  resolved,
  reply,
}: {
  pin: number;
  pinColor: string;
  body: string;
  tag: string;
  location: string;
  highlight?: boolean;
  urgent?: boolean;
  resolved?: boolean;
  reply?: string;
}) {
  return (
    <div
      className={cn(
        "mb-2 rounded-lg border p-2.5 text-[11px]",
        highlight && "border-bc-blue/40 bg-bc-blue-bg",
        urgent && "border-bc-red/40 bg-bc-red-bg",
        !highlight && !urgent && "border-border",
      )}
    >
      <div className="mb-1.5 flex items-center gap-1.5">
        <span className={cn("flex size-4 items-center justify-center rounded-full text-[8px] font-bold text-white", pinColor)}>
          {resolved ? <Check className="size-2.5" /> : pin}
        </span>
        <span className="font-semibold">Priya Verma</span>
        <span className="ml-auto text-[10px] text-muted-foreground">Today</span>
      </div>
      <p className="mb-1.5 leading-relaxed">{body}</p>
      <div className="flex items-center gap-1">
        <StatusPill variant={resolved ? "done" : urgent ? "urgent" : "quote"}>{tag}</StatusPill>
        <span className={cn("ml-auto text-[10px]", urgent ? "text-bc-red" : "text-muted-foreground")}>
          {location}
        </span>
      </div>
      {reply && (
        <div className="mt-2 flex gap-1.5 border-t border-border pt-2 text-[10px] text-muted-foreground">
          <span className="font-medium text-bc-blue">SR</span>
          <span>{reply}</span>
        </div>
      )}
    </div>
  );
}

function FilesPanel() {
  const files = [
    { name: "Floor plan v2", meta: "Rev 2 of 3 · 6 May", pill: "review" as const, active: true },
    { name: "Elevation drawing v1", meta: "Rev 1 of 3 · 28 Apr", pill: "done" as const, active: false },
    { name: "Structural layout v1", meta: "Rev 1 of 3 · 30 Apr", pill: "new" as const, active: false },
  ];

  return (
    <>
      <p className="mb-2.5 text-[11px] text-muted-foreground">3 drawings in this project</p>
      {files.map((f) => (
        <div
          key={f.name}
          className={cn(
            "mb-0.5 flex items-center gap-2 rounded-lg p-2",
            f.active && "bg-bc-blue-bg",
          )}
        >
          <div className="min-w-0 flex-1">
            <p className={cn("text-xs font-medium", f.active && "text-bc-blue")}>{f.name}</p>
            <p className="text-[10px] text-muted-foreground">{f.meta}</p>
          </div>
          <StatusPill variant={f.pill}>
            {f.pill === "review" ? "Review" : f.pill === "done" ? "Done" : "New"}
          </StatusPill>
        </div>
      ))}
      <div className="mt-3 border-t border-border pt-3">
        <p className="mb-2 text-[11px] font-semibold text-muted-foreground">Iteration tracker</p>
        {[
          { name: "Floor plan", used: "2 / 3", pct: 66, warn: true },
          { name: "Elevation", used: "1 / 3", pct: 33, warn: false },
          { name: "Structural", used: "1 / 3", pct: 33, warn: false },
        ].map((row) => (
          <div key={row.name} className="mb-2.5">
            <div className="mb-1 flex justify-between text-[11px]">
              <span>{row.name}</span>
              <span className={cn("font-mono font-medium", row.warn ? "text-bc-amber" : "text-[#3B6D11]")}>
                {row.used} used
              </span>
            </div>
            <ProgressBar value={row.pct} color={row.warn ? "bg-[#BA7517]" : "bg-[#1D9E75]"} />
          </div>
        ))}
        <div className="rounded-lg border border-bc-amber/40 bg-bc-amber-bg p-2 text-[10px] text-bc-amber">
          <p className="font-semibold">Floor plan: 1 iteration left</p>
          <p className="mt-0.5">Additional iterations are chargeable at ₹5,000 each.</p>
        </div>
      </div>
    </>
  );
}
