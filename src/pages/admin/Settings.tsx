import { Bell, Building2, Mail, Shield, Users } from "lucide-react";
import { PageTopBar } from "@/components/buildcore/ui";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-bc-blue-bg text-bc-blue">
          <Icon className="size-4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </Card>
  );
}

export default function SettingsPage() {
  return (
    <>
      <PageTopBar title="Settings" subtitle="Company profile, team & notifications" />
      <div className="mx-auto max-w-3xl space-y-4 p-6">
        <SettingsSection
          icon={Building2}
          title="Company profile"
          description="Branding shown on client portal and documents"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Company name</Label>
              <Input defaultValue="BuildCore Construction Pvt. Ltd." />
            </div>
            <div className="space-y-1.5">
              <Label>GSTIN</Label>
              <Input defaultValue="27AABCU9603R1ZM" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Registered address</Label>
              <Input defaultValue="Baner, Pune, Maharashtra 411045" />
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          icon={Mail}
          title="Email & notifications"
          description="SMTP and alert preferences (like Precast SMTP settings)"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>SMTP host</Label>
              <Input placeholder="smtp.example.com" />
            </div>
            <div className="space-y-1.5">
              <Label>From email</Label>
              <Input defaultValue="noreply@buildcore.in" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <input type="checkbox" id="pay-alerts" defaultChecked className="rounded" />
            <Label htmlFor="pay-alerts" className="font-normal">
              Email PM when payment is overdue
            </Label>
          </div>
        </SettingsSection>

        <SettingsSection
          icon={Users}
          title="Team & roles"
          description="Role-based access for sales, architecture, site ops"
        >
          <div className="space-y-2 text-sm">
            {["Admin", "Sales manager", "Project manager", "Architect", "Client"].map((role) => (
              <div key={role} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <span>{role}</span>
                <Button variant="ghost" size="sm">Manage</Button>
              </div>
            ))}
          </div>
        </SettingsSection>

        <SettingsSection
          icon={Bell}
          title="Drawing iterations"
          description="Default revision limits per package"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Free iterations (default)</Label>
              <Input type="number" defaultValue={3} />
            </div>
            <div className="space-y-1.5">
              <Label>Extra iteration fee (₹)</Label>
              <Input type="number" defaultValue={5000} />
            </div>
          </div>
        </SettingsSection>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline">Cancel</Button>
          <Button>
            <Shield className="size-3.5" /> Save settings
          </Button>
        </div>
      </div>
    </>
  );
}
