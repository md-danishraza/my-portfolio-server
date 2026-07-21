// src/components/DotGrid/AnimatedBackground.jsx
import React, { useContext } from "react";
import DotGrid from "./DotGrid.jsx";
import styles from "./AnimatedBackground.module.css";

// Create a Theme Context (if you don't have one)
const ThemeContext = React.createContext();

// Theme provider wrapper
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = React.useState(() => {
    const saved = localStorage.getItem("darkTheme");
    return saved !== null ? saved === "true" : true;
  });

  React.useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkTheme", isDark);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme
export const useTheme = () => useContext(ThemeContext);

// Animated background component
const AnimatedBackground = () => {
  const { isDark } = useTheme();

  return (
    <div className={styles.background}>
      <DotGrid
        dotSize={5} // Size of dots (smaller = more subtle)
        gap={20} // Space between dots
        baseColor={isDark ? "#323232" : "#e4ef1a"} // Theme-aware
        activeColor={isDark ? "#ADFF2F" : "#ff006e"} // Theme-aware
        proximity={150} // How close mouse needs to be to affect dots
        shockRadius={300} // Click radius
        shockStrength={5} // How strong the click effect is
        resistance={800} // Movement resistance
        returnDuration={2} // How long to return to normal
      />
    </div>
  );
};

export default AnimatedBackground;
