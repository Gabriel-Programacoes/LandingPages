"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, ThreeEvent, ThreeElements, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls, PerspectiveCamera, Sparkles } from "@react-three/drei";
import { Bloom, ChromaticAberration, EffectComposer, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import MiniHubMenu from "@/components/MiniHubMenu";

function SpectralCoreModel(props: ThreeElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    if (group.current) {
      group.current.rotation.y = elapsed * 0.16;
      group.current.rotation.x = Math.sin(elapsed * 0.35) * 0.08;
    }

    if (inner.current) {
      const target = clicked ? 1.18 : hovered ? 1.08 : 1;
      inner.current.scale.lerp(new THREE.Vector3(target, target, target), 0.08);
    }
  });

  const onPointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
  };

  const onPointerOut = () => setHovered(false);

  const onClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    setClicked((value) => !value);
  };

  return (
    <Float speed={2.2} rotationIntensity={0.5} floatIntensity={1.1}>
      <group
        {...props}
        ref={group}
        dispose={null}
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        <mesh ref={inner} castShadow receiveShadow rotation={[0.4, 0.2, -0.35]}>
          <icosahedronGeometry args={[1.2, 2]} />
          <meshPhysicalMaterial
            color={hovered ? "#d7ff3f" : "#101214"}
            emissive={hovered || clicked ? "#bfdc2d" : "#111515"}
            emissiveIntensity={clicked ? 1.8 : hovered ? 0.75 : 0.22}
            roughness={0.18}
            metalness={0.86}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>

        <mesh scale={clicked ? 1.58 : 1.42} rotation={[0.2, -0.4, 0.12]}>
          <octahedronGeometry args={[1.18, 1]} />
          <meshStandardMaterial
            color="#e9ff7a"
            emissive="#bdf02e"
            emissiveIntensity={clicked ? 1.2 : 0.48}
            wireframe
            transparent
            opacity={hovered ? 0.72 : 0.42}
          />
        </mesh>

        {Array.from({ length: 3 }).map((_, index) => (
          <mesh
            key={index}
            rotation={[
              Math.PI / (index + 2),
              index * 0.78,
              Math.PI / 2 + index * 0.33,
            ]}
          >
            <torusGeometry args={[1.85 + index * 0.22, 0.01, 12, 160]} />
            <meshBasicMaterial
              color={index === 1 ? "#ffffff" : "#d7ff3f"}
              transparent
              opacity={clicked ? 0.54 : 0.28}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <Canvas shadows dpr={[1, 1.8]} gl={{ antialias: true }}>
      <PerspectiveCamera makeDefault position={[0, 0.2, 6]} fov={48} />
      <color attach="background" args={["#050606"]} />
      <fog attach="fog" args={["#050606", 6, 13]} />

      <ambientLight intensity={0.25} />
      <directionalLight
        position={[5, 7, 5]}
        intensity={1.45}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-4.5, 2.8, -2.4]} intensity={4} color="#d7ff3f" />
      <pointLight position={[3.2, -1.5, 2.5]} intensity={1.8} color="#58f0ff" />

      <Suspense fallback={null}>
        <SpectralCoreModel position={[0, -0.08, 0]} />
        <Sparkles count={70} scale={[7, 3, 4]} size={1.8} speed={0.22} color="#d7ff3f" opacity={0.42} />
        <Environment preset="night" />
      </Suspense>

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.05, 0]}>
        <planeGeometry args={[9, 9]} />
        <shadowMaterial transparent opacity={0.18} />
      </mesh>

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={9}
        autoRotate
        autoRotateSpeed={0.35}
      />

      <EffectComposer>
        <Bloom intensity={1.35} luminanceThreshold={0.18} luminanceSmoothing={0.9} mipmapBlur />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0012, 0.0012)}
        />
        <Vignette eskil={false} offset={0.18} darkness={0.92} />
      </EffectComposer>
    </Canvas>
  );
}

export default function SpectralCorePage() {
  const [armed, setArmed] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050606] text-white font-[family-name:var(--font-geist-sans)]">
      <MiniHubMenu />

      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,6,6,0.88) 0%, rgba(5,6,6,0.32) 42%, rgba(5,6,6,0.76) 100%)",
        }}
      />

      <section className="pointer-events-none relative z-20 grid min-h-screen grid-rows-[auto_1fr_auto] py-5 pl-16 pr-5 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-[#d7ff3f] shadow-[0_0_16px_#d7ff3f]" />
            <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.32em] text-white/58">
              Interactive_Core_V1
            </span>
          </div>
          <span className="hidden font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.24em] text-white/32 sm:inline">
            WebGL / Bloom / Orbit
          </span>
        </header>

        <div className="flex max-w-[660px] flex-col justify-center pt-20 pb-24 sm:pt-24">
          <p className="mb-5 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.34em] text-[#d7ff3f]/78">
            Spectral Core
          </p>
          <h1 className="max-w-[9ch] text-[3.45rem] font-black uppercase leading-[0.82] tracking-normal sm:text-[6rem] sm:leading-[0.78] lg:text-[7.8rem]">
            Neon
            <br />
            Object
            <br />
            Lab
          </h1>
          <p className="mt-7 max-w-md text-sm leading-7 text-white/58 sm:text-base">
            A landing page built around a reactive 3D core: hover shifts the material,
            click charges the shell, and the camera keeps the object inspectable from every angle.
          </p>
        </div>

        <footer className="grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="grid max-w-xl grid-cols-3 gap-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.16em] text-white/46">
            <span className="border border-white/10 bg-white/[0.035] px-3 py-3">Float</span>
            <span className="border border-white/10 bg-white/[0.035] px-3 py-3">Pointer</span>
            <span className="border border-white/10 bg-white/[0.035] px-3 py-3">Bloom</span>
          </div>
          <button
            type="button"
            onClick={() => setArmed((value) => !value)}
            className="pointer-events-auto w-full border border-[#d7ff3f]/55 bg-[#d7ff3f] px-5 py-3 text-left font-[family-name:var(--font-geist-mono)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#050606] shadow-[0_0_28px_rgba(215,255,63,0.22)] transition hover:bg-white sm:w-[230px]"
          >
            {armed ? "Core armed" : "Arm sequence"}
          </button>
        </footer>
      </section>
    </main>
  );
}
