// src/components/GitHubStats/YearlyContributionGraph.jsx
import React, { useState } from "react";
import styles from "./YearlyContributionGraph.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ContributionGraph from "./ContributionGraph";

const YearlyContributionGraph = ({ yearlyData }) => {
  const [selectedYear, setSelectedYear] = useState(() => {
    if (!yearlyData || yearlyData.length === 0) return new Date().getFullYear();
    return yearlyData[yearlyData.length - 1]?.year || new Date().getFullYear();
  });

  const currentYearData = yearlyData.find((d) => d.year === selectedYear);

  const firstYear = yearlyData[0]?.year;
  const lastYear = yearlyData[yearlyData.length - 1]?.year;

  return (
    <div className={styles.yearlyContainer}>
      {/* Year Selector */}
      <div className={styles.yearSelector}>
        <button
          onClick={() => setSelectedYear((prev) => prev - 1)}
          disabled={!firstYear || selectedYear === firstYear}
          className={styles.yearNav}
          aria-label="Previous year"
        >
          <FaChevronLeft />
        </button>

        <div className={styles.yearDisplay}>
          <span className={styles.yearLabel}>{selectedYear}</span>
          <div className={styles.yearDecoration}></div>
        </div>

        <button
          onClick={() => setSelectedYear((prev) => prev + 1)}
          disabled={!lastYear || selectedYear === lastYear}
          className={styles.yearNav}
          aria-label="Next year"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Contribution Graph for selected year */}
      {currentYearData ? (
        <ContributionGraph yearData={currentYearData} />
      ) : (
        <div className={styles.noDataCard}>
          <p>No contribution data available for {selectedYear}</p>
        </div>
      )}
    </div>
  );
};

export default YearlyContributionGraph;
