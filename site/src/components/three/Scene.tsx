"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Environment, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";

import { InkField } from "./InkField";
import { Mark } from "./Mark";

export default function Scene({ lowPower = false }: { lowPower?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.2], fov: 38 }}
      dpr={lowPower ? [1, 1.35] : [1, 1.9]}
      gl={{
        antialias: !lowPower,
        alpha: true,
        powerPreference: "high-performance",
      }}
      // The scene is decoration: never let it steal a click from the copy.
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.18} />
        <directionalLight position={[4, 6, 5]} intensity={1.1} />
        <directionalLight position={[-6, -2, -4]} intensity={0.5} color="#c0392b" />

        {/* Studio lighting built in-scene — no external HDR to download. */}
        <Environment resolution={lowPower ? 128 : 256}>
          <Lightformer
            form="rect"
            intensity={3.2}
            position={[0, 4.5, -5]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[14, 7, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={1.5}
            position={[-7, 1, 3]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[9, 7, 1]}
            color="#9fb2d4"
          />
          <Lightformer
            form="circle"
            intensity={5.5}
            position={[5.5, -1.5, 3.5]}
            scale={3.2}
            color="#c0392b"
          />
          <Lightformer
            form="rect"
            intensity={0.9}
            position={[0, -5, 2]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[12, 5, 1]}
            color="#ffffff"
          />
        </Environment>

        <Mark />
        <InkField count={lowPower ? 420 : 900} />

        <EffectComposer multisampling={lowPower ? 0 : 4} enableNormalPass={false}>
          <Bloom
            intensity={0.62}
            luminanceThreshold={0.55}
            luminanceSmoothing={0.28}
            mipmapBlur
          />
          <Vignette offset={0.28} darkness={0.72} eskil={false} />
        </EffectComposer>
      </Suspense>

      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
