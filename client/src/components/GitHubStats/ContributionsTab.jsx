// src/components/GitHubStats/ContributionsTab.jsx
import React from "react";
import { FaCalendarAlt, FaFire, FaChartLine } from "react-icons/fa";

import styles from "./ContributionsTab.module.css";

const ContributionsTab = ({ totalCommits, totalRepos, totalStars }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num?.toString() || "0";
  };

  const summaryCards = [
    {
      icon: <FaCalendarAlt />,
      value: formatNumber(totalCommits),
      label: "Total Commits",
      color: "#9be9a8",
    },
    {
      icon: <FaChartLine />,
      value: totalRepos,
      label: "Repositories",
      color: "#40c463",
    },
    {
      icon: <FaFire />,
      value: formatNumber(totalStars),
      label: "Stars Earned",
      color: "#f1e05a",
    },
  ];

  return (
    <div className={styles.contributionsContainer}>
      <div className={styles.summaryGrid}>
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className={styles.summaryCard}
            style={{ "--card-color": card.color }}
          >
            <div className={styles.cardIcon}>{card.icon}</div>
            <div className={styles.cardContent}>
              <span className={styles.cardValue}>{card.value}</span>
              <span className={styles.cardLabel}>{card.label}</span>
            </div>
            <div className={styles.cardGlow}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContributionsTab;
