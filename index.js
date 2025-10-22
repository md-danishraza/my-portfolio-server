require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// trusting first proxy (Render)
app.set("trust proxy", 1);

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
  windowMs: 24 * 60 * 60 * 1000, // 1 day
  max: 1, // Limit each IP to 1 requests per windowMs
  message: "Too many email requests from this IP, please try again later.",
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
    // [FYI: The stray comma that was here is removed]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APPPASS,
      },
    });

    // 1. Mail to myself
    const mailToOwnerOptions = {
      from: `"Your Portfolio" <${process.env.EMAIL}>`,
      to: process.env.EMAIL, // Send to yourself
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    };

    // 2. Auto-reply Mail to the VISITOR
    const autoReplyOptions = {
      from: `"Your Name/Brand" <${process.env.EMAIL}>`,
      to: email, // Send to the visitor
      subject: "Thank you for your message!",
      text: `Hi ${name},\n\nThank you for reaching out. I've received your message and will get back to you as soon as possible.\n\nBest regards,\nYour Name`,
    };

    try {
      // Send both emails
      await transporter.sendMail(mailToOwnerOptions);
      await transporter.sendMail(autoReplyOptions);

      console.log("Emails sent successfully.");
      res.send({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error occurred:", error);
      res
        .status(500)
        .send({ message: "Error in sending email. Please try again later." });
    }
  }
);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
