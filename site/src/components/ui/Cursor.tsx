"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-cursor]';

/** A trailing ring that swells over anything clickable. Pointer devices only. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = dot.current;
    if (!node) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let renderedX = x;
    let renderedY = y;
    let visible = false;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;

      if (!visible) {
        visible = true;
        renderedX = x;
        renderedY = y;
        node.style.opacity = "1";
      }

      const target = event.target as HTMLElement | null;
      node.dataset.active = String(Boolean(target?.closest?.(INTERACTIVE)));
    };

    const onLeave = () => {
      visible = false;
      node.style.opacity = "0";
    };

    const tick = () => {
      renderedX += (x - renderedX) * 0.18;
      renderedY += (y - renderedY) * 0.18;
      node.style.transform = `translate3d(${renderedX}px, ${renderedY}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    node.style.opacity = "0";
    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={dot} className="cursor-dot" aria-hidden="true" />;
}
