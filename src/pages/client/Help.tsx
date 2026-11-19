import {
  BookOpen,
  HelpCircle,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PageTopBar } from "@/components/buildcore/ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  {
    q: "How do I review and comment on drawings?",
    a: "Open Drawings, select a file, and use the review tool to drop pins and add comments. Your architect will respond in the same thread.",
  },
  {
    q: "When is my next payment due?",
    a: "Check the Payments page for your full milestone schedule. You'll also receive email reminders 7 days before each due date.",
  },
  {
    q: "How many drawing revisions are included?",
    a: "Your package includes 3 iterations per drawing. Additional revisions are charged at ₹5,000 each — shown in the iteration tracker.",
  },
  {
    q: "When will construction start?",
    a: "Construction begins after agreement signing and the foundation milestone payment. Your PM will confirm the exact date.",
  },
];

export default function ClientHelpPage() {
  return (
    <>
      <PageTopBar title="Help" subtitle="Support & frequently asked questions" />
      <div className="space-y-4 p-6">
        <p className="text-sm text-muted-foreground">
          Need help with your BuildCore project? Reach your team or browse common questions below.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Mail className="size-5 text-primary" /> Email support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">For account and billing queries</p>
              <a href="mailto:support@buildcore.in" className="font-medium text-primary hover:underline">
                support@buildcore.in
              </a>
              <p className="text-xs text-muted-foreground">Response within 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Phone className="size-5 text-primary" /> Phone support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">Urgent site or payment issues</p>
              <p className="font-medium">+91 20 1234 5678</p>
              <p className="text-xs text-muted-foreground">Mon–Sat, 9:00 AM – 6:00 PM IST</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <HelpCircle className="size-5 text-primary" /> Frequently asked questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-border pb-3 last:border-0">
                <h4 className="mb-1 text-sm font-medium">{faq.q}</h4>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="size-8 text-primary" />
            <div>
              <p className="font-medium">Still need help?</p>
              <p className="text-sm text-muted-foreground">Message your project manager directly</p>
            </div>
          </div>
          <Link to="/client/messages">
            <Button>
              <MessageSquare className="size-4" /> Open messages
            </Button>
          </Link>
        </Card>
      </div>
    </>
  );
}
