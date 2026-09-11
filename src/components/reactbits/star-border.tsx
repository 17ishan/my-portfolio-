import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Adapted from React Bits "StarBorder" (https://reactbits.dev): two soft lights travel along the
// edge of a button. This version is a link styled with the site's primary button, uses the
// accent colour, and keeps its animation in CSS (.star-border-light, stopped for reduced motion).
export function StarBorder({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/star relative inline-flex overflow-hidden rounded-[calc(var(--radius)-0.5px)] p-[1.5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      <span aria-hidden className="star-border-light star-border-bottom" />
      <span aria-hidden className="star-border-light star-border-top" />
      <span
        className={cn(
          buttonVariants({ size: "lg" }),
          "relative z-[1] gap-2 transition-transform duration-200 group-hover/star:bg-primary/90 group-active/star:scale-[0.98]"
        )}
      >
        {children}
      </span>
    </Link>
  );
}
