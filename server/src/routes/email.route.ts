// server/src/routes/email.route.ts
import express, { Request, Response } from "express";
import { sendAccessLink } from "../utils/email";
import { handleAsync } from "../utils/handleAsync";
import { access } from "fs";

interface SendAccessLinkBody {
  email: string;
  accessUrl: string;
}

const emailRouter = express.Router();

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

export default emailRouter;

