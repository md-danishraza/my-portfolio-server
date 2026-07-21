// Experience.jsx
import React, { useState } from "react";
import { experiences, techColors } from "./Data.js";
import { FaCalendar, FaMapMarkerAlt, FaBriefcase } from "../icons.jsx";
import { HiCode, HiOutlineOfficeBuilding } from "../icons.jsx";
import { MdWork } from "react-icons/md";
import useScrollReveal from "../../utils/useScrollReveal";
import styles from "./Experience.module.css";

function Experience() {
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("all");

  useScrollReveal(`.${styles.header}`, { origin: "top", delay: 200 });
  useScrollReveal(`.${styles.timelineItem}`, {
    origin: "bottom",
    interval: 150,
    viewFactor: 0.1,
  });

  // Filter experiences
  const filteredExperiences =
    filter === "all"
      ? experiences
      : experiences.filter((exp) =>
          exp.type.toLowerCase().includes(filter.toLowerCase())
        );

  // Get unique experience types for filter
  const experienceTypes = [
    "all",
    ...new Set(experiences.map((exp) => exp.type.toLowerCase())),
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className={styles.section} id="experience">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            <MdWork className={styles.titleIcon} />
            Professional{" "}
            <span className={styles.titleHighlight}>Experience</span>
          </h2>
          <p className={styles.subtitle}>My journey in software development</p>

          {/* Filter Buttons */}
          <div className={styles.filterContainer}>
            {experienceTypes.map((type) => (
              <button
                key={type}
                className={`${styles.filterButton} ${
                  filter === type ? styles.activeFilter : ""
                }`}
                onClick={() => setFilter(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {filteredExperiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`${styles.timelineItem} ${
                index % 2 === 0 ? styles.left : styles.right
              }`}
            >
              {/* Timeline Dot with Icon */}
              <div
                className={styles.timelineDot}
                style={{ "--dot-color": exp.color || "var(--highlight)" }}
              >
                <span className={styles.dotIcon}>{exp.icon || "💼"}</span>
              </div>

              {/* Content Card */}
              <div
                className={`${styles.contentCard} ${
                  expandedId === exp.id ? styles.expanded : ""
                }`}
                style={{ "--card-accent": exp.color || "var(--highlight)" }}
              >
                {/* Card Header */}
                <div
                  className={styles.cardHeader}
                  onClick={() => toggleExpand(exp.id)}
                >
                  <div className={styles.headerLeft}>
                    <h3 className={styles.jobTitle}>{exp.title}</h3>
                    <div className={styles.companyInfo}>
                      <HiOutlineOfficeBuilding className={styles.infoIcon} />
                      <span className={styles.companyName}>{exp.company}</span>
                    </div>
                  </div>
                  <div className={styles.headerRight}>
                    <span className={styles.expandIcon}>
                      {expandedId === exp.id ? "−" : "+"}
                    </span>
                  </div>
                </div>

                {/* Job Meta Info */}
                <div className={styles.jobMeta}>
                  <span className={styles.metaItem}>
                    <FaCalendar className={styles.metaIcon} />
                    {exp.startDate} - {exp.endDate}
                  </span>
                  <span className={styles.metaItem}>
                    <FaMapMarkerAlt className={styles.metaIcon} />
                    {exp.location}
                  </span>
                  <span className={`${styles.metaItem} ${styles.jobType}`}>
                    <FaBriefcase className={styles.metaIcon} />
                    {exp.type}
                  </span>
                </div>

                {/* Achievements (Expandable) */}
                <div
                  className={`${styles.achievements} ${
                    expandedId === exp.id ? styles.show : ""
                  }`}
                >
                  <ul className={styles.achievementsList}>
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className={styles.achievementItem}>
                        <span className={styles.bulletPoint}>▹</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies Used */}
                  <div className={styles.techStack}>
                    <HiCode className={styles.techIcon} />
                    <div className={styles.techTags}>
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={styles.techTag}
                          style={{
                            backgroundColor:
                              techColors[tech] || techColors.default,
                            boxShadow: `0 2px 8px ${techColors[tech]}40`,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Year Badge */}
                <div className={styles.yearBadge}>
                  {exp.startDate.split(" ")[1] || exp.startDate}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Link */}
        <div className={styles.viewMore}>
          <a
            href="https://www.linkedin.com/in/md-danish-raza-2039b5276/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewMoreLink}
          >
            View full profile on LinkedIn
            <svg
              className={styles.linkArrow}
              viewBox="0 0 24 24"
              width="18"
              height="18"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Experience;
