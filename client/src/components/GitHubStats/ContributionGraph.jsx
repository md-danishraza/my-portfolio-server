// src/components/GitHubStats/ContributionGraph.jsx
import styles from "./ContributionGraph.module.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useState } from "react";

const ContributionGraph = ({ yearData }) => {
  const { year, weeks, totalContributions, maxCount } = yearData;
  const [tooltip, setTooltip] = useState(null);

  const getCommitColor = (count) => {
    if (count === 0) return "var(--c2)";
    const intensity = count / (maxCount || 1);
    if (intensity < 0.2) return "#9be9a8";
    if (intensity < 0.4) return "#40c463";
    if (intensity < 0.6) return "#30a14e";
    if (intensity < 0.8) return "#216e39";
    return "#0a4d1a";
  };

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (!weeks || weeks.length === 0) {
    return (
      <div className={styles.graphCard}>
        <div className={styles.noData}>
          <p>No contribution data available for {year}</p>
        </div>
      </div>
    );
  }

  // Process weeks to ensure 7-day structure and store full day data
  const processedWeeks = weeks.map((week, index) => {
    const paddedWeek = Array(7).fill(null);
    const isFirstWeek = index === 0;

    if (isFirstWeek && week.contributionDays.length < 7) {
      const startIndex = 7 - week.contributionDays.length;
      week.contributionDays.forEach((day, i) => {
        paddedWeek[startIndex + i] = day;
      });
    } else {
      week.contributionDays.forEach((day, i) => {
        paddedWeek[i] = day;
      });
    }
    return paddedWeek;
  });

  // Generate month labels - one per week column for perfect alignment
  const generateMonthLabels = () => {
    if (!processedWeeks.length) return [];

    const labels = [];
    let currentMonth = -1;

    processedWeeks.forEach((week, index) => {
      const firstDay = week.find((d) => d !== null);
      if (!firstDay) return;

      const date = new Date(firstDay.date);
      const month = date.getMonth();
      const monthName = date.toLocaleString("default", { month: "short" });

      if (month !== currentMonth) {
        labels.push({
          name: monthName,
          weekIndex: index,
        });
        currentMonth = month;
      }
    });

    return labels;
  };

  const monthLabels = generateMonthLabels();

  const handleCellEnter = (dayData, dayName, event) => {
    if (!dayData) return;
    const rect = event.target.getBoundingClientRect();
    // CHANGE: Reference the graphCard instead of graphWrapper
    const cardRect = event.target
      .closest(`.${styles.graphCard}`)
      ?.getBoundingClientRect();

    setTooltip({
      date: dayData.date,
      day: dayName,
      count: dayData.contributionCount,
      x: rect.left - (cardRect?.left || 0) + rect.width / 2,
      y: rect.top - (cardRect?.top || 0) - 10, // The -10 floats it slightly above the cell
    });
  };

  const handleCellLeave = () => {
    setTooltip(null);
  };

  return (
    <div className={styles.graphCard}>
      <div className={styles.graphHeader}>
        <h4 className={styles.graphTitle}>
          <FaRegCalendarAlt />
          {year} Contributions
        </h4>
        <div className={styles.graphLegend}>
          <span>Less</span>
          <div className={styles.legendColors}>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: "var(--c2)" }}
            ></div>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: "#9be9a8" }}
            ></div>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: "#40c463" }}
            ></div>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: "#30a14e" }}
            ></div>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: "#216e39" }}
            ></div>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: "#0a4d1a" }}
            ></div>
          </div>
          <span>More</span>
        </div>
      </div>

      {/* CRITICAL: Passing the exact week count to CSS to prevent squishing */}
      <div
        className={styles.graphWrapper}
        style={{ "--week-count": processedWeeks.length }}
      >
        <div className={styles.monthRow}>
          <div className={styles.monthSpacer}></div>
          <div className={styles.monthsContainer}>
            {monthLabels.map((month, i) => (
              <div
                key={i}
                className={styles.monthTag}
                style={{
                  gridColumn: month.weekIndex + 1,
                }}
              >
                {month.name}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.graphRow}>
          <div className={styles.dayColumn}>
            {dayLabels.map((day) => (
              <div key={day} className={styles.dayLabel}>
                {day}
              </div>
            ))}
          </div>

          <div className={styles.gridContainer}>
            {processedWeeks.map((week, weekIndex) => (
              <div key={weekIndex} className={styles.weekColumn}>
                {week.map((dayData, dayIndex) => {
                  const isPlaceholder = dayData === null;
                  const count = isPlaceholder ? 0 : dayData.contributionCount;
                  const dayName = dayLabels[dayIndex];

                  return (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`${styles.commitCell} ${
                        isPlaceholder ? styles.placeholderCell : ""
                      }`}
                      style={{
                        backgroundColor: isPlaceholder
                          ? "transparent"
                          : getCommitColor(count),
                        border: isPlaceholder
                          ? "1px dashed var(--border-color)"
                          : "none",
                      }}
                      onMouseEnter={(e) => handleCellEnter(dayData, dayName, e)}
                      onMouseLeave={handleCellLeave}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {tooltip && (
        <div
          className={styles.tooltip}
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className={styles.tooltipDate}>
            {new Date(tooltip.date).toLocaleDateString("default", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className={styles.tooltipCount}>
            <strong>{tooltip.count}</strong> contribution
            {tooltip.count !== 1 ? "s" : ""}
          </div>
        </div>
      )}

      <div className={styles.graphFooter}>
        <span>Total: {totalContributions.toLocaleString()} contributions</span>
        <span>Peak: {maxCount} in a day</span>
      </div>
    </div>
  );
};

export default ContributionGraph;
