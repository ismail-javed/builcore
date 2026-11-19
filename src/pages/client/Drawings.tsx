import { File } from "lucide-react";
import { Link } from "react-router-dom";
import { ListPage } from "@/components/buildcore/ListPage";
import { StatusPill } from "@/components/buildcore/ui";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clientDrawings } from "@/data/mock";

const statusText = {
  review: "Awaiting review",
  done: "Feedback given",
  new: "New",
};

export default function ClientDrawingsPage() {
  return (
    <ListPage
      title="Drawings"
      subtitle="Architectural & structural documents"
      searchPlaceholder="Search drawings..."
    >
      <Card className="border-bc-amber/30 bg-bc-amber-bg p-3 text-xs text-bc-amber">
        <strong>Action needed:</strong> Floor plan v2 is waiting for your review before 10 May.
      </Card>

      <div className="space-y-2">
        {clientDrawings.map((doc) => (
          <Card key={doc.id} className="flex flex-wrap items-center gap-3 p-4 sm:flex-nowrap">
            <div className="flex size-10 items-center justify-center rounded-lg bg-bc-blue-bg text-bc-blue">
              <File className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium">{doc.name}</p>
              <p className="text-xs text-muted-foreground">{doc.meta}</p>
            </div>
            <StatusPill variant={doc.status}>{statusText[doc.status]}</StatusPill>
            {doc.slug === "review" ? (
              <Link to="/client/drawings/review">
                <Button size="sm">Review now</Button>
              </Link>
            ) : (
              <Button variant="outline" size="sm">Download</Button>
            )}
          </Card>
        ))}
      </div>
    </ListPage>
  );
}
