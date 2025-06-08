import express from "express";
import { createTransport } from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

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
      console.error("EMAIL SEND ERROR:", error);  // LOG FULL ERROR
      return res.status(500).json({ message: "Failed to send feedback", error: error.toString() });
    }
    console.log("Feedback sent:", info.response);
    return res.status(200).json({ message: "Feedback submitted successfully!" });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
