"use client";

import { useSyncExternalStore } from "react";

// One IntersectionObserver, shared by every subscriber, tracks which <main>
// section is crossing a thin band across the middle of the viewport.
let activeId = "";
let observer: IntersectionObserver | null = null;
const listeners = new Set<() => void>();

function startObserving() {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeId = entry.target.id;
      }
      listeners.forEach((listener) => listener());
    },
    { rootMargin: "-45% 0px -54% 0px" }
  );
  document
    .querySelectorAll("main section[id]")
    .forEach((section) => observer?.observe(section));
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!observer) startObserving();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      observer?.disconnect();
      observer = null;
    }
  };
}

/** The id of the section currently in view ("" before hydration). */
export function useActiveSection() {
  return useSyncExternalStore(
    subscribe,
    () => activeId,
    () => ""
  );
}
