// client/src/api/email.ts
import axios from 'axios';
import { logger } from '../utils/logger';

export const sendAccessLink = async (email: string, accessUrl: string) => {
  try {
    const res = await axios.post('http://localhost:5100/api/v1/email/send-access-link', {
      email,
      accessUrl,
    });

    logger.info(`Access link successfully sent to ${email}`);
    return res.data.message;
  } catch (error) {
    logger.error(`Failed to send access link to ${email}`, error);
    throw new Error('Failed to send access link');
  }
};

export const sendResetTokenEmail = async (email: string) => {
  try {
    const res = await axios.post("http://localhost:5000/api/v1/password-reset", {
      email,
    });

    return res.data.message;
  } catch (error) {
    console.error("Failed to send reset email", error);
    throw new Error("Failed to send reset email");
  }
}