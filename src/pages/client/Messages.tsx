import { useState } from "react";
import { Send } from "lucide-react";
import { PageTopBar, UserAvatar } from "@/components/buildcore/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clientMessages } from "@/data/mock";

const avatarColors: Record<string, { bg: string; fg: string }> = {
  "Sneha R.": { bg: "#E1F5EE", fg: "#0F6E56" },
  "Rohan S.": { bg: "#E6F1FB", fg: "#185FA5" },
  "Kiran D.": { bg: "#FAEEDA", fg: "#854F0B" },
};

export default function ClientMessagesPage() {
  const [selected, setSelected] = useState(clientMessages[0]?.id ?? 1);
  const active = clientMessages.find((m) => m.id === selected) ?? clientMessages[0];

  return (
    <>
      <PageTopBar title="Messages" subtitle="2 unread · Your project team" />
      <div className="flex h-[calc(100vh-8rem)] flex-col md:flex-row">
        <div className="w-full border-b border-border md:w-80 md:border-b-0 md:border-r">
          {clientMessages.map((msg) => {
            const av = avatarColors[msg.from] ?? { bg: "#F0EDE7", fg: "#1A1917" };
            return (
              <button
                key={msg.id}
                type="button"
                onClick={() => setSelected(msg.id)}
                className={`flex w-full gap-3 border-b border-border p-4 text-left transition hover:bg-bc-surface2 ${
                  selected === msg.id ? "bg-bc-blue-bg/50" : ""
                }`}
              >
                <UserAvatar initials={msg.from.split(" ").map((n) => n[0]).join("")} bg={av.bg} fg={av.fg} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium">{msg.from}</p>
                    {msg.unread && <span className="size-2 shrink-0 rounded-full bg-bc-blue" />}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{msg.role}</p>
                  <p className="mt-1 truncate text-xs">{msg.text}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex flex-1 flex-col">
          {active && (
            <>
              <div className="border-b border-border px-4 py-3">
                <p className="font-medium">{active.from}</p>
                <p className="text-xs text-muted-foreground">{active.role} · {active.time}</p>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-bc-surface2 px-3 py-2 text-sm">
                  {active.text}
                </div>
                <div className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-bc-blue-bg px-3 py-2 text-sm text-bc-blue">
                  Thanks, I&apos;ll review the floor plan today and share comments on the drawing tool.
                </div>
              </div>
              <div className="flex gap-2 border-t border-border p-4">
                <Input placeholder="Type a message..." className="flex-1" />
                <Button size="icon">
                  <Send className="size-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
