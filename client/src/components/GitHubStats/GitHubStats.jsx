// src/components/GitHubStats/GitHubStats.jsx
import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { fetchGitHubData } from "./utils.js";
import Loader from "../Loader/Loader.jsx";
import ProfileCard from "./ProfileCard";
import RecentRepos from "./RecentRepos";
import ContributionsTab from "./ContributionsTab";
import LanguagesTab from "./LanguagesTab";
import styles from "./GitHubStats.module.css";
import YearlyContributionGraph from "./YearlyContributionGraph.jsx";

function GitHubStats() {
  const [data, setData] = useState({
    user: {},
    repos: [],
    totalStars: 0,
    totalForks: 0,
    totalCommits: 0,
    topLanguages: [],
    yearlyContributions: [], // Changed from contributionCalendar
    firstYear: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const username = "md-danishraza";
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const githubData = await fetchGitHubData(username, token);
        setData(githubData);
        setLoading(false);
      } catch (err) {
        console.error("Error loading GitHub data:", err);
        setError(err.message || "Failed to load GitHub data");
        setLoading(false);
      }
    };

    if (token) loadData();
    else setError("GitHub token not found");
  }, [username, token]);

  if (loading)
    return (
      <div className={styles.container}>
        <Loader
          type="pulse"
          text="Fetching GitHub data..."
          size="large"
          color="#9be9a8"
        />
      </div>
    );

  if (error)
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <FaGithub className={styles.errorIcon} />
          <h3>Unable to load GitHub data</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );

  const stats = {
    repos: data.repos.length,
    stars: data.totalStars,
    forks: data.totalForks,
    commits: data.totalCommits,
    followers: data.user.followers,
  };

  return (
    <section className={styles.section} id="github">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            <FaGithub className={styles.titleIcon} />
            GitHub <span className={styles.titleHighlight}>Stats</span>
          </h2>
          <p className={styles.subtitle}>
            My open source contributions and activity
          </p>
        </div>

        {/* Profile Card */}
        <ProfileCard user={data.user} stats={stats} />

        {/* Tabs */}
        <div className={styles.tabs}>
          {["overview", "contributions", "languages"].map((tab) => (
            <button
              key={tab}
              className={`${styles.tabButton} ${
                activeTab === tab ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === "overview" && (
            <>
              {data.yearlyContributions &&
                data.yearlyContributions.length > 0 && (
                  <YearlyContributionGraph
                    yearlyData={data.yearlyContributions}
                  />
                )}
              <RecentRepos repos={data.repos} />
            </>
          )}

          {activeTab === "contributions" && (
            <ContributionsTab
              totalCommits={data.totalCommits}
              totalRepos={data.repos.length}
              totalStars={data.totalStars}
              yearlyContributions={data.yearlyContributions}
            />
          )}
          {activeTab === "languages" && (
            <LanguagesTab
              languages={data.topLanguages}
              totalRepos={data.repos.length}
            />
          )}
        </div>

        {/* View All Button */}
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.viewAllButton}
        >
          View All Repositories
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}

export default GitHubStats;
