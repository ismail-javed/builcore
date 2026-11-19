import { Check, Package } from "lucide-react";
import { ListPage } from "@/components/buildcore/ListPage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { packages } from "@/data/mock";

export default function PackagesPage() {
  return (
    <ListPage
      title="Packages"
      subtitle="Turnkey & structure pricing templates"
      searchPlaceholder="Search packages..."
      addLabel="Create package"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            className={`relative flex flex-col p-4 ${pkg.popular ? "border-bc-blue ring-1 ring-bc-blue/20" : ""}`}
          >
            {pkg.popular && (
              <span className="absolute -top-2 right-3 rounded-full bg-bc-blue px-2 py-0.5 text-[10px] font-semibold text-white">
                Most popular
              </span>
            )}
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-bc-blue-bg text-bc-blue">
              <Package className="size-5" />
            </div>
            <h3 className="font-semibold">{pkg.name}</h3>
            <p className="mt-1 text-2xl font-semibold text-bc-blue">{pkg.price}</p>
            <p className="mt-1 text-xs text-muted-foreground">{pkg.type} · {pkg.projects} active projects</p>
            <ul className="mt-4 flex-1 space-y-1.5 text-xs text-muted-foreground">
              {["3 drawing iterations", "Dedicated PM", "Milestone billing"].map((f) => (
                <li key={f} className="flex items-center gap-1.5">
                  <Check className="size-3 text-bc-green" /> {f}
                </li>
              ))}
            </ul>
            <Button variant={pkg.popular ? "default" : "outline"} size="sm" className="mt-4 w-full">
              Edit package
            </Button>
          </Card>
        ))}
      </div>
    </ListPage>
  );
}
