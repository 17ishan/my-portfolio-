"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon, MailIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const SUBJECT = "Project enquiry";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // The Clipboard API can be unavailable (older browsers, non-secure pages); fall back to a hidden textarea.
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }
}

// The email address is always visible and copyable (a mailto: link does nothing on
// computers without a mail app set up), plus a pre-filled Gmail draft.
export function EmailContact({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const handleCopy = async () => {
    if (await copyText(email)) {
      setCopied(true);
      toast.success("Email address copied");
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Couldn't copy. Please select the address and copy it.");
    }
  };

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(SUBJECT)}`;
  const buttonClassName = cn(buttonVariants({ variant: "outline" }), "gap-2");

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 rounded-md border bg-card py-1 pl-3 pr-1">
        <MailIcon className="size-4 text-muted-foreground" aria-hidden />
        <span className="select-all text-sm font-medium">{email}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy email address"
          className="rounded p-1.5 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {copied ? (
            <CheckIcon className="size-4 text-green-600 dark:text-green-500" aria-hidden />
          ) : (
            <CopyIcon className="size-4" aria-hidden />
          )}
        </button>
      </div>
      <a
        href={gmailUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClassName}
      >
        Open in Gmail
      </a>
    </div>
  );
}
