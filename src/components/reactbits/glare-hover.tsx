import { cn } from "@/lib/utils";

// Adapted from React Bits "GlareHover" (https://reactbits.dev): a light band sweeps across the
// content when its card (the nearest `group` ancestor) is hovered. Rewritten as pure CSS
// (.glare-hover in globals.css) so it needs no JavaScript.
export function GlareHover({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("glare-hover", className)}>{children}</div>;
}
