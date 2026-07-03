import React, { useMemo, useState } from "react";
import useFetchProjects from "../../hooks/useFetchProjects";
import Item from "./Item";
import useScrollReveal from "../../utils/useScrollReveal";
import { DataLoader } from "../Loader/Loader";
import styles from "./Project.module.css";

// Static array outside the component so it isn't recreated on every render
const MENUS = ["All", "Vanilla", "CssLib", "React", "Next", "FullStack"];

function Project() {
  const { loading, projects, error } = useFetchProjects();
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeFilter, setActiveFilter] = useState("All");

  const handleMenu = (stack) => {
    setActiveFilter(stack);
    setVisibleCount(6); // Reset count when changing filters
  };

  // 1. INSTANT State Update: Let the Item.jsx IntersectionObserver handle the staggered animation
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleCollapse = () => {
    setVisibleCount(6);
  };

  useScrollReveal(`#projects > h1`, { origin: "top", delay: 200 });
  useScrollReveal(`#projects > p`, { origin: "top", delay: 300 });
  useScrollReveal(`#projects .${styles.menus} button`, {
    origin: "bottom",
    interval: 150,
  });

  // 2. useMemo: Only recalculate this list when 'projects' data or 'activeFilter' actually changes
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.fields.stack === activeFilter);
  }, [projects, activeFilter]);

  if (error) {
    return <div className="error">Failed to load projects: {error}</div>;
  }

  return (
    <div className={styles["project-section"]} id="projects">
      <div className={styles["project-container"]}>
        <div className={styles["section-header"]}>
          <h1 className={styles["section-title"]}>
            <span className={styles["title-highlight"]}>My</span> Projects
          </h1>
          <p className={styles["section-subtitle"]}>Showcasing my best work</p>
        </div>

        <div className={styles["filter-wrapper"]}>
          <div className={styles.menus}>
            {MENUS.map((stack) => (
              <button
                key={stack}
                onClick={() => handleMenu(stack)}
                className={`${styles["filter-btn"]} ${
                  activeFilter === stack ? styles.active : ""
                }`}
              >
                {stack}
                {activeFilter === stack && (
                  <span className={styles["active-indicator"]}></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <DataLoader text="Fetching Projects" />
        ) : (
          <>
            <div className={styles["projects-grid"]}>
              {filteredProjects.slice(0, visibleCount).map((project, i) => (
                <Item
                  // 3. CRITICAL FIX: Use a unique ID so React knows exactly which card is which
                  key={project.sys?.id || project.fields.title || i}
                  project={project.fields}
                  index={i}
                />
              ))}
            </div>

            {filteredProjects.length > 0 && (
              <div className={styles["pagination-wrapper"]}>
                <div className={styles["pagination-buttons"]}>
                  {filteredProjects.length > visibleCount && (
                    <button
                      onClick={handleLoadMore}
                      className={styles["load-more"]}
                    >
                      <span>Load More</span>
                      <svg
                        className={styles["arrow-icon"]}
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                      >
                        <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
                      </svg>
                    </button>
                  )}
                  {visibleCount >= filteredProjects.length &&
                    filteredProjects.length > 6 && (
                      <button
                        onClick={handleCollapse}
                        className={styles.collapse}
                      >
                        <span>Collapse</span>
                        <svg
                          className={styles["arrow-icon"]}
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                        >
                          <path d="M7 14l5-5 5 5H7z" fill="currentColor" />
                        </svg>
                      </button>
                    )}
                </div>
                <div className={styles["projects-count"]}>
                  Showing {Math.min(visibleCount, filteredProjects.length)} of{" "}
                  {filteredProjects.length} projects
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Project;
