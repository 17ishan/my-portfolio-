import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TechLogo } from "@/components/tech-logo";
import { DATA } from "@/data/resume";

// A grid of technology logos, all styled alike. Tiles scale in as they scroll into view
// and lift with an accent glow on hover (see .skill-tile in globals.css).
export function SkillsSection() {
  return (
    <section id="skills" className="space-y-8">
      <SectionHeading
        eyebrow="Skills"
        title="The stack I build with"
        description="Java and Spring Boot on the back end, React and Next.js on the front."
      />
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {DATA.skills.map((skill, id) => (
          <Reveal key={skill.name} delay={0.03 * id} className="h-full">
            <div className="skill-tile group flex h-full flex-col items-center justify-center gap-2 rounded-xl border bg-card px-2 py-4 text-center">
              <TechLogo
                name={skill.logo}
                className="size-7 text-foreground/80 transition-[color,transform] duration-300 ease-out group-hover:scale-110 group-hover:text-highlight"
              />
              <span className="text-[11px] font-medium leading-tight text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                {skill.name}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="text-center text-xs text-muted-foreground">
          Also: {DATA.otherSkills.join(" · ")}
        </p>
      </Reveal>
    </section>
  );
}
