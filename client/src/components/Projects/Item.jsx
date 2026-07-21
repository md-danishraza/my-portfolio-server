// src/components/Projects/Item.jsx
import React, { useState, useEffect, useRef, memo } from "react";
import styles from "./Item.module.css";

const Item = memo(({ project, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 425);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), (index % 10) * 50);
          observer.disconnect();
        }
      },
      { rootMargin: "50px", threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  const imgUrl = project.image.fields.file.url;

  const handleCardClick = () => {
    if (isMobile) setIsHovered(!isHovered);
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.projectCard} ${
        isVisible ? styles.show : styles.hide
      } ${isMobile ? styles.mobile : ""}`}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Glow effect on hover */}
      <div className={styles.cardGlow}></div>

      <div className={styles.cardImageWrapper}>
        <div
          className={styles.imagePlaceholder}
          style={{ opacity: loaded ? 0 : 1 }}
        />

        <img
          className={`${styles.projectImage} ${
            loaded ? styles.loaded : styles.loading
          }`}
          src={`${imgUrl}?w=600&q=80&fm=webp`}
          srcSet={`
            ${imgUrl}?w=400&q=80&fm=webp 400w,
            ${imgUrl}?w=800&q=80&fm=webp 800w,
            ${imgUrl}?w=1200&q=80&fm=webp 1200w
          `}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={project.image.fields.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
        />

        {/* Gradient overlay on image */}
        <div className={styles.imageGradient}></div>

        <div
          className={`${styles.cardOverlay} ${isHovered ? styles.active : ""}`}
        >
          <div className={styles.overlayContent}>
            {/* <div className={styles.overlayIcon}>✨</div> */}
            <h3 className={styles.overlayTitle}>{project.title}</h3>
            <div className={styles.overlayLinks}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                // className={`${styles.overlayLink} ${styles.live}`}
                className={`${styles.overlayLink} ${styles.code}`}
                onClick={(e) => e.stopPropagation()}
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M15 3h6v6"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M10 14L21 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                <span>Live </span>
              </a>
              {project?.code && (
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  // className={`${styles.overlayLink} ${styles.code}`}
                  className={`${styles.overlayLink} ${styles.live}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                  <span>View Code</span>
                </a>
              )}
            </div>
            {isMobile && isHovered && (
              <button
                className={styles.overlayClose}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsHovered(false);
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className={styles.cardBadge}>
          <span className={styles.stackTag}>{project.stack || "Web"}</span>
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>{project.title}</h2>
          <div className={styles.cardIcon}>
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
            </svg>
          </div>
        </div>
        <p className={styles.cardDescription}>
          {project.description ||
            "A modern web application built with cutting-edge technologies."}
        </p>
        <div className={styles.cardFooter}>
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.readMore}>
              <span>Explore Project</span>
              <svg viewBox="0 0 24 24" width="14" height="14">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </a>
        </div>
        {isMobile && (
          <div className={styles.mobileTapIndicator}>
            <span>Tap for details</span>
            <svg viewBox="0 0 24 24" width="14" height="14">
              <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
});

export default Item;
