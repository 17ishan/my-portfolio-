import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { DATA } from "@/data/resume";

// Hidden until there's at least one testimonial in src/data/resume.tsx.
export function TestimonialsSection() {
  if (DATA.testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="space-y-8">
      <SectionHeading eyebrow="Testimonials" title="What people say" />
      <div className="grid gap-3 sm:grid-cols-2">
        {DATA.testimonials.map((testimonial, id) => (
          <Reveal key={testimonial.name} delay={0.04 + id * 0.05} className="h-full">
            <figure className="flex h-full flex-col justify-between gap-4 rounded-lg border bg-card p-4">
              <blockquote className="text-sm text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="text-xs">
                <span className="font-semibold">{testimonial.name}</span> ·{" "}
                {testimonial.role}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
