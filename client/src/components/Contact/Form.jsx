// src/components/Contact/Form.jsx
import React from "react";
import styles from "./Contact.module.css";

function Form({ inputs, handleSubmit, handleChange, isLoading }) {
  return (
    <form onSubmit={handleSubmit} className={styles["contact-form"]}>
      <div className={styles["form-group"]}>
        <input
          type="text"
          name="name"
          id="name"
          value={inputs.name}
          onChange={handleChange}
          required
          placeholder=" "
        />
        <label htmlFor="name" className={styles["form-label"]}>
          Your Name
        </label>
        <span className={styles["focus-border"]}></span>
      </div>

      <div className={styles["form-group"]}>
        <input
          type="email"
          name="email"
          id="email"
          value={inputs.email}
          onChange={handleChange}
          required
          placeholder=" "
        />
        <label htmlFor="email" className={styles["form-label"]}>
          Email Address
        </label>
        <span className={styles["focus-border"]}></span>
      </div>

      <div className={styles["form-group"]}>
        <textarea
          name="message"
          id="message"
          rows="5"
          value={inputs.message}
          onChange={handleChange}
          required
          placeholder=" "
        />
        <label htmlFor="message" className={styles["form-label"]}>
          Your Message
        </label>
        <span className={styles["focus-border"]}></span>
      </div>

      <button
        type="submit"
        className={`${styles["submit-btn"]} ${isLoading ? styles.loading : ""}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className={styles.spinner}></span>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <svg
              className={styles["send-icon"]}
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path d="M2 21L23 12 2 3v7l15 2-15 2v7z" fill="currentColor" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}

export default Form;
