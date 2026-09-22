"use client";

import { useEffect } from "react";
import Lenis from "lenis";

import { clamp, scrollState } from "@/lib/scroll";

/**
 * Owns the page's scroll feel and keeps `scrollState` in sync for the WebGL
 * layer. Also dims the 3D backdrop once the hero is behind you, so body copy
 * never competes with the object.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    const sync = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      scrollState.y = y;
      scrollState.progress = max > 0 ? clamp(y / max) : 0;
      scrollState.hero = clamp(y / window.innerHeight);

      // 1 in the hero, easing down to a quiet 0.3 for the rest of the page.
      // Narrow screens start lower: there the copy sits over the object.
      const base = window.innerWidth < 768 ? 0.7 : 1;
      const opacity = base * (1 - scrollState.hero * 0.7);
      root.style.setProperty("--scene-opacity", opacity.toFixed(3));
    };

    const onPointerMove = (event: PointerEvent) => {
      scrollState.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    sync();

    // Respect the OS setting: no inertia, just native scrolling.
    if (reduced) {
      window.addEventListener("scroll", sync, { passive: true });
      return () => {
        window.removeEventListener("scroll", sync);
        window.removeEventListener("resize", sync);
        window.removeEventListener("pointermove", onPointerMove);
      };
    }

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      smoothWheel: true,
    });

    lenis.on("scroll", sync);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // In-page anchors have to go through Lenis or they fight the inertia.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href*="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.3 });
      history.pushState(null, "", url.hash);
    };

    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      window.removeEventListener("resize", sync);
      window.removeEventListener("pointermove", onPointerMove);
      lenis.destroy();
    };
  }, []);

  return null;
}
