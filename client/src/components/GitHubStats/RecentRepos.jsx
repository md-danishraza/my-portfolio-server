// src/components/GitHubStats/RecentRepos.jsx
import React from "react";
import { FaStar, FaCodeBranch, FaExternalLinkAlt } from "react-icons/fa";
import styles from "./RecentRepos.module.css";

const RecentRepos = ({ repos }) => {
  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      Python: "#3572A5",
      Java: "#b07219",
      HTML: "#e34c26",
      CSS: "#563d7c",
      React: "#61dafb",
      "C++": "#f34b7d",
      default: "#858585",
    };
    return colors[language] || colors.default;
  };

  //   console.log(repos);
  return (
    <div className={styles.reposCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>Recent Repositories</h3>
        <div className={styles.titleDecoration}></div>
      </div>
      <div className={styles.reposList}>
        {repos.slice(0, 5).map((repo, index) => (
          <a
            key={repo.name}
            href={repo.svn_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.repoItem}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={styles.repoIcon}>
              {/* <div className={styles.iconWrapper}>📁</div> */}
            </div>

            <div className={styles.repoInfo}>
              <h4 className={styles.repoName}>{repo.name}</h4>
              {repo.description && (
                <p className={styles.repoDescription}>{repo.description}</p>
              )}
              <div className={styles.repoMeta}>
                {repo.primaryLanguage && (
                  <span className={styles.repoLanguage}>
                    <span
                      className={styles.languageDot}
                      style={{
                        backgroundColor: getLanguageColor(
                          repo.primaryLanguage.name
                        ),
                      }}
                    ></span>
                    {repo.primaryLanguage.name}
                  </span>
                )}
                <span className={styles.repoStars}>
                  <FaStar /> {repo.stargazerCount || 0}
                </span>
                <span className={styles.repoForks}>
                  <FaCodeBranch /> {repo.forkCount || 0}
                </span>
              </div>
            </div>

            <div className={styles.repoArrow}>
              <FaExternalLinkAlt />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RecentRepos;
