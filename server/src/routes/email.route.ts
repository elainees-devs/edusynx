// server/src/routes/email.route.ts
import express, { Request, Response } from "express";
import { sendAccessLink } from "../utils/email";
import { handleAsync } from "../utils/handleAsync";

interface SendAccessLinkBody {
  email: string;
  accessUrl: string;
}

const emailRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Email
 *   description: Email-related endpoints
 */

/**
 * @swagger
 * /api/email/send-access-link:
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

    await sendAccessLink(email, accessUrl);
    return res.status(200).json({ message: "Access url sent successfully!" });
  })
);

export {emailRouter};
