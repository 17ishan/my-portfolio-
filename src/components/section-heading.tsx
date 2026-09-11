import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

// Shared heading style for the main sections: a small accent label above a large
// title. The three lines reveal one after another as the section scrolls in.
export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center space-y-3 text-center">
      <Reveal>
        <Badge
          variant="outline"
          className="border-highlight/30 bg-highlight/10 px-3 py-1 text-sm font-medium text-highlight"
        >
          {eyebrow}
        </Badge>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p className="max-w-[560px] text-pretty text-muted-foreground md:text-lg/relaxed">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
