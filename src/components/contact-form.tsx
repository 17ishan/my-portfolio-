"use client";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { MailIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const SEND_TIMEOUT_MS = 15000;

interface ContactFormProps {
  /** Web3Forms access key. When empty, submitting shows the fallback options instead. */
  accessKey: string;
  email: string;
  /** WhatsApp number: country code + number, digits only. */
  whatsapp: string;
  projectTypes: string[];
}

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
};

type FormState = typeof emptyForm;

interface Web3FormsResponse {
  success?: boolean;
  message?: string;
  body?: { message?: string };
}

const fieldClassName =
  "flex w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

// Links that deliver the same enquiry by WhatsApp or email, used when the form can't send.
function fallbackLinks(form: FormState, email: string, whatsapp: string) {
  const subject = `Project enquiry from ${form.name || "your portfolio"}`;
  const body = [
    "Hi Ishan, I'd like to discuss a project.",
    "",
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.phone ? `Phone: ${form.phone}` : null,
    `Project type: ${form.projectType || "Not specified"}`,
    "",
    form.message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return {
    whatsapp: `https://wa.me/${whatsapp}?text=${encodeURIComponent(body)}`,
    mailto: `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}

export function ContactForm({
  accessKey,
  email,
  whatsapp,
  projectTypes,
}: ContactFormProps) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot: people never see this box, so a tick means a bot filled the form.
    const trap = e.currentTarget.elements.namedItem("botcheck");
    if (trap instanceof HTMLInputElement && trap.checked) {
      setForm(emptyForm);
      return;
    }

    // No form service configured: go straight to the one-click alternatives.
    if (!accessKey) {
      setFailed(true);
      return;
    }

    const projectType = form.projectType || "Not specified";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);
    setSending(true);
    setFailed(false);

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New enquiry: ${projectType} from ${form.name}`,
          from_name: "Portfolio contact form",
          name: form.name,
          // Web3Forms uses this as the reply-to address.
          email: form.email,
          phone: form.phone || "Not provided",
          project_type: projectType,
          message: form.message,
          botcheck: false,
        }),
        signal: controller.signal,
      });
      const result: Web3FormsResponse = await response
        .json()
        .catch(() => ({}));

      if (!response.ok || result.success !== true) {
        throw new Error(
          result.message ?? result.body?.message ?? `HTTP ${response.status}`
        );
      }

      toast.success("Thanks! Your message has been sent. I'll get back to you soon.");
      setForm(emptyForm);
    } catch (error) {
      console.error("Contact form could not send:", error);
      setFailed(true);
      toast.error("Your message couldn't be sent automatically. Please use one of the options below the form.");
    } finally {
      clearTimeout(timeout);
      setSending(false);
    }
  };

  const links = fallbackLinks(form, email, whatsapp);
  const fallbackButton = cn(
    buttonVariants({ variant: "outline", size: "sm" }),
    "gap-2"
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name">
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Field>
        <Field label="Email" htmlFor="contact-email">
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Field>
        <Field label="Phone / WhatsApp (optional)" htmlFor="contact-phone">
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={handleChange}
          />
        </Field>
        <Field label="Project type" htmlFor="contact-project">
          <select
            id="contact-project"
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            className={`${fieldClassName} h-9`}
          >
            <option value="">Select a service</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </Field>
      </div>
      <Field label="Message" htmlFor="contact-message">
        <Textarea
          id="contact-message"
          name="message"
          rows={5}
          minLength={10}
          placeholder="What do you need? Share your goals, timeline and any websites you like."
          value={form.message}
          onChange={handleChange}
          required
          className="min-h-[120px] bg-background"
        />
      </Field>
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="contact-botcheck">Leave this box unticked</label>
        <input
          id="contact-botcheck"
          name="botcheck"
          type="checkbox"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <Button type="submit" size="lg" disabled={sending}>
        {sending ? "Sending…" : "Send message"}
      </Button>
      {failed && (
        <div
          role="alert"
          className="rounded-md border border-dashed p-3 text-sm"
        >
          <p className="mb-2 font-medium">
            Couldn&apos;t send automatically. Send your message with one click:
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={fallbackButton}
            >
              <Icons.whatsapp className="size-4" aria-hidden /> WhatsApp
            </a>
            <a
              href={links.gmail}
              target="_blank"
              rel="noopener noreferrer"
              className={fallbackButton}
            >
              <MailIcon className="size-4" aria-hidden /> Gmail
            </a>
            <a href={links.mailto} className={fallbackButton}>
              <MailIcon className="size-4" aria-hidden /> Email app
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
