import { X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: readonly string[];
  placeholder?: string;
  className?: string;
}

function TagInput({ value, onChange, suggestions = [], placeholder = "Add tags", className }: TagInputProps) {
  const [draft, setDraft] = React.useState("");

  const addTag = (tag: string) => {
    const cleaned = tag.trim();
    if (!cleaned) {
      return;
    }

    const next = Array.from(new Set([...value, cleaned]));
    onChange(next);
    setDraft("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((item) => item !== tag));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(draft);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Input
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion}
              type="button"
              variant={value.includes(suggestion) ? "secondary" : "outline"}
              size="sm"
              onClick={() => addTag(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      )}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground">
              {tag}
              <button type="button" className="text-muted-foreground" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export { TagInput };
