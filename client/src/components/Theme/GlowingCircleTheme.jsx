// src/components/GlowingCircleTheme/GlowingCircleTheme.jsx
import React, { useRef, useState } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";
import { useTheme } from "../DotGrid/AnimatedBackground";
import styles from "./GlowingCircleTheme.module.css";

function GlowingCircleTheme() {
  const { isDark, setIsDark } = useTheme();

  const [isAnimating, setIsAnimating] = useState(false);
  const [circleStyle, setCircleStyle] = useState({});
  const buttonRef = useRef(null);

  const toggleTheme = (e) => {
    if (isAnimating) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();

    // Calculate exact center of the button
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate the distance to the furthest corner of the screen
    const maxRadius = Math.hypot(
      Math.max(centerX, window.innerWidth - centerX),
      Math.max(centerY, window.innerHeight - centerY)
    );

    const diameter = maxRadius * 2;

    // Set initial style at full size, but scaled down to 0
    setCircleStyle({
      left: `${centerX}px`,
      top: `${centerY}px`,
      width: `${diameter}px`,
      height: `${diameter}px`,
      opacity: 1,
      transform: "translate(-50%, -50%) scale(0)",
    });

    setIsAnimating(true);

    // Trigger the GPU-accelerated scale animation
    setTimeout(() => {
      setCircleStyle((prev) => ({
        ...prev,
        transform: "translate(-50%, -50%) scale(1)",
      }));
    }, 10);

    // Toggle theme mid-animation when the screen is fully covered
    setTimeout(() => {
      setIsDark(!isDark);
    }, 250);

    // Fade out and clean up
    setTimeout(() => {
      setCircleStyle((prev) => ({ ...prev, opacity: 0 }));
      setTimeout(() => {
        setIsAnimating(false);
        setCircleStyle({});
      }, 300); // Wait for the opacity fade to finish
    }, 600);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleTheme}
        className={`${styles.themeToggle} ${
          isDark ? styles.dark : styles.light
        }`}
        aria-label="Toggle theme"
        disabled={isAnimating}
      >
        <div className={styles.glowingCircle}>
          <div className={styles.circleInner}>
            {isDark ? (
              <IoMoon className={styles.icon} />
            ) : (
              <IoSunny className={styles.icon} />
            )}
          </div>
        </div>
      </button>

      {isAnimating && (
        <div
          className={`${styles.growingCircle} ${
            isDark ? styles.toLight : styles.toDark
          }`}
          style={circleStyle}
        />
      )}
    </>
  );
}

export default GlowingCircleTheme;
