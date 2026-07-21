// src/components/GitHubStats/ProfileCard.jsx
import React from "react";
import { FaMapMarkerAlt, FaLink, FaTwitter, FaBuilding } from "react-icons/fa";
import styles from "./ProfileCard.module.css";

const ProfileCard = ({ user, stats }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num?.toString() || "0";
  };

  const statItems = [
    { icon: "📚", value: stats.repos, label: "Repositories", color: "#6e40c9" },
    {
      icon: "⭐",
      value: formatNumber(stats.stars),
      label: "Stars",
      color: "#f1e05a",
    },
    {
      icon: "🔀",
      value: formatNumber(stats.forks),
      label: "Forks",
      color: "#2b7489",
    },
    {
      icon: "💻",
      value: formatNumber(stats.commits),
      label: "Commits",
      color: "#8957e5",
    },
    {
      icon: "👥",
      value: formatNumber(stats.followers),
      label: "Followers",
      color: "#34d058",
    },
    { icon: "📝", value: "0", label: "Gists", color: "#9f7be1" },
  ];

  return (
    <div className={styles.profileCard}>
      <div className={styles.cardGlow}></div>

      <div className={styles.profileHeader}>
        <div className={styles.avatarWrapper}>
          <img src={user.avatar} alt={user.name} className={styles.avatar} />
          <div className={styles.avatarRing}></div>
        </div>

        <div className={styles.profileInfo}>
          <h2 className={styles.name}>{user.name}</h2>
          <p className={styles.bio}>{user.bio}</p>

          <div className={styles.details}>
            {user.company && (
              <span className={styles.detail}>
                <FaBuilding /> {user.company}
              </span>
            )}
            {user.location && (
              <span className={styles.detail}>
                <FaMapMarkerAlt /> {user.location}
              </span>
            )}
            {user.blog && (
              <a
                href={user.blog}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.detailLink}
              >
                <FaLink /> Website
              </a>
            )}
            {user.twitter && (
              <a
                href={`https://twitter.com/${user.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.detailLink}
              >
                <FaTwitter /> @{user.twitter}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {statItems.map((stat, index) => (
          <div
            key={index}
            className={styles.statCard}
            style={{ "--stat-color": stat.color }}
          >
            {/* <div className={styles.statIcon}>{stat.icon}</div> */}
            <div className={styles.statContent}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
            <div className={styles.statGlow}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
