import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaHeart, MdEmail } from "./icons";

import useScrollReveal from "../utils/useScrollReveal";

function Footer() {
  const currentYear = new Date().getFullYear();

  useScrollReveal(".footer-content", {
    origin: "bottom",
    delay: 200,
    viewFactor: 0.1,
    duration: 1000,
  });

  const socialLinks = [
    {
      icon: <FaGithub />,
      url: "https://github.com/md-danishraza",
      label: "GitHub",
      color: "#333",
    },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/md-danish-raza-2039b5276/",
      label: "LinkedIn",
      color: "#0077b5",
    },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/renderstic/",
      label: "Instagram",
      color: "#e4405f",
    },
    {
      icon: <MdEmail />,
      url: "mailto:md.danish0raza@gmail.com",
      label: "Email",
      color: "#ea4335",
    },
  ];

  const quickLinks = [
    { name: "Home", url: "#" },
    { name: "Projects", url: "#projects" },
    { name: "Github", url: "#github" },
    { name: "Experience", url: "#experience" },
    { name: "Contact", url: "#contact" },
  ];

  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section brand">
            <h3 className="footer-logo">
              <span className="logo-highlight">MD</span> Danish Raza
            </h3>
            <p className="footer-tagline">
              Full Stack Developer creating amazing web experiences
            </p>
            <div className="footer-social">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={link.label}
                  title={link.label}
                  style={{ "--social-color": link.color }}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section links">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-menu">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="footer-link">
                    <span className="link-arrow">→</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="footer-section tech">
            <h4 className="footer-title">Tech Stack</h4>
            <div className="tech-tags">
              <span className="tech-tag">React</span>
              <span className="tech-tag">Node.js</span>
              <span className="tech-tag">Express</span>
              <span className="tech-tag">MongoDB</span>
              <span className="tech-tag">JavaScript</span>
              <span className="tech-tag">Typescript</span>
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Docker</span>
              <span className="tech-tag">AWS</span>
            </div>
          </div>

          {/* Newsletter/Contact CTA */}
          <div className="footer-section newsletter">
            <h4 className="footer-title">Let's Connect</h4>
            <p className="newsletter-text">
              Have a project in mind? Let's work together!
            </p>
            <a href="#contact" className="footer-cta">
              Get In Touch
              <svg
                className="cta-arrow"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>
              &copy; {currentYear}
              {/* <span className="copyright-highlight"> Md. Danish Raza</span> */}
            </p>
          </div>
          <div className="made-with">
            <p>
              Made with
              <FaHeart className="heart-icon" />
              by Me
            </p>
          </div>
          <div className="footer-badges">
            <span className="badge">v2.5</span>
            <span className="badge">Portfolio</span>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <a href="#" className="back-to-top" aria-label="Back to top">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            d="M12 19V5M5 12l7-7 7 7"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </a>
    </footer>
  );
}

export default Footer;
