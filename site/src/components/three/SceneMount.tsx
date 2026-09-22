"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

import { MarkIcon } from "@/components/ui/MarkIcon";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

type Capability = {
  mode: "pending" | "webgl" | "static";
  lowPower: boolean;
};

const SERVER: Capability = { mode: "pending", lowPower: false };

let cached: Capability | null = null;

function detect(): Capability {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return { mode: "static", lowPower: true };

  // A canvas that cannot get a WebGL context must not blank the hero.
  let supported = false;
  try {
    const probe = document.createElement("canvas");
    supported = Boolean(probe.getContext("webgl2") ?? probe.getContext("webgl"));
  } catch {
    supported = false;
  }
  if (!supported) return { mode: "static", lowPower: true };

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 900;
  const cores = navigator.hardwareConcurrency ?? 4;

  return { mode: "webgl", lowPower: coarse || narrow || cores <= 4 };
}

/* Probed once per page load and cached, so the snapshot stays referentially
 * stable — useSyncExternalStore re-reads it on every render. */
function getSnapshot(): Capability {
  cached ??= detect();
  return cached;
}

function getServerSnapshot(): Capability {
  return SERVER;
}

/** Device capability never changes mid-session, so there is nothing to watch. */
function subscribe(): () => void {
  return () => {};
}

/** Fixed backdrop for the whole page: the 3D mark, or a still of it. */
export function SceneMount() {
  const { mode, lowPower } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: "var(--scene-opacity, 1)", transition: "opacity 260ms linear" }}
    >
      {mode === "webgl" ? <Scene lowPower={lowPower} /> : null}
      {mode === "static" ? <StaticMark /> : null}
    </div>
  );
}

/** Reduced-motion / no-WebGL stand-in: the logo, quietly lit. */
function StaticMark() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <MarkIcon className="h-[min(62vh,62vw)] w-[min(62vh,62vw)] text-bone/20" />
    </div>
  );
}
