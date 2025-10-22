require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const { Resend } = require("resend");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// trusting first proxy (Render)
app.set("trust proxy", true);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const allowedOrigins = [process.env.FRONTEND];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the email API" });
});

const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per 15 minutes
  message: {
    message:
      "Too many requests from this IP. Please try again after 15 minutes.",
  },
});
// Handle email sending
app.post(
  "/send-email",
  emailLimiter,
  [
    // Validation rules
    check("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long")
      .escape(),
    check("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address")
      .normalizeEmail(),
    check("message")
      .trim()
      .notEmpty()
      .withMessage("Message is required")
      .isLength({ min: 10 })
      .withMessage("Message must be at least 10 characters long")
      .escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      // 1. Send email to YOU
      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: process.env.EMAIL, // Your email
        reply_to: email, // Visitor's email
        subject: `Portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      });

      // // 2. Send auto-reply to VISITOR
      // await resend.emails.send({
      //   from: "Danish <onboarding@resend.dev>",
      //   to: email, // Visitor's email
      //   subject: "Thank you for your message!",
      //   text: `Hi ${name},\n\nThank you for reaching out. I've received your message and will get back to you soon.\n\nBest regards,\nMd Danish Raza`,
      // });

      // console.log("Emails sent successfully via Resend.");
      res.send({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Resend error:", error);
      res
        .status(500)
        .send({ message: "Error in sending email. Please try again later." });
    }
  }
);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
