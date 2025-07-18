// server/src/services/email.service.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send password reset token email
 */
export async function sendResetTokenEmail(to: string, token: string) {
  const resetUrl = `https://localhost:5173/reset-password?token=${token}`;

  const mailOptions = {
    from: `"EduSynx Support" <${process.env.SMTP_USER}>`,
    to,
    subject: "Reset your password",
    html: `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link expires in 15 minutes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

/**
 * Send login/access link email
 */
export async function sendAccessLinkEmail(to: string, accessUrl: string) {
  const mailOptions = {
    from: `"EduSynx Support" <${process.env.SMTP_USER}>`,
    to,
    subject: "Your Login Link",
    html: `
      <h2>Welcome to EduSynx</h2>
      <p>Click the button below to access your account:</p>
      <a href="${accessUrl}" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #3b82f6;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      ">Access Account</a>
      <p>If you didn’t request this, ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
