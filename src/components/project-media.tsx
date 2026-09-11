"use client";

import Image from "next/image";
import { useRef } from "react";

interface ProjectMediaProps {
  title: string;
  video?: string;
  poster?: string;
}

const mediaClassName = "h-40 w-full object-cover object-top";

// Shows a lightweight poster image. The demo video only loads and plays while
// hovered with a mouse, so visitors don't download every video up front.
export function ProjectMedia({ title, video, poster }: ProjectMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!video) {
    return poster ? (
      <Image
        src={poster}
        alt={`${title} screenshot`}
        width={960}
        height={540}
        className={mediaClassName}
      />
    ) : null;
  }

  const play = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    videoRef.current?.play().catch(() => {});
  };

  return (
    <video
      ref={videoRef}
      src={video}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      onMouseEnter={play}
      onMouseLeave={() => videoRef.current?.pause()}
      aria-label={`${title} demo video`}
      className={mediaClassName}
    />
  );
}
