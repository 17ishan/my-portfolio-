import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DATA } from "@/data/resume";

export function FaqSection() {
  return (
    <section id="faq" className="space-y-8">
      <SectionHeading eyebrow="FAQ" title="Questions clients ask" />
      <Reveal delay={0.08}>
        <Accordion type="single" collapsible className="rounded-lg border px-4">
          {DATA.faq.map((item, i) => (
            <AccordionItem
              key={item.question}
              value={`faq-${i}`}
              className="last:border-b-0"
            >
              <AccordionTrigger className="min-h-11 text-left text-sm hover:text-highlight hover:no-underline">
                {item.question}
              </AccordionTrigger>
              {/* forceMount keeps every answer in the page's HTML for search engines.
                  shadcn puts this className on an inner wrapper, so it hides itself
                  when its parent (the Radix content element) is closed. */}
              <AccordionContent
                forceMount
                className="text-muted-foreground [[data-state=closed]>&]:hidden"
              >
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
