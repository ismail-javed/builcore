import { UploadCloud } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  helperText?: string;
  onFilesSelected: (files: File[]) => void;
}

function FileUpload({
  accept,
  multiple = true,
  disabled = false,
  className,
  helperText = "Drag and drop files here or browse",
  onFilesSelected,
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const openPicker = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) {
      return;
    }

    onFilesSelected(Array.from(files));
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-border bg-muted/30 px-4 py-5 text-center transition-colors",
        isDragging && "border-primary bg-accent",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        handleFiles(event.dataTransfer.files);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="rounded-full bg-background p-2">
          <UploadCloud className="size-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium">Drag & drop files</p>
          <p className="text-xs text-muted-foreground">{helperText}</p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={openPicker} disabled={disabled}>
          Browse files
        </Button>
      </div>
    </div>
  );
}

export { FileUpload };
