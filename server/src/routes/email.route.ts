// server/src/routes/email.route.ts
import express, { Request, Response } from "express";
import { handleAsync } from "../utils/handleAsync";
import { sendAccessLinkEmail, sendResetTokenEmail } from "../services/email.service";
import { SendAccessLinkBody, SendResetTokenBody } from "../types";

const emailRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Email
 *   description: Email-related endpoints
 */

/**
 * @swagger
 * /api/v1/email/send-access-link:
 *   post:
 *     summary: Send access link via email
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendAccessLink'
 *     responses:
 *       200:
 *         description: Access URL sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing email or access URL
 */
emailRouter.post(
  "/send-access-link",
  handleAsync<{}, any, SendAccessLinkBody>(async (req: Request<{}, any, SendAccessLinkBody>, res: Response) => {
    const { email, accessUrl } = req.body;

    if (!email || !accessUrl) {
      return res.status(400).json({ message: "Email and access url are required" });
    }

    await sendAccessLinkEmail(email, accessUrl);
    return res.status(200).json({ message: "Access url sent successfully!" });
  })
);

/**
 * @swagger
 * /api/v1/email/send-reset-token:
 *   post:
 *     summary: Send password reset token via email
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendResetToken'
 *     responses:
 *       200:
 *         description: Reset token sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing email or token
 */
emailRouter.post(
  "/send-reset-token",
  handleAsync<{}, any, SendResetTokenBody>(async (req: Request<{}, any, SendResetTokenBody>, res: Response) => {
    const { email, token } = req.body;

    if (!email || !token) {
      return res.status(400).json({ message: "Email and token are required" });
    }

    await sendResetTokenEmail(email, token);
    return res.status(200).json({ message: "Reset token sent successfully!" });
  })
);

export { emailRouter };
