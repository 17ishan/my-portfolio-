"use client";
import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { IconCloud } from "@/components/magicui/icon-cloud";
import { File, Settings, Search } from "lucide-react";
import { OrbitingCirclesDemo } from "@/components/skills";
import { ShineBorder } from "@/components/magicui/shine-border";
import { IconCloudDemo } from "@/components/skills2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CoolModeDemo } from "@/components/resumepdf";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast, Toaster } from "react-hot-toast";
import { useState } from "react";
import emailjs from "emailjs-com";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullname || !form.email || !form.mobile || !form.message) {
      console.log("please fill");
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const response = await emailjs.send(
        "service_tmlwshp", //  service ID
        "template_lkkpb7n", // template ID
        {
          fullname: form.fullname,
          email: form.email,
          mobile: form.mobile,
          message: form.message,
        },
        "_J6ai-tPQgoYvQ3Ui" // public key
      );

      if (response.status === 200) {
        toast.success("Message sent successfully!");
        setForm({ fullname: "", email: "", mobile: "", message: "" });
      } else {
        toast.error("Failed to send message. Try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error sending email.");
    }

    const end = Date.now() + 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      requestAnimationFrame(frame);
    };

    frame();
  };
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            width: "300px",
            height: "50px",
            fontSize: "16px",
            padding: "10px",
          },
        }}
      />

      <main className="flex flex-col min-h-[100dvh] space-y-10">
        <section id="hero">
          <div className="mx-auto w-full max-w-2xl space-y-8">
            <div className="gap-2 flex justify-between">
              <div className="flex-col flex flex-1 space-y-1.5">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                  yOffset={8}
                  text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
                />

                <BlurFadeText
                  className="max-w-[600px] md:text-xl"
                  delay={BLUR_FADE_DELAY}
                  text={DATA.description}
                />
              </div>
              <BlurFade delay={BLUR_FADE_DELAY}>
                <Avatar className="size-28 border">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* Download Resume */}
        <div className="relative flex justify-center items-center">
          <CoolModeDemo />
        </div>


        {/* About section start here */}
        <section id="about">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
              {DATA.summary}
            </Markdown>
          </BlurFade>
        </section>

        {/* Work and experience ,intership starts Here */}
        <section id="work">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <h2 className="text-xl font-bold">Internship</h2>
            </BlurFade>

            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <ResumeCard
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  description={work.description}
                />
              </BlurFade>
            ))}
          </div>
        </section>

        {/* Education section starts Here */}
        <section id="education">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <h2 className="text-xl font-bold">Education</h2>
            </BlurFade>
            {DATA.education.map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + id * 0.05}
              >
                <ResumeCard
                  key={education.school}
                  href={education.href}
                  logoUrl={education.logoUrl}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  period={`${education.start} - ${education.end}`}
                />
              </BlurFade>
            ))}
          </div>
        </section>

        {/* Skills section starts Here */}
        <section id="skills">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <h2 className="text-xl font-bold">Skills</h2>
            </BlurFade>
            <div className="flex flex-wrap gap-1">
              {DATA.skills.map((skill, id) => (
                <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                  <Badge key={skill}>{skill}</Badge>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* <OrbitingCirclesDemo/> */}
        
        {/* Icon cloud of skills */}
        <IconCloudDemo />

          {/* Projects section starts Here */}
        <section id="projects">
          <div className="space-y-12 w-full py-12">
            <BlurFade delay={BLUR_FADE_DELAY * 11}>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                    My Projects
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Check out my latest work
                  </h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    I&apos;ve worked on a variety of projects, from simple
                    websites to complex web applications. Here are a few of my
                    favorites.
                  </p>
                </div>
              </div>
            </BlurFade>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
              {DATA.projects.map((project, id) => (
                <BlurFade
                  key={project.title}
                  delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                >
                  <ProjectCard
                    href={project.href}
                    key={project.title}
                    title={project.title}
                    description={project.description}
                    dates={project.dates}
                    tags={project.technologies}
                    image={project.image}
                    video={project.video}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </div>
          </div>
        </section>


        {/* Contact section starts here */}
        <section id="contact">
          <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
            <BlurFade delay={BLUR_FADE_DELAY * 16}>
              <div className="space-y-3">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-xl">
                  Contact
                </div>
              </div>

              <Card className="relative w-[350px]  overflow-hidden p-4 mt-4 ">
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <CardHeader>
                  <CardTitle className="text-3xl font-bold tracking-tighter sm:text-5xl mt-3 mb-4">
                    Get in Touch
                  </CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="flex flex-col w-full  gap-4">
                      <div className="flex flex-row  space-y-1.5 justify-center items-center gap-4">
                        <Label htmlFor="fullname">Name</Label>
                        <Input
                          id="fullname"
                          type="text"
                          placeholder="Enter your fullname"
                          value={form.fullname}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="flex flex-row space-y-1.5 justify-center items-center gap-5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={form.email}
                          required
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-row space-y-1.5 justify-center items-center gap-4">
                        <Label htmlFor="mobile">Mobile</Label>
                        <Input
                          id="mobile"
                          type="number"
                          placeholder="Enter your mobile number"
                          value={form.mobile}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="flex flex-row space-y-1.5 justify-center items-center gap-1">
                        <Label htmlFor="message">Message</Label>
                        <Input
                          id="message"
                          type="text"
                          value={form.message}
                          placeholder="Enter your message"
                          onChange={handleChange}
                          // className="border-gray-100 rounded-md border p-2"
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col justify-between items-center mt-4 mb-2 ">
                  <div className="relative flex justify-between items-center">
                    <Button
                      onClick={handleSubmit}
                      type="submit"
                      disabled={false}
                      className="cursor-pointer hover:cursor-pointer"
                    >
                      Submit
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </BlurFade>
          </div>
        </section>
      </main>
    </>
  );
}
