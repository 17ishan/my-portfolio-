import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";
import type { VariantProps } from "class-variance-authority";

type ButtonStyle = VariantProps<typeof buttonVariants>;

export function ResumeDownload({
  className,
  variant = "ghost",
  size = "lg",
  label = "Download resume",
}: {
  className?: string;
  variant?: ButtonStyle["variant"];
  size?: ButtonStyle["size"];
  label?: string;
}) {
  return (
    <a
      href="/IshanResume.pdf"
      download="Ishan-Sinha-Resume.pdf"
      className={cn(buttonVariants({ variant, size }), "gap-2", className)}
    >
      <DownloadIcon className="size-4" aria-hidden /> {label}
    </a>
  );
}
