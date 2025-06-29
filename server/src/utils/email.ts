//  server/src/utils/email.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendAccessLink = async (email: string, accessUrl: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Access Link to EduSynx',
    text: `Hello,\n\nClick the link below to access your portal:\n${accessUrl}\n\nRegards,\nEduSynx Team`,
  };

  await transporter.sendMail(mailOptions);
};


