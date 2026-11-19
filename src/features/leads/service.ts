import { toast } from "sonner";
import type { LeadFormValues, LeadSubmissionPayload } from "@/features/leads/types";

export async function submitLead(payload: LeadFormValues) {
  const submissionPayload: LeadSubmissionPayload = {
    ...payload,
    attachments: (payload.attachments ?? []).map((attachment) => ({
      name: attachment.name,
      size: attachment.size,
      type: attachment.type,
    })),
  };

  await new Promise((resolve) => window.setTimeout(resolve, 900));

  return submissionPayload;
}

export async function saveLead(payload: LeadFormValues) {
  try {
    const result = await submitLead(payload);
    toast.success("Lead saved successfully");
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save lead";
    toast.error(message);
    throw error;
  }
}
