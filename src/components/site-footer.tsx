import { buttonVariants } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ArrowUpIcon } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  // Social links flagged `navbar` (they used to live in the bottom dock).
  const socials = Object.values(DATA.contact.social).filter((s) => s.navbar);

  return (
    <footer className="border-t">
      {/* Extra bottom padding keeps the footer clear of the fixed dock. */}
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 px-6 pb-28 pt-8 text-sm text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} {DATA.name}
        </p>
        <div className="flex items-center gap-1">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <social.icon className="size-4" aria-hidden />
            </a>
          ))}
          <Link
            href="#hero"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5")}
          >
            Back to top <ArrowUpIcon className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </footer>
  );
}
