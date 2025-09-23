"use client";

import { Button } from "@/components/ui/button";
import {
  type FileWithPreview,
  formatBytes,
  useFileUpload,
} from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { ImageIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

interface LogoUploadProps {
  maxSize?: number;
  defaultLogo?: string;
  onFileChange?: (file: FileWithPreview | null) => void;
}

export const LogoUpload = ({
  defaultLogo,
  onFileChange,
  maxSize = 512 * 1024,
}: LogoUploadProps) => {
  const [
    { files, isDragging, errors },
    {
      removeFile,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles: 1,
    maxSize,
    accept: "image/*",
    multiple: false,
    onFilesChange: (files) => {
      onFileChange?.(files[0] || null);
    },
    onError: (errors) => {
      for (const error of errors) {
        toast.error(error);
      }
    },
  });

  const currentFile = files[0];
  const previewUrl = currentFile?.preview || defaultLogo;
  const handleRemove = () => {
    if (currentFile) {
      removeFile(currentFile.id);
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-2")}>
      <div className="relative">
        <div
          className={cn(
            "group/avatar relative h-28 w-28 cursor-pointer overflow-hidden border border-dashed rounded-3xl transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-ring/60 hover:border-ring",
            previewUrl && "border-solid",
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <input {...getInputProps()} className="sr-only" />
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col gap-1 h-full w-full items-center justify-center">
              <ImageIcon className="size-8 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">{`(Max: ${formatBytes(maxSize)})`}</p>
            </div>
          )}
        </div>
        {currentFile && (
          <Button
            size="icon"
            variant="outline"
            onClick={handleRemove}
            className="size-6 absolute -end-1 -top-1 rounded-full"
            aria-label="Remove avatar"
          >
            <XIcon className="size-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};
