import express from "express";
import { createTransport } from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// === Progress File Path ===
const PROGRESS_FILE = path.join("progress.json");

// === Helper Functions ===
const loadProgress = () => {
  try {
    const data = fs.readFileSync(PROGRESS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveProgressToFile = (data) => {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(data, null, 2));
};

// === Nodemailer Setup ===
const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// === API Endpoints ===

// Save game progress
app.post("/save-progress", (req, res) => {
  const { gameName, score, difficulty, timeSpent, dateTime } = req.body;

  if (!gameName || score === undefined || !dateTime) {
    return res.status(400).json({ message: "Missing required data" });
  }

  const newProgress = { gameName, score, difficulty, timeSpent, dateTime };
  const allProgress = loadProgress();
  allProgress.push(newProgress);
  saveProgressToFile(allProgress);

  console.log("✅ Progress saved:", newProgress);
  res.status(200).json({ message: "Progress saved!" });
});

// Get all progress
app.get("/get-progress", (req, res) => {
  const progress = loadProgress();
  res.status(200).json(progress);
});

// Send feedback
app.post("/send-feedback", (req, res) => {
  const { rating, comments, email } = req.body;

  if (!rating || !comments) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "New Feedback Received",
    text: `Rating: ${rating}\nComments: ${comments}\nEmail: ${email || "N/A"}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("EMAIL SEND ERROR:", error);
      return res.status(500).json({ message: "Failed to send feedback", error: error.toString() });
    }
    console.log("📨 Feedback sent:", info.response);
    return res.status(200).json({ message: "Feedback submitted successfully!" });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
