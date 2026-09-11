"use client";

import { cn } from "@/lib/utils";
import { useRef } from "react";

// Adapted from React Bits "SpotlightCard" (https://reactbits.dev): a soft light follows the cursor.
// Changes from the original: the cursor position is written to CSS variables instead of React
// state (so moving the mouse never re-renders the card), it only reacts to a mouse or trackpad,
// and the light itself is styled in globals.css (.spotlight-card) with the accent colour.
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn("spotlight-card", className)}
    >
      {children}
    </div>
  );
}
