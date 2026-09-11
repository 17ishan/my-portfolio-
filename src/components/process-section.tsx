import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { DATA } from "@/data/resume";

export function ProcessSection() {
  return (
    <section id="process" className="space-y-8">
      <SectionHeading
        eyebrow="Process"
        title="How we'll work together"
        description="A simple, transparent process, so you always know what happens next."
      />
      <ol className="grid gap-3 sm:grid-cols-2">
        {DATA.process.map((step, id) => (
          <li key={step.title} className="h-full">
            <Reveal delay={0.04 + id * 0.05} className="h-full">
              <div className="flex h-full gap-4 rounded-lg border bg-card p-4 transition-colors duration-300 hover:border-highlight/40">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {id + 1}
                </span>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
