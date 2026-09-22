"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { clamp, damp, easeOutCubic, scrollState } from "@/lib/scroll";

/* The community mark, rebuilt as geometry:
 * a broken ring of four arcs, four nodes sitting just outside the breaks,
 * and the thin containment circle from the original logo. */

const NODE_COUNT = 4;
const RING_RADIUS = 1;
const RING_TUBE = 0.2;
/** Angular slice removed from the ring at each node, in radians. */
const NODE_GAP = 0.52;
const NODE_RADIUS = 0.3;
const NODE_DISTANCE = 1.45;
const OUTER_RADIUS = 2.62;

const SEGMENT_ARC = Math.PI / 2 - NODE_GAP;
const QUARTER = Math.PI / 2;

export function Mark() {
  const group = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);

  const geometries = useMemo(() => {
    const segment = new THREE.TorusGeometry(RING_RADIUS, RING_TUBE, 28, 96, SEGMENT_ARC);
    const node = new THREE.SphereGeometry(NODE_RADIUS, 48, 48);
    const outer = new THREE.TorusGeometry(OUTER_RADIUS, 0.0075, 10, 220);
    return { segment, node, outer };
  }, []);

  const materials = useMemo(() => {
    const metal = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#cfcbc2"),
      metalness: 1,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.5,
    });

    const node = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#f2efe8"),
      metalness: 0.85,
      roughness: 0.14,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      envMapIntensity: 1.9,
      emissive: new THREE.Color("#2a2622"),
      emissiveIntensity: 0.35,
    });

    const hairline = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#ece8e0"),
      transparent: true,
      opacity: 0.32,
    });

    return { metal, node, hairline };
  }, []);

  // Dispose everything this component allocated when it unmounts.
  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((geometry) => geometry.dispose());
      Object.values(materials).forEach((material) => material.dispose());
    };
  }, [geometries, materials]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    if (!group.current || !spin.current) return;

    // Bounded wobble rather than a free spin: a full rotation turns the ring
    // edge-on twice per turn, and the mark stops reading as the logo. Swinging
    // inside ±30° keeps the silhouette recognisable while still feeling alive.
    const t = state.clock.elapsedTime;
    spin.current.rotation.y = Math.sin(t * 0.34) * 0.52;
    spin.current.rotation.x = Math.sin(t * 0.23 + 1.1) * 0.26;

    const hero = easeOutCubic(clamp(scrollState.hero));
    const aspect = state.viewport.aspect;
    const wide = aspect > 1.05;

    // On wide screens the mark lives in the right half from the start, so the
    // wordmark on the left never has to fight it. On narrow ones it sits above
    // the text instead. Scrolling then pushes it further out and shrinks it.
    const baseX = wide ? 1.85 : 0;
    const baseY = wide ? 0.1 : 1.35;
    const baseScale = wide ? 0.92 : 0.5;

    const targetX = baseX + (wide ? hero * 0.9 : hero * 0.5);
    const targetY = baseY + (wide ? hero * -0.3 : hero * -1.2);
    const targetScale = baseScale * (1 - hero * 0.34);

    group.current.position.x = damp(group.current.position.x, targetX, 6, dt);
    group.current.position.y = damp(group.current.position.y, targetY, 6, dt);

    const scale = damp(group.current.scale.x, targetScale, 6, dt);
    group.current.scale.setScalar(scale);

    // Pointer parallax, plus a slow roll driven by total page progress.
    group.current.rotation.x = damp(
      group.current.rotation.x,
      scrollState.pointerY * 0.22,
      3.5,
      dt,
    );
    group.current.rotation.y = damp(
      group.current.rotation.y,
      scrollState.pointerX * 0.34,
      3.5,
      dt,
    );
    group.current.rotation.z = damp(
      group.current.rotation.z,
      scrollState.progress * Math.PI * 1.1,
      2.5,
      dt,
    );
  });

  return (
    <group ref={group}>
      <group ref={spin}>
        {Array.from({ length: NODE_COUNT }, (_, i) => {
          const gapCentre = i * QUARTER;
          const nodeX = Math.cos(gapCentre) * NODE_DISTANCE;
          const nodeY = Math.sin(gapCentre) * NODE_DISTANCE;

          return (
            <group key={i}>
              {/* Arc running from this node's gap to the next one. */}
              <mesh
                geometry={geometries.segment}
                material={materials.metal}
                rotation={[0, 0, gapCentre + NODE_GAP / 2]}
                castShadow
              />
              {/* The node itself, detached from the ring like in the logo. */}
              <mesh
                geometry={geometries.node}
                material={materials.node}
                position={[nodeX, nodeY, 0]}
              />
            </group>
          );
        })}

        <mesh geometry={geometries.outer} material={materials.hairline} />
      </group>
    </group>
  );
}
