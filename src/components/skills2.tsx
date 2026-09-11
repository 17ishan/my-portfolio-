import { IconCloud } from "@/components/magicui/icon-cloud";

// Simple Icons slugs (https://simpleicons.org) for the tools I work with.
const slugs = [
  "openjdk",
  "springboot",
  "react",
  "nextdotjs",
  "javascript",
  "html5",
  "css",
  "tailwindcss",
  "shadcnui",
  "capacitor",
  "nodedotjs",
  "express",
  "mysql",
  "mongodb",
  "supabase",
  "razorpay",
  "git",
  "github",
  "postman",
  "vercel",
];

export function IconCloudDemo() {
  const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}`);

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden">
      <IconCloud images={images} />
    </div>
  );
}
