"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  /** Text for the link to `href` shown under the description, e.g. "Certificate". */
  linkLabel?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}

export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  linkLabel,
  badges,
  period,
  description,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const panelId = React.useId();

  const logo = (
    <Avatar className="m-auto size-12 flex-none border bg-white">
      <AvatarImage src={logoUrl} alt={altText} className="object-contain" />
      <AvatarFallback>{altText[0]}</AvatarFallback>
    </Avatar>
  );

  const header = (
    <>
      <div className="flex items-center justify-between gap-x-2 text-base">
        <h3 className="inline-flex items-center gap-x-1 font-semibold leading-none text-xs sm:text-sm">
          {title}
          {badges && badges.length > 0 && (
            <span className="inline-flex gap-x-1">
              {badges.map((badge) => (
                <Badge
                  variant="secondary"
                  className="align-middle text-xs"
                  key={badge}
                >
                  {badge}
                </Badge>
              ))}
            </span>
          )}
          {description && (
            <ChevronRightIcon
              aria-hidden
              className={cn(
                "size-4 transition-transform duration-300 ease-out",
                isExpanded ? "rotate-90" : "rotate-0"
              )}
            />
          )}
        </h3>
        <div className="text-right text-xs tabular-nums text-muted-foreground sm:text-sm">
          {period}
        </div>
      </div>
      {subtitle && <div className="mt-1 font-sans text-xs">{subtitle}</div>}
    </>
  );

  // Nothing to expand: the whole card links out (e.g. to the school's website).
  if (!description) {
    return (
      <Link
        href={href || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Card className="flex items-center gap-4">
          {logo}
          <div className="flex-grow">{header}</div>
        </Card>
      </Link>
    );
  }

  return (
    <Card className="flex gap-4">
      {logo}
      <div className="flex-grow">
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {header}
        </button>
        <motion.div
          id={panelId}
          aria-hidden={!isExpanded}
          initial={false}
          animate={{
            opacity: isExpanded ? 1 : 0,
            height: isExpanded ? "auto" : 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="overflow-hidden text-xs sm:text-sm"
        >
          <p className="pt-2">{description}</p>
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isExpanded ? 0 : -1}
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium underline-offset-4 hover:underline"
            >
              {linkLabel ?? "View details"}
              <ExternalLinkIcon className="size-3" aria-hidden />
            </a>
          )}
        </motion.div>
      </div>
    </Card>
  );
};
