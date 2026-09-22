"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { damp, scrollState } from "@/lib/scroll";

/**
 * Seeded PRNG (mulberry32). The particle field must look random but be a pure
 * function of `count`, so the geometry can be memoised during render and every
 * reload produces the same constellation.
 */
function makeRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Suspended ink particles — depth cues around the mark, never the focus. */
export function InkField({ count = 900 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const random = makeRandom(0x8badf00d);
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      // Spherical shell, biased outwards so the centre stays readable.
      const radius = 3.4 + Math.pow(random(), 0.6) * 7;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.65;
      positions[i * 3 + 2] = radius * Math.cos(phi);
      scales[i] = 0.4 + random() * 0.6;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    return geo;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color("#ece8e0"),
        size: 0.028,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 1 / 30);
    if (!points.current) return;

    points.current.rotation.y += dt * 0.035;
    points.current.rotation.x = damp(
      points.current.rotation.x,
      scrollState.pointerY * -0.12,
      2,
      dt,
    );
    // Drift towards the camera as the page scrolls, like falling through dust.
    points.current.position.z = damp(
      points.current.position.z,
      scrollState.progress * 4,
      2,
      dt,
    );
  });

  return <points ref={points} geometry={geometry} material={material} />;
}
