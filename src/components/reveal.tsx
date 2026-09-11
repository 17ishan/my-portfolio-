interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait once the element is in view, for staggering items. */
  delay?: number;
}

// Fades and slides content up the first time it scrolls into view.
// There's no React state here: the hidden state and the single shared
// IntersectionObserver come from the small scripts in the root layout, and
// they only switch on when JavaScript runs and reduced motion isn't requested.
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <div
      data-reveal=""
      // The layout's observer script adds data-revealed, possibly before React hydrates.
      suppressHydrationWarning
      className={className}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
