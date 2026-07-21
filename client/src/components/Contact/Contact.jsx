// src/components/Contact/Contact.jsx
import React, { useState } from "react";
import js from "../../assets/logos/js.png";
import mongo from "../../assets/logos/mongo.png";
import express from "../../assets/logos/express.png";
import react from "../../assets/logos/react.png";
import node from "../../assets/logos/node.png";
import python from "../../assets/logos/python.png";
import git from "../../assets/logos/git.png";
import java from "../../assets/logos/java.png";
import postgres from "../../assets/logos/postgres.png";
import docker from "../../assets/logos/docker.png";
import kubernetes from "../../assets/logos/kubernetes.png";
import aws from "../../assets/logos/aws.png";
import { toast } from "react-toastify";
import useScrollReveal from "../../utils/useScrollReveal";
import Form from "./Form";
import axios from "axios";
import styles from "./Contact.module.css";

function Contact() {
  const [inputs, setInputs] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const url = import.meta.env.VITE_FORM + "/send-email";

    try {
      const response = await axios.post(url, inputs);
      if (response.data) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
        });
      }
      setInputs({ name: "", email: "", message: "" });
    } catch (error) {
      let errorMessage = "An unknown error occurred.";
      if (error.response) {
        if (error.response.data.errors) {
          errorMessage = error.response.data.errors
            .map((err) => err.msg)
            .join(" ");
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        errorMessage =
          "Could not connect to the server. Please try again later.";
      }
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useScrollReveal(`#contactHeading`, { origin: "top", delay: 200 });
  useScrollReveal(`.${styles["about-column"]}`, { origin: "left", delay: 200 });
  useScrollReveal(`.${styles["form-column"]}`, { origin: "right", delay: 300 });

  const skills = [
    { src: js, name: "JavaScript" },
    { src: react, name: "React" },
    { src: node, name: "Node.js" },
    { src: express, name: "Express" },
    { src: mongo, name: "MongoDB" },
    { src: postgres, name: "PostgreSQL" },
    { src: python, name: "Python" },
    { src: java, name: "Java" },
    { src: git, name: "Git" },
    { src: docker, name: "Docker" },
    { src: kubernetes, name: "Kubernetes" },
    { src: aws, name: "AWS" },
  ];

  return (
    <div className={styles["contact-section"]} id="contact">
      <div className={styles["contact-container"]}>
        <div className={styles["section-header"]}>
          <h1 id="contactHeading" className={styles["section-title"]}>
            Get In <span className={styles["title-highlight"]}>Touch</span>
          </h1>
          <div className={styles["title-decoration"]}>
            <span className={styles.line}></span>
            <span className={styles.dot}></span>
            <span className={styles.line}></span>
          </div>
        </div>

        <div className={styles["contact-content"]}>
          <div className={styles["about-column"]}>
            <div className={styles["about-card"]}>
              <div className={styles["about-header"]}>
                <h2 className={styles["about-name"]}>MD Danish Raza</h2>
                <p className={styles["about-role"]}>Full Stack Developer</p>
              </div>
              <div className={styles["about-bio"]}>
                <p>
                  Ambitious full-stack JavaScript developer with a solid
                  background in web development, data analysis, and backend
                  systems. Currently studying for a Bachelor in Vocation Studies
                  SDE at DU.
                </p>
              </div>
              <div className={styles["contact-info"]}>
                <div className={styles["info-item"]}>
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path
                      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>md.danish0raza@gmail.com</span>
                </div>
                <div className={styles["info-item"]}>
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Delhi, India</span>
                </div>
              </div>
              <div className={styles["skills-section"]}>
                <h3 className={styles["skills-title"]}>Tech Stack</h3>
                <div className={styles["skills-grid"]}>
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className={styles["skill-item"]}
                      title={skill.name}
                    >
                      <img src={skill.src} alt={skill.name} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles["form-column"]}>
            <div className={styles["form-card"]}>
              <div className={styles["form-header"]}>
                <h2 className={styles["form-title"]}>Send Message</h2>
                <p className={styles["form-subtitle"]}>
                  I'll get back to you soon
                </p>
              </div>
              <Form
                inputs={inputs}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                isLoading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
