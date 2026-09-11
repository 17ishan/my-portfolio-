"use client";

import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef } from "react";

interface NavLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  /** Section ids that make this link the current one. */
  sections: string[];
}

// Dock link that's highlighted (with an accent dot) while one of its sections is in view.
// Forwards its ref so it works as a Radix `TooltipTrigger asChild`.
export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ sections, className, ...props }, ref) => {
    const current = useActiveSection();
    const active = sections.includes(current);

    return (
      <Link
        ref={ref}
        aria-current={active ? "location" : undefined}
        className={cn(
          "relative",
          className,
          active &&
            "bg-accent text-highlight after:absolute after:bottom-1.5 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-primary after:content-['']"
        )}
        {...props}
      />
    );
  }
);
NavLink.displayName = "NavLink";
