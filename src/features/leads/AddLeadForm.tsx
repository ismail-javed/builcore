import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, RotateCcw, Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { TagInput } from "@/components/ui/tag-input";
import { Textarea } from "@/components/ui/textarea";
import {
  assignedToOptions,
  companySizeOptions,
  industryOptions,
  leadInterestOptions,
  leadPriorityOptions,
  leadSourceOptions,
  leadStatusOptions,
  preferredContactOptions,
  productOptions,
  tagSuggestions,
} from "@/features/leads/constants";
import { saveLead } from "@/features/leads/service";
import type { LeadAttachment, LeadFormValues } from "@/features/leads/types";
import { leadDefaultValues, leadFormSchema } from "@/features/leads/validation";

function formatBytes(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function AddLeadForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, dirtyFields, isDirty },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema) as Resolver<LeadFormValues>,
    mode: "onChange",
    defaultValues: leadDefaultValues,
  });

  const notesValue = watch("notes") ?? "";
  const attachments = watch("attachments") ?? [];
  const tags = watch("tags") ?? [];

  const handleFiles = (files: File[]) => {
    const nextAttachments = files.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      name: file.name,
      size: file.size,
      type: file.type,
      file,
    })) satisfies LeadAttachment[];

    setValue("attachments", [...attachments, ...nextAttachments], { shouldDirty: true });
  };

  const removeAttachment = (id: string) => {
    setValue(
      "attachments",
      attachments.filter((attachment) => attachment.id !== id),
      { shouldDirty: true },
    );
  };

  const onSubmit = async (data: LeadFormValues) => {
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      await saveLead({ ...data, attachments: data.attachments ?? [] });
      setIsSuccess(true);
      reset(leadDefaultValues);
    } catch (error) {
      setIsSuccess(false);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const firstField = document.getElementById("firstName");
    firstField?.focus();
  }, []);

  const statusText = useMemo(() => {
    if (isSubmitting) return "Saving lead...";
    if (isSuccess) return "Lead saved successfully";
    if (isDirty) return "Unsaved changes";
    return "Ready to save";
  }, [isDirty, isSubmitting, isSuccess]);

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold">Add new lead</h2>
          <p className="text-sm text-muted-foreground">Capture every detail so the team can follow up quickly.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">{statusText}</span>
          <Button type="button" variant="outline" size="sm" onClick={() => reset(leadDefaultValues)} disabled={isSubmitting}>
            <RotateCcw className="mr-2 size-3.5" /> Reset
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Card className="p-0">
          <CardHeader className="border-b border-border px-4 py-4 sm:px-6">
            <CardTitle className="text-base">Basic information</CardTitle>
            <CardDescription>Core contact details for the lead.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 px-4 py-4 sm:px-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input id="firstName" autoFocus autoComplete="given-name" aria-invalid={!!errors.firstName} {...register("firstName")} />
              {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input id="lastName" autoComplete="family-name" aria-invalid={!!errors.lastName} {...register("lastName")} />
              {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input id="company" autoComplete="organization" aria-invalid={!!errors.company} {...register("company")} />
              {errors.company && <p className="text-sm text-destructive">{errors.company.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input id="designation" autoComplete="organization-title" {...register("designation")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" inputMode="tel" autoComplete="tel" aria-invalid={!!errors.phone} {...register("phone")} />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input id="whatsapp" inputMode="tel" autoComplete="tel" {...register("whatsapp")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" type="url" autoComplete="url" aria-invalid={!!errors.website} {...register("website")} />
              {errors.website && <p className="text-sm text-destructive">{errors.website.message}</p>}
            </div>
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardHeader className="border-b border-border px-4 py-4 sm:px-6">
            <CardTitle className="text-base">Business information</CardTitle>
            <CardDescription>Company and location context.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 px-4 py-4 sm:px-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select id="industry" {...register("industry")}>
                <option value="">Select industry</option>
                {industryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companySize">Company size</Label>
              <Select id="companySize" {...register("companySize")}>
                <option value="">Select size</option>
                {companySizeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" {...register("country")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" {...register("state")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" {...register("city")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input id="zipCode" {...register("zipCode")} aria-invalid={!!errors.zipCode} />
              {errors.zipCode && <p className="text-sm text-destructive">{errors.zipCode.message}</p>}
            </div>
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardHeader className="border-b border-border px-4 py-4 sm:px-6">
            <CardTitle className="text-base">Lead details</CardTitle>
            <CardDescription>Pipeline and ownership context.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 px-4 py-4 sm:px-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="leadSource">Lead source</Label>
              <Select id="leadSource" {...register("leadSource")}>
                <option value="">Select source</option>
                {leadSourceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select id="status" {...register("status")}>
                {leadStatusOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select id="priority" {...register("priority")}>
                {leadPriorityOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestLevel">Interest level</Label>
              <Select id="interestLevel" {...register("interestLevel")}>
                {leadInterestOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned to</Label>
              <Select id="assignedTo" {...register("assignedTo")}>
                {assignedToOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dealValue">Deal value</Label>
              <Input id="dealValue" inputMode="decimal" aria-invalid={!!errors.dealValue} {...register("dealValue")} />
              {errors.dealValue && <p className="text-sm text-destructive">{errors.dealValue.message}</p>}
            </div>
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardHeader className="border-b border-border px-4 py-4 sm:px-6">
            <CardTitle className="text-base">Product details</CardTitle>
            <CardDescription>What the lead is considering.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 px-4 py-4 sm:px-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="product">Product</Label>
              <Select id="product" {...register("product")}>
                <option value="">Select product</option>
                {productOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" inputMode="numeric" aria-invalid={!!errors.quantity} {...register("quantity")} />
              {errors.quantity && <p className="text-sm text-destructive">{errors.quantity.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input id="budget" inputMode="decimal" aria-invalid={!!errors.budget} {...register("budget")} />
              {errors.budget && <p className="text-sm text-destructive">{errors.budget.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedPurchaseDate">Expected purchase date</Label>
              <Input id="expectedPurchaseDate" type="date" {...register("expectedPurchaseDate")} />
            </div>
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardHeader className="border-b border-border px-4 py-4 sm:px-6">
            <CardTitle className="text-base">Follow-up</CardTitle>
            <CardDescription>Planning the next touchpoint.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 px-4 py-4 sm:px-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="nextFollowUpDate">Next follow-up date</Label>
              <Input id="nextFollowUpDate" type="date" {...register("nextFollowUpDate")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reminderTime">Reminder time</Label>
              <Input id="reminderTime" type="time" {...register("reminderTime")} />
            </div>
            <div className="space-y-2 md:col-span-2 xl:col-span-2">
              <Label htmlFor="preferredContactMethod">Preferred contact method</Label>
              <Select id="preferredContactMethod" {...register("preferredContactMethod")}>
                {preferredContactOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardHeader className="border-b border-border px-4 py-4 sm:px-6">
            <CardTitle className="text-base">Notes</CardTitle>
            <CardDescription>Capture meeting notes and context.</CardDescription>
          </CardHeader>
          <CardContent className="px-4 py-4 sm:px-6">
            <div className="space-y-2">
              <Textarea id="notes" {...register("notes")} className="min-h-[140px]" autoResize />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Auto-resizes to fit your content.</span>
                <span>{notesValue.length}/1200</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardHeader className="border-b border-border px-4 py-4 sm:px-6">
            <CardTitle className="text-base">Attachments</CardTitle>
            <CardDescription>Upload supporting documents and images.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-4 py-4 sm:px-6">
            <FileUpload accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg" helperText="PDF, DOC, DOCX, XLS, XLSX, PNG, JPG, JPEG" onFilesSelected={handleFiles} />
            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm">
                    <div>
                      <p className="font-medium">{attachment.name}</p>
                      <p className="text-xs text-muted-foreground">{formatBytes(attachment.size)}</p>
                    </div>
                    <button type="button" className="text-muted-foreground" onClick={() => removeAttachment(attachment.id)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardHeader className="border-b border-border px-4 py-4 sm:px-6">
            <CardTitle className="text-base">Tags</CardTitle>
            <CardDescription>Create custom tags or choose from the list.</CardDescription>
          </CardHeader>
          <CardContent className="px-4 py-4 sm:px-6">
            <TagInput value={tags} onChange={(nextTags) => setValue("tags", nextTags, { shouldDirty: true })} suggestions={tagSuggestions} placeholder="Add a tag" />
          </CardContent>
        </Card>

        <div className="sticky bottom-0 z-10 flex flex-col gap-3 rounded-xl border border-border bg-card/95 px-4 py-3 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            {Object.keys(dirtyFields).length > 0 ? "Form has unsaved changes" : "All fields are up to date"}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={() => navigate(-1)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 size-4" /> Save
                </>
              )}
            </Button>
            <Button type="submit" variant="secondary" disabled={isSubmitting} onClick={() => {}}>
              Save & schedule follow-up
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
