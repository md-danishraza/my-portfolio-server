// src/components/AnimatedCursor/AnimatedCursor.jsx
import React, { useEffect, useRef } from "react";
import AnimatedCursor from "animated-cursor";
// Import the CSS file we'll create next
import "./AnimatedCursor.css";

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    // The library requires cursor elements to be present in the DOM.
    // We'll inject them right before initialization.

    // 1. Create the cursor wrapper element if it doesn't exist
    let cursorContainer = document.getElementById("cursor");
    if (!cursorContainer) {
      cursorContainer = document.createElement("div");
      cursorContainer.id = "cursor";
      document.body.appendChild(cursorContainer);
    }

    // 2. Create the inner and outer cursor elements if they don't exist
    if (!document.getElementById("cursor-inner")) {
      const cursorInner = document.createElement("div");
      cursorInner.id = "cursor-inner";
      cursorContainer.appendChild(cursorInner);
    }
    if (!document.getElementById("cursor-outer")) {
      const cursorOuter = document.createElement("div");
      cursorOuter.id = "cursor-outer";
      cursorContainer.appendChild(cursorOuter);
    }

    // 3. Configure the cursor options to match your portfolio's theme
    const cursorOptions = {
      color: "var(--highlight)", // This will pick up your CSS variable's value
      outerAlpha: 0.2,
      size: {
        inner: 6, // Slightly smaller inner dot for elegance
        outer: 35, // Outer circle size
      },
      hoverScale: {
        inner: 0.5, // Inner dot shrinks on hover
        outer: 1.6, // Outer circle expands on hover
      },
      clickScale: {
        inner: 1.4, // Inner dot expands on click
        outer: 0.2, // Outer circle shrinks on click
      },
      trailingSpeed: 0.18, // Smooth trailing effect
    };

    // 4. Initialize the cursor
    const cursor = AnimatedCursor(cursorOptions);
    cursor.init();

    // 5. Cleanup: The library doesn't provide a built-in destroy method,
    // but we can remove the cursor elements and hide the native cursor again.
    // This ensures the cursor is properly removed if the component unmounts.
    return () => {
      const cursorEl = document.getElementById("cursor");
      if (cursorEl) {
        cursorEl.remove();
      }
      // Re-show the native cursor by removing the inline styles added by the library
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
    };
  }, []);

  // This component doesn't render anything itself; it just sets up the cursor logic.
  return null;
};

export default CustomCursor;
