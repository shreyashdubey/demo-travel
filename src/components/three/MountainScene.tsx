"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

function Peaks() {
  const ref = useRef<THREE.Group>(null);

  // Generate a few cone-like peaks at varied positions
  const peaks = useMemo(() => {
    const arr: { pos: [number, number, number]; h: number; r: number; tone: number }[] = [];
    const seeds = [
      [-3.4, 0.8, 1.2, 0.95],
      [-2, 1.8, 1.4, 1.0],
      [-0.4, 2.6, 1.5, 1.05],
      [1.2, 1.5, 1.2, 0.9],
      [2.8, 2.0, 1.6, 1.1],
      [4.4, 0.9, 1.0, 0.85],
      [-4.6, 1.6, 1.3, 0.92],
      [3.8, 1.1, 1.0, 0.88],
    ];
    seeds.forEach(([x, h, r, tone]) => {
      arr.push({ pos: [x, h / 2 - 1, -2], h, r, tone });
    });
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const mx = state.pointer.x;
    const my = state.pointer.y;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mx * 0.15, 0.04);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -my * 0.06, 0.04);
    ref.current.position.y = Math.sin(t * 0.3) * 0.05;
  });

  return (
    <group ref={ref}>
      {peaks.map((p, i) => (
        <mesh key={i} position={p.pos} castShadow receiveShadow>
          <coneGeometry args={[p.r, p.h, 4, 1]} />
          <meshStandardMaterial
            color={new THREE.Color(0x1f3a2e).multiplyScalar(p.tone)}
            flatShading
            roughness={0.85}
            metalness={0}
          />
        </mesh>
      ))}
      {/* Snowcaps */}
      {peaks.map((p, i) => (
        <mesh key={`s-${i}`} position={[p.pos[0], p.pos[1] + p.h * 0.32, p.pos[2]]}>
          <coneGeometry args={[p.r * 0.42, p.h * 0.32, 4, 1]} />
          <meshStandardMaterial color="#F6F4EF" flatShading roughness={0.65} />
        </mesh>
      ))}

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#11202a" roughness={1} />
      </mesh>
    </group>
  );
}

function Sun() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.x = Math.cos(t * 0.1) * 4;
    ref.current.position.y = 2.4 + Math.sin(t * 0.1) * 0.2;
  });
  return (
    <mesh ref={ref} position={[3, 2.4, -3]}>
      <sphereGeometry args={[0.5, 24, 24]} />
      <meshBasicMaterial color="#E8895C" />
    </mesh>
  );
}

export function MountainScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.6, 6], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "default" }}
    >
      <color attach="background" args={["#0B1320"]} />
      <fog attach="fog" args={["#0B1320", 8, 18]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 7, 4]} intensity={1.1} color="#ffd9b3" />
      <Suspense fallback={null}>
        <Peaks />
        <Sun />
      </Suspense>
    </Canvas>
  );
}
