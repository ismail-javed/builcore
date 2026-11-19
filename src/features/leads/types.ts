export type LeadStatus = "New" | "Qualified" | "Follow-up" | "Won" | "Lost";
export type LeadPriority = "Low" | "Medium" | "High" | "Urgent";
export type LeadInterestLevel = "Low" | "Medium" | "High" | "Very High";
export type PreferredContactMethod = "Email" | "Phone" | "WhatsApp" | "Meeting";

export interface LeadAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  file?: File;
}

export interface LeadFormValues {
  firstName: string;
  lastName: string;
  company: string;
  designation?: string;
  email: string;
  phone: string;
  whatsapp?: string;
  website?: string;
  industry?: string;
  companySize?: string;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: string;
  leadSource?: string;
  status: LeadStatus;
  priority: LeadPriority;
  interestLevel: LeadInterestLevel;
  assignedTo?: string;
  dealValue?: string;
  product?: string;
  quantity?: string;
  budget?: string;
  expectedPurchaseDate?: string;
  nextFollowUpDate?: string;
  reminderTime?: string;
  preferredContactMethod: PreferredContactMethod;
  notes?: string;
  attachments?: LeadAttachment[];
  tags?: string[];
}

export interface LeadSubmissionPayload extends Omit<LeadFormValues, "attachments"> {
  attachments: Array<{ name: string; size: number; type: string }>;
}
