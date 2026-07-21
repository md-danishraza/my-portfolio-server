// src/components/Hero/Avatar3D.jsx
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  ContactShadows,
  Environment,
  Html,
} from "@react-three/drei";
import styles from "./Avatar3d.module.css";

// Loading fallback component
const LoaderFallback = () => (
  <Html center>
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
      <p>Loading 3D Avatar...</p>
    </div>
  </Html>
);

// The actual 3D Model component
const Model = ({ isDark }) => {
  const { scene } = useGLTF("/avatar/avatar-v2.glb");

  // Clone scene to avoid mutations
  const clonedScene = scene.clone();

  // Adjust material colors based on theme
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (isDark) {
          // Dark theme adjustments
          if (child.material.color) {
            // Optional: Adjust colors for dark mode
          }
        }
      }
    });
  }, [isDark, clonedScene]);

  return (
    <primitive
      object={clonedScene}
      scale={2}
      position={[0, -0.5, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

// Main Avatar3D component
const Avatar3D = () => {
  const [isDark, setIsDark] = useState(false);

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("dark"));
    });

    observer.observe(document.body, { attributes: true });
    setIsDark(document.body.classList.contains("dark"));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles["avatar-container"]}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        className={styles.canvas}
        dpr={[1, 2]} // Responsive pixel ratio
      >
        {/* Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <directionalLight
          position={[-5, 5, 5]}
          intensity={0.5}
          color="#9b59b6"
        />
        <pointLight position={[0, 3, 2]} intensity={0.8} />

        {/* Environment lighting based on theme */}
        <Environment preset={isDark ? "night" : "city"} />

        <Suspense fallback={<LoaderFallback />}>
          <Model isDark={isDark} />

          {/* Dynamic contact shadow */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.6}
            scale={8}
            blur={2.5}
            far={4}
            resolution={256}
            color={isDark ? "#000000" : "#888888"}
          />
        </Suspense>

        {/* Orbit controls with better limits */}
        <OrbitControls
          enableZoom={true}
          zoomSpeed={0.8}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={1.2}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
          minDistance={3}
          maxDistance={7}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>

      {/* Instruction hint */}
      <div className={styles.hint}>
        <span>✨ Drag to rotate avatar</span>
      </div>
    </div>
  );
};

// Preload the model
useGLTF.preload("/avatar/avatar.glb");

export default Avatar3D;
