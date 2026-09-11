import { SpotlightCard } from "@/components/reactbits/spotlight-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DATA } from "@/data/resume";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import Link from "next/link";

export function ServicesSection() {
  return (
    <section id="services" className="space-y-8">
      <SectionHeading
        eyebrow="Services"
        title="How I can help"
        description="From a quick fix to a complete web app, for businesses in India and around the world."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {DATA.services.map((service, id) => (
          <Reveal key={service.title} delay={0.04 + id * 0.05} className="h-full">
            <SpotlightCard className="flex h-full flex-col rounded-lg border bg-card p-4 text-card-foreground transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-highlight/40 hover:shadow-lg">
              <CardHeader className="gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-highlight/10 text-highlight">
                  <service.icon className="size-5" aria-hidden />
                </span>
                <CardTitle className="text-base">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="mt-2 flex flex-1 flex-col gap-3 text-xs">
                <p>{service.description}</p>
                <ul className="space-y-1">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckIcon
                        className="size-3.5 shrink-0 text-highlight"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#projects"
                  className="group/link mt-auto inline-flex min-h-11 w-fit items-center gap-1 text-xs font-medium text-highlight underline-offset-4 hover:underline"
                >
                  See related work{" "}
                  <ArrowRightIcon
                    className="size-3 transition-transform group-hover/link:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </CardContent>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
