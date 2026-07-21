// Loader.jsx
import React from "react";
import styles from "./Loader.module.css";

const Loader = ({
  type = "spinner", // spinner, pulse, wave, progress, dots
  text = "Loading...",
  size = "medium", // small, medium, large
  fullScreen = false,
  overlay = false,
  progress = 0, // 0-100 for progress type
  color = "var(--highlight)",
  icon = null, // optional custom icon
}) => {
  // Size mappings
  const sizeMap = {
    small: {
      container: styles.small,
      text: styles.textSmall,
      spinner: styles.spinnerSmall,
      dot: styles.dotSmall,
    },
    medium: {
      container: styles.medium,
      text: styles.textMedium,
      spinner: styles.spinnerMedium,
      dot: styles.dotMedium,
    },
    large: {
      container: styles.large,
      text: styles.textLarge,
      spinner: styles.spinnerLarge,
      dot: styles.dotLarge,
    },
  };

  const selectedSize = sizeMap[size] || sizeMap.medium;

  // Render different loader types
  const renderLoader = () => {
    switch (type) {
      case "spinner":
        return (
          <div className={styles.spinnerContainer}>
            <div
              className={`${styles.spinner} ${selectedSize.spinner}`}
              style={{ "--loader-color": color }}
            >
              {[...Array(12)].map((_, i) => (
                <div key={i} className={styles.spinnerBlade}></div>
              ))}
            </div>
          </div>
        );

      case "pulse":
        return (
          <div className={styles.pulseContainer}>
            <div
              className={`${styles.pulse} ${selectedSize.spinner}`}
              style={{ "--loader-color": color }}
            ></div>
            <div
              className={`${styles.pulseRing}`}
              style={{ "--loader-color": color }}
            ></div>
          </div>
        );

      case "wave":
        return (
          <div className={styles.waveContainer}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`${styles.waveBar} ${selectedSize.spinner}`}
                style={{
                  "--loader-color": color,
                  "--delay": `${i * 0.1}s`,
                }}
              ></div>
            ))}
          </div>
        );

      case "progress":
        return (
          <div className={styles.progressContainer}>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${progress}%`,
                  "--loader-color": color,
                }}
              >
                <div className={styles.progressGlow}></div>
              </div>
            </div>
            <span className={styles.progressText}>{progress}%</span>
          </div>
        );

      case "dots":
        return (
          <div className={styles.dotsContainer}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`${styles.dot} ${selectedSize.dot}`}
                style={{
                  "--loader-color": color,
                  "--delay": `${i * 0.15}s`,
                }}
              ></div>
            ))}
          </div>
        );

      default:
        return (
          <div className={styles.spinnerContainer}>
            <div
              className={`${styles.spinner} ${selectedSize.spinner}`}
              style={{ "--loader-color": color }}
            >
              {[...Array(12)].map((_, i) => (
                <div key={i} className={styles.spinnerBlade}></div>
              ))}
            </div>
          </div>
        );
    }
  };

  const LoaderContent = () => (
    <div className={`${styles.loader} ${selectedSize.container}`}>
      {icon && <div className={styles.customIcon}>{icon}</div>}

      {renderLoader()}

      {text && (
        <div className={`${styles.textContainer} ${selectedSize.text}`}>
          <p className={styles.text}>{text}</p>
          {type === "progress" && progress < 100 && (
            <span className={styles.dots}>...</span>
          )}
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className={`${styles.fullScreen} ${overlay ? styles.overlay : ""}`}>
        <LoaderContent />
      </div>
    );
  }

  if (overlay) {
    return (
      <div className={styles.overlayWrapper}>
        <LoaderContent />
      </div>
    );
  }

  return <LoaderContent />;
};

// Predefined loaders for common use cases
export const PageLoader = () => (
  <Loader
    type="spinner"
    text="Loading page..."
    size="large"
    fullScreen
    overlay
  />
);

export const DataLoader = ({ text = "Fetching data..." }) => (
  <Loader type="dots" text={text} size="medium" />
);

export const GitHubLoader = () => (
  <Loader
    type="pulse"
    text="Fetching GitHub data..."
    size="large"
    fullScreen
    overlay
    color="#9be9a8"
  />
);

export const ImageLoader = () => <Loader type="wave" text="" size="small" />;

export const ProgressLoader = ({ progress }) => (
  <Loader
    type="progress"
    text="Uploading..."
    progress={progress}
    size="medium"
  />
);

export default Loader;
