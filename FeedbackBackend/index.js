import express from "express";
import { createTransport } from "nodemailer";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Use json middleware for parsing JSON requests

// Nodemailer setup using environment variables
const transporter = createTransport({
  host: "smtp.gmail.com", // e.g., smtp.gmail.com for Gmail
  port: 587, // Use 465 for secure connection, or 587 for TLS
  secure: false, // Set to true if port is 465
  auth: {
    user: process.env.EMAIL,  // Your Gmail address
    pass: process.env.PASSWORD,  // App password from .env
  },
  debug: true
});

// POST route to handle feedback submission
app.post("/send-feedback", (req, res) => {
 
  const { rating, comments, email } = req.body;

  // Check if the feedback data exists
  if (!rating || !comments || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Email content
  const mailOptions = {
    from: process.env.EMAIL,  // Sender's email from .env
    to: process.env.EMAIL,  // Receiver's email from .env
    subject: "New Feedback Received",  // Subject for the email
    text: `Rating: ${rating}\nComments: ${comments}\nEmail: ${email}`,  // Feedback content
  };

  // Send email using Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending feedback:", error);
      return res.status(500).json({ message: "Failed to send feedback" });
    } else {
      console.log("Feedback sent:", info.response);
      return res.status(200).json({ message: "Feedback submitted successfully!" });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
