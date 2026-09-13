import Navbar from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/toaster";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const title = `${DATA.name} — ${DATA.role}`;
const avatar = new URL(DATA.avatarUrl, DATA.url).toString();

// Runs in <head> before the first paint: opt in to scroll reveals only when they can work.
const revealInitScript = `if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) document.documentElement.classList.add("reveal-on");`;

// One shared IntersectionObserver marks [data-reveal] elements as revealed when they scroll
// into view. It runs as soon as the HTML is parsed (before React hydrates), and a
// MutationObserver picks up any reveal elements rendered later.
const revealObserverScript = `(function () {
  if (!document.documentElement.classList.contains("reveal-on")) return;
  var selector = "[data-reveal]:not([data-revealed])";
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.setAttribute("data-revealed", "");
      io.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -10% 0px" });
  function scan(node) {
    if (node.matches && node.matches(selector)) io.observe(node);
    if (node.querySelectorAll) node.querySelectorAll(selector).forEach(function (el) { io.observe(el); });
  }
  scan(document);
  new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      m.addedNodes.forEach(function (n) { if (n.nodeType === 1) scan(n); });
    });
  }).observe(document.body, { childList: true, subtree: true });
})();`;

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: title,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  keywords: [
    "freelance web developer",
    "freelance web developer India",
    "React developer",
    "Next.js developer",
    "MERN stack developer",
    "website redesign",
    "landing page developer",
    "Bhopal web developer",
  ],
  authors: [{ name: DATA.name, url: DATA.url }],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: DATA.description,
    url: DATA.url,
    siteName: DATA.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title,
    description: DATA.description,
    card: "summary_large_image",
  },
};

const address = {
  "@type": "PostalAddress",
  addressLocality: "Bhopal",
  addressRegion: "Madhya Pradesh",
  addressCountry: "IN",
};

// Structured data so search engines understand who the site is for and what's offered.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${DATA.url}/#person`,
      name: DATA.name,
      url: DATA.url,
      image: avatar,
      jobTitle: DATA.role,
      email: `mailto:${DATA.contact.email}`,
      address,
      sameAs: Object.values(DATA.contact.social)
        .map((social) => social.url)
        .filter((url) => url.startsWith("http")),
      knowsAbout: [
        ...DATA.skills.map((skill) => skill.name),
        ...DATA.otherSkills,
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${DATA.url}/#service`,
      name: `${DATA.name} — Web Development`,
      url: DATA.url,
      image: avatar,
      description: DATA.description,
      founder: { "@id": `${DATA.url}/#person` },
      address,
      areaServed: [{ "@type": "Country", name: "India" }, "Worldwide"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web development services",
        itemListElement: DATA.services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
          },
        })),
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealInitScript }} />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div aria-hidden className="scroll-progress" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <TooltipProvider delayDuration={0}>
            <SmoothCursor />
            <Toaster position="top-right" />
            {/* Full-width clip so the hero glow can't cause sideways scrolling. It's on this
                wrapper rather than <body>, because browsers apply body overflow to the whole window. */}
            <div className="w-full overflow-x-clip">
              <div className="mx-auto max-w-2xl px-6 pb-12 pt-12 sm:pt-24">
                {children}
              </div>
            </div>
            <SiteFooter />
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
        <script dangerouslySetInnerHTML={{ __html: revealObserverScript }} />
      </body>
    </html>
  );
}
