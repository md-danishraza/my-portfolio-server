// Standard imports for "above the fold" content (loads instantly)
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";

import Projects from "./components/Projects/Project";
import GitHubStats from "./components/GitHubStats/GitHubStats";
import Experience from "./components/Experience/Experience";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer";

// Theme imports
import AnimatedBackground, {
  ThemeProvider,
} from "./components/DotGrid/AnimatedBackground";
import CustomCursor from "./components/Cursor/AnimatedCursor";

// App content that uses theme
const AppContent = () => {
  return (
    <main role="main">
      <AnimatedBackground />
      <CustomCursor />
      <Navbar />
      <Hero />

      <Projects />
      <GitHubStats />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
};

// Main App with ThemeProvider wrapper
const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
