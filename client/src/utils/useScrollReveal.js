// src/hooks/useScrollReveal.js - CSS-BASED VERSION
import { useEffect, useRef } from "react";

export default function useScrollReveal(selector, options = {}) {
  const observerRef = useRef(null);

  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    if (elements.length === 0) return;

    // Add base reveal class
    elements.forEach((el) => {
      el.classList.add("reveal-on-scroll");

      // Add origin class if specified
      if (options.origin) {
        el.classList.add(`reveal-${options.origin}`);
      }
    });

    // Setup observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");

            if (!options.reset) {
              observer.unobserve(entry.target);
            }
          } else if (options.reset) {
            entry.target.classList.remove("revealed");
          }
        });
      },
      {
        threshold: options.viewFactor || 0.2,
        rootMargin: "0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    observerRef.current = observer;

    return () => {
      observerRef.current?.disconnect();
    };
  }, [selector, JSON.stringify(options)]);
}
