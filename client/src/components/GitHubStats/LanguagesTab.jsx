// src/components/GitHubStats/LanguagesTab.jsx
import React from "react";
import { HiCode, HiChartBar, HiOutlineColorSwatch } from "react-icons/hi";
import styles from "./LanguagesTab.module.css";

const LanguagesTab = ({ languages, totalRepos }) => {
  const total =
    totalRepos || languages.reduce((sum, lang) => sum + lang.count, 0);

  // Predefined vibrant colors for languages that don't have one
  const vibrantColors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E2",
    "#F8C471",
    "#A3E4D7",
    "#F9E79F",
    "#D7BDE2",
    "#AED6F1",
  ];

  const getLanguageColor = (lang, index) => {
    if (lang.color && lang.color !== "#858585") return lang.color;
    return vibrantColors[index % vibrantColors.length];
  };

  return (
    <div className={styles.languagesContainer}>
      {/* Top Languages Card */}
      <div className={styles.languagesCard}>
        <div className={styles.cardHeader}>
          <div className={styles.headerIconWrapper}>
            <HiCode className={styles.headerIcon} />
          </div>
          <div>
            <h3 className={styles.cardTitle}>Top Languages</h3>
            <p className={styles.cardSubtitle}>Most used technologies</p>
          </div>
        </div>

        <div className={styles.languagesList}>
          {languages.map((lang, index) => {
            const color = getLanguageColor(lang, index);
            const percentage = Math.round((lang.count / total) * 100);

            return (
              <div key={lang.name} className={styles.languageItem}>
                <div className={styles.languageHeader}>
                  <div className={styles.languageInfo}>
                    <span
                      className={styles.languageDot}
                      style={{
                        backgroundColor: color,
                        boxShadow: `0 0 8px ${color}`,
                      }}
                    ></span>
                    <span className={styles.languageName}>{lang.name}</span>
                  </div>
                  <div className={styles.languageStats}>
                    <span className={styles.languageCount}>
                      {lang.count} {lang.count === 1 ? "repo" : "repos"}
                    </span>
                    <span
                      className={styles.languagePercent}
                      style={{ color: color }}
                    >
                      {percentage}%
                    </span>
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: color,
                      boxShadow: `0 0 10px ${color}80`,
                    }}
                  >
                    <div className={styles.progressGlow}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Distribution Chart Card */}
      <div className={styles.distributionCard}>
        <div className={styles.cardHeader}>
          <div className={styles.headerIconWrapper}>
            <HiChartBar className={styles.headerIcon} />
          </div>
          <div>
            <h3 className={styles.cardTitle}>Language Distribution</h3>
            <p className={styles.cardSubtitle}>
              Usage breakdown by repository count
            </p>
          </div>
        </div>

        <div className={styles.distributionChart}>
          {languages.map((lang, index) => {
            const color = getLanguageColor(lang, index);
            const percentage = Math.round((lang.count / total) * 100);

            return (
              <div
                key={lang.name}
                className={styles.chartSegment}
                style={{
                  width: `${percentage}%`,
                  backgroundColor: color,
                  //   boxShadow: `inset 0 1px 2px rgba(255,255,255,0.3), 0 0 5px ${color}`,
                }}
                title={`${lang.name}: ${lang.count} repos (${percentage}%)`}
              >
                <div
                  className={styles.segmentGlow}
                  style={{
                    background: `linear-gradient(90deg, ${color}40, transparent)`,
                  }}
                ></div>
              </div>
            );
          })}
        </div>

        <div className={styles.legendGrid}>
          {languages.map((lang, index) => {
            const color = getLanguageColor(lang, index);
            const percentage = Math.round((lang.count / total) * 100);

            return (
              <div key={lang.name} className={styles.legendItem}>
                <span
                  className={styles.legendDot}
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 0 8px ${color}`,
                  }}
                ></span>
                <span className={styles.legendName}>{lang.name}</span>
                <div className={styles.legendBar}>
                  <div
                    className={styles.legendBarFill}
                    style={{ width: `${percentage}%`, backgroundColor: color }}
                  ></div>
                </div>
                <span className={styles.legendPercent} style={{ color: color }}>
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Summary Card */}
      <div className={styles.summaryCard}>
        <div className={styles.summaryItem}>
          <HiOutlineColorSwatch className={styles.summaryIcon} />
          <div className={styles.summaryInfo}>
            <span className={styles.summaryValue}>{languages.length}</span>
            <span className={styles.summaryLabel}>Languages Used</span>
          </div>
        </div>
        <div className={styles.summaryDivider}></div>
        <div className={styles.summaryItem}>
          <HiOutlineColorSwatch className={styles.summaryIcon} />
          <div className={styles.summaryInfo}>
            <span className={styles.summaryValue}>{total}</span>
            <span className={styles.summaryLabel}>Total Repositories</span>
          </div>
        </div>
        <div className={styles.summaryDivider}></div>
        <div className={styles.summaryItem}>
          <HiOutlineColorSwatch className={styles.summaryIcon} />
          <div className={styles.summaryInfo}>
            <span className={styles.summaryValue}>
              {languages[0]?.name || "N/A"}
            </span>
            <span className={styles.summaryLabel}>Primary Language</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguagesTab;
