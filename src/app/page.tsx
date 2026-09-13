import { ContactForm } from "@/components/contact-form";
import { EmailContact } from "@/components/email-contact";
import { FaqSection } from "@/components/faq-section";
import { Icons } from "@/components/icons";
import { ShineBorder } from "@/components/magicui/shine-border";
import { ProcessSection } from "@/components/process-section";
import { ProjectCard } from "@/components/project-card";
import { StarBorder } from "@/components/reactbits/star-border";
import { ResumeCard } from "@/components/resume-card";
import { ResumeDownload } from "@/components/resumepdf";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServicesSection } from "@/components/services-section";
import { SkillsSection } from "@/components/skills-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, CalendarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const REVEAL_DELAY = 0.04;

const whatsappUrl = `https://wa.me/${DATA.contact.whatsapp}?text=${encodeURIComponent(
  "Hi Ishan, I found your portfolio and would like to discuss a project."
)}`;

// Client/internship work first, then personal projects.
const projects = [...DATA.projects].sort(
  (a, b) =>
    Number(b.category === "internship") - Number(a.category === "internship")
);

export default function Page() {
  return (
    <main id="main" className="flex min-h-[100dvh] flex-col space-y-16 pb-16">
      {/* The hero never waits for the reveal effect, so it's visible before JavaScript loads.
          Its parts only drift (CSS parallax) as they scroll out of view. */}
      <section id="hero" className="relative isolate space-y-6">
        <div aria-hidden className="hero-glow" />
        <div className="flex items-start justify-between gap-4">
          <div className="hero-parallax-fade flex flex-1 flex-col space-y-3">
            <Badge variant="outline" className="w-fit gap-2 bg-background/60 font-medium">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-green-500" />
              </span>
              {DATA.availability.status}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Hi, I&apos;m {DATA.name.split(" ")[0]} 👋
            </h1>
            <p className="max-w-[600px] text-pretty md:text-xl">
              {DATA.description}
            </p>
          </div>
          <Image
            src={DATA.avatarUrl}
            alt={DATA.name}
            width={112}
            height={112}
            priority
            className="hero-parallax-slow size-24 shrink-0 rounded-full border object-cover shadow-lg shadow-primary/10 sm:size-28"
          />
        </div>
        <div className="hero-parallax-fade flex flex-wrap items-center gap-3">
          <StarBorder href="#contact">
            Hire me <ArrowRightIcon className="size-4" aria-hidden />
          </StarBorder>
          <Link
            href="#projects"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "bg-background/60"
            )}
          >
            View my work
          </Link>
          <ResumeDownload />
        </div>
        <p className="text-xs text-muted-foreground">
          {DATA.location} · Working with clients in India and worldwide ·{" "}
          {DATA.availability.responseTime}
        </p>
      </section>

      <section id="about" className="space-y-2">
        <Reveal delay={REVEAL_DELAY}>
          <h2 className="text-xl font-bold">About</h2>
        </Reveal>
        <Reveal delay={REVEAL_DELAY * 2}>
          <p className="text-pretty text-sm text-muted-foreground">
            {DATA.summary}
          </p>
        </Reveal>
      </section>

      <ServicesSection />

      <section id="projects" className="space-y-8">
        <SectionHeading
          eyebrow="My work"
          title="Projects I've built"
          description="A selection of websites and web apps, each with the goal, what I built and the result."
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {projects.map((project, id) => (
            <Reveal
              key={project.title}
              delay={REVEAL_DELAY + id * 0.05}
              className="h-full"
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <ProcessSection />

      <section id="experience" className="flex flex-col gap-y-3">
        <Reveal delay={REVEAL_DELAY}>
          <h2 className="text-xl font-bold">Experience</h2>
        </Reveal>
        {DATA.work.map((work, id) => (
          <Reveal key={work.company} delay={REVEAL_DELAY * 2 + id * 0.05}>
            <ResumeCard
              logoUrl={work.logoUrl}
              altText={work.company}
              title={work.company}
              subtitle={`${work.title} · ${work.location}`}
              href={work.href}
              linkLabel={work.linkLabel}
              badges={work.badges}
              period={`${work.start} – ${work.end}`}
              description={work.description}
            />
          </Reveal>
        ))}
        <Reveal delay={REVEAL_DELAY}>
          <h2 className="pt-6 text-xl font-bold">Education</h2>
        </Reveal>
        {DATA.education.map((education, id) => (
          <Reveal
            key={`${education.school}-${education.degree}`}
            delay={REVEAL_DELAY * 2 + id * 0.05}
          >
            <ResumeCard
              href={education.href}
              logoUrl={education.logoUrl}
              altText={education.school}
              title={education.school}
              subtitle={education.degree}
              period={`${education.start} – ${education.end}`}
            />
          </Reveal>
        ))}
      </section>

      <SkillsSection />

      <TestimonialsSection />

      <FaqSection />

      <section id="contact" className="space-y-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's work together"
          description={`Tell me about your project. ${DATA.availability.responseTime}.`}
        />
        <Reveal delay={REVEAL_DELAY * 2}>
          <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-lg border bg-card p-5 sm:p-6">
            <ShineBorder shineColor={["#6366F1", "#A78BFA", "#38BDF8"]} />
            <ContactForm
              accessKey={DATA.contact.formAccessKey}
              email={DATA.contact.email}
              whatsapp={DATA.contact.whatsapp}
              projectTypes={DATA.services.map((service) => service.title)}
            />
          </div>
        </Reveal>
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground">
            Prefer to message directly?
          </p>
          <EmailContact email={DATA.contact.email} />
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
            >
              <Icons.whatsapp className="size-4" aria-hidden /> WhatsApp
            </a>
            {DATA.contact.calendly && (
              <a
                href={DATA.contact.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
              >
                <CalendarIcon className="size-4" aria-hidden /> Book a call
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
