import { ProjectMedia } from "@/components/project-media";
import { GlareHover } from "@/components/reactbits/glare-hover";
import { SpotlightCard } from "@/components/reactbits/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/data/resume";
import { cn } from "@/lib/utils";
import { CircleCheckIcon } from "lucide-react";

interface Props {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: Props) {
  const {
    title,
    href,
    client,
    dates,
    role,
    problem,
    description,
    outcome,
    technologies,
    links,
    video,
    poster,
  } = project;
  const media = (video || poster) && (
    <GlareHover>
      <ProjectMedia title={title} video={video} poster={poster} />
    </GlareHover>
  );

  return (
    <SpotlightCard
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border bg-card text-card-foreground transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-highlight/40 hover:shadow-lg",
        className
      )}
    >
      {media &&
        (href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${title}`}
            className="block border-b"
          >
            {media}
          </a>
        ) : (
          <div className="border-b">{media}</div>
        ))}
      <CardHeader className="space-y-1 px-3 pt-3">
        <div className="flex items-baseline justify-between gap-2">
          <CardTitle className="text-base">{title}</CardTitle>
          {dates && (
            <time className="shrink-0 text-xs text-muted-foreground">
              {dates}
            </time>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {client ? `${role} · ${client}` : role}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-3 pt-2 text-xs">
        {problem && (
          <p>
            <span className="font-medium text-foreground">Goal: </span>
            {problem}
          </p>
        )}
        <p>{description}</p>
        {outcome && (
          <p className="flex gap-1.5">
            <CircleCheckIcon
              className="mt-px size-3.5 shrink-0 text-highlight"
              aria-hidden
            />
            <span>{outcome}</span>
          </p>
        )}
      </CardContent>
      <CardFooter className="mt-auto flex flex-col items-start gap-3 px-3 pb-3 pt-3">
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {technologies.map((tag) => (
              <Badge
                className="px-1.5 py-0 text-[11px] font-medium"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {links.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {links.map((link) => (
              <a
                href={link.href}
                key={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "h-9 gap-2 text-xs hover:border-highlight/40 hover:text-highlight"
                )}
              >
                {link.icon}
                {link.type}
              </a>
            ))}
          </div>
        )}
      </CardFooter>
    </SpotlightCard>
  );
}
