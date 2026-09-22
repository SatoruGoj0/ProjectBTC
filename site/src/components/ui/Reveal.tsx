"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay before the reveal fires, in milliseconds. */
  delay?: number;
  /** How far into the viewport the element must be, 0 → 1. */
  threshold?: number;
};

/**
 * Flips `data-inview` once the element enters the viewport. The motion itself
 * lives in CSS (`.line-mask`, `.rule`), so this stays one observer per block
 * rather than an animation library per word.
 *
 * Always a plain div: semantic elements wrap it instead of being passed in,
 * which keeps the ref simple and the markup honest.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  threshold = 0.18,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Defensive: with no IntersectionObserver, reveal everything at once.
    // Written straight to the DOM so it does not cascade another render.
    if (typeof IntersectionObserver === "undefined") {
      node.dataset.inview = "true";
      return;
    }

    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = window.setTimeout(() => setInView(true), delay);
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [delay, threshold]);

  return (
    <div ref={ref} className={className} data-inview={String(inView)}>
      {children}
    </div>
  );
}
