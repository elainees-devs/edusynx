// server/src/services/email.service.ts
import nodemailer from "nodemailer";

export async function sendResetTokenEmail(to: string, token: string){
    const resetUrl = `https://localhost:5173/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })

      const mailOptions = {
    from: '"Support" <support@yourapp.com>',
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
