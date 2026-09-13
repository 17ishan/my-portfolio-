import { cn } from "@/lib/utils";

// A technology logo drawn as a CSS mask, so the shape takes the current text colour
// and looks right in both themes. The SVGs are self-hosted in /public/logos, so the
// page makes no third-party requests for them.
export function TechLogo({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const url = `url(/logos/${name}.svg)`;

  return (
    <span
      aria-hidden
      className={cn("block bg-current", className)}
      style={{
        maskImage: url,
        WebkitMaskImage: url,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}
