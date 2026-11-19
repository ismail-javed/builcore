import * as React from "react";

import { cn } from "@/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  autoResize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, autoResize = true, onChange, ...props },
  ref,
) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (autoResize) {
      const element = event.currentTarget;
      element.style.height = "auto";
      element.style.height = `${Math.max(120, element.scrollHeight)}px`;
    }
    onChange?.(event);
  };

  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground flex min-h-[120px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:border-destructive",
        className,
      )}
      onChange={handleChange}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
