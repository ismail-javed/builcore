import { Check, Package } from "lucide-react";
import { PageTopBar } from "@/components/buildcore/ui";
import { Card } from "@/components/ui/card";
import { packageInclusions } from "@/data/mock";

export default function ClientPackagePage() {
  return (
    <>
      <PageTopBar
        title="My package"
        subtitle="Custom turnkey · Verma Villa"
      />
      <div className="space-y-4 p-6">
        <Card className="border-bc-blue/30 bg-bc-blue-bg/50 p-5">
          <div className="flex items-start gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-bc-blue text-white">
              <Package className="size-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-bc-blue">Custom Turnkey Package</h2>
              <p className="mt-1 text-2xl font-semibold">₹1.4 Cr</p>
              <p className="text-xs text-muted-foreground">All-inclusive · 2,400 sq ft · G+1 villa</p>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          {packageInclusions.map((section) => (
            <Card key={section.category} className="p-4">
              <h3 className="mb-3 text-sm font-semibold">{section.category}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-bc-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <Card className="p-4">
          <h3 className="mb-3 text-sm font-semibold">What&apos;s not included</h3>
          <ul className="grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
            {["Land cost", "Government approvals & fees", "Interior furniture", "Landscape beyond basic"].map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-4">
          <h3 className="mb-2 text-sm font-semibold">Change requests</h3>
          <p className="text-xs text-muted-foreground">
            Structural changes after agreement may affect timeline and cost. Drawing iterations beyond 3 are charged at ₹5,000 each.
          </p>
        </Card>
      </div>
    </>
  );
}
