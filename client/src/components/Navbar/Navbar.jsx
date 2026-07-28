// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect } from "react";
import {
  FaGithubSquare,
  FaLinkedin,
  FaInstagramSquare,
  FaTimes,
  FaBars,
  FaCodeBranch
} from "../icons";
import { SiLeetcode } from 'react-icons/si';
import GlowingCircleTheme from "../Theme/GlowingCircleTheme";
import styles from "./Navbar.module.css";

function Navbar() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    setMenu(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menu]);

  return (
    <div className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.links}>
        <a
          href="https://leetcode.com/u/md-danishraza/"
          title="Leetcode"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <FaLeetco  /> */}
          <SiLeetcode className={styles.icon} />;
        </a>
        <a
          href="https://github.com/md-danishraza"
          title="github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithubSquare className={styles.icon} />
        </a>
        <a
          href="https://www.linkedin.com/in/md-danish-raza-2039b5276/"
          title="linkedin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className={styles.icon} />
        </a>
        <a
          href="https://www.instagram.com/renderstic/"
          title="instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagramSquare className={styles.icon} />
        </a>
      </div>

      {/* Desktop Navigation */}
      <div className={styles.navigations}>
        <a href="#" className={styles.navlinks} onClick={handleLinkClick}>
          HOME
        </a>
        <a
          href="#projects"
          className={styles.navlinks}
          onClick={handleLinkClick}
        >
          PROJECTS
        </a>
        <a href="#github" className={styles.navlinks} onClick={handleLinkClick}>
          STATS
        </a>
        <a
          href="#experience"
          className={styles.navlinks}
          onClick={handleLinkClick}
        >
          EXPERIENCE
        </a>
        <a
          href="#contact"
          className={styles.navlinks}
          onClick={handleLinkClick}
        >
          CONTACT
        </a>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.mobileOverlay} ${menu ? styles.active : ""}`}
        onClick={handleLinkClick}
      />

      {/* Mobile Navigation */}
      <div className={`${styles.mobileNav} ${menu ? styles.active : ""}`}>
        <div className={styles.mobileNavHeader}>
          <span className={styles.mobileLogo}>MD</span>
          <button
            className={styles.closeButton}
            onClick={() => setMenu(false)}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>
        <div className={styles.mobileNavLinks}>
          <a
            href="#"
            className={styles.mobileNavlink}
            onClick={handleLinkClick}
          >
            <span className={styles.linkNumber}>01</span>
            <span className={styles.linkText}>HOME</span>
            <span className={styles.linkArrow}>→</span>
          </a>
          <a
            href="#projects"
            className={styles.mobileNavlink}
            onClick={handleLinkClick}
          >
            <span className={styles.linkNumber}>02</span>
            <span className={styles.linkText}>PROJECTS</span>
            <span className={styles.linkArrow}>→</span>
          </a>
          <a
            href="#github"
            className={styles.mobileNavlink}
            onClick={handleLinkClick}
          >
            <span className={styles.linkNumber}>03</span>
            <span className={styles.linkText}>STATS</span>
            <span className={styles.linkArrow}>→</span>
          </a>
          <a
            href="#experience"
            className={styles.mobileNavlink}
            onClick={handleLinkClick}
          >
            <span className={styles.linkNumber}>04</span>
            <span className={styles.linkText}>EXPERIENCE</span>
            <span className={styles.linkArrow}>→</span>
          </a>
          <a
            href="#contact"
            className={styles.mobileNavlink}
            onClick={handleLinkClick}
          >
            <span className={styles.linkNumber}>05</span>
            <span className={styles.linkText}>CONTACT</span>
            <span className={styles.linkArrow}>→</span>
          </a>
        </div>
        <div className={styles.mobileNavFooter}>
          <p>© 2026 MD Danish Raza</p>
          <div className={styles.mobileSocial}>
            <a
              href="https://github.com/md-danishraza"
              target="_blank"
              rel="noopener noreferrer"
            >
              GH
            </a>
            <a
              href="https://www.linkedin.com/in/md-danish-raza-2039b5276/"
              target="_blank"
              rel="noopener noreferrer"
            >
              IN
            </a>
            <a
              href="https://www.instagram.com/renderstic/"
              target="_blank"
              rel="noopener noreferrer"
            >
              IG
            </a>
          </div>
        </div>
      </div>

      <div className={styles.menuTheme}>
        <GlowingCircleTheme />

        <button
          className={`${styles.menuToggle} ${menu ? styles.active : ""}`}
          onClick={() => setMenu(!menu)}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
