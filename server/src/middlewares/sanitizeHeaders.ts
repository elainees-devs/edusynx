// src/middlewares/sanitizeHeaders.ts
import { Request, Response, NextFunction } from "express";

export function sanitizeHeaders(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const ipHeader = req.headers["x-forwarded-for"];
  let rawIp = "";

  if (!ipHeader) {
    rawIp = req.socket.remoteAddress || "";
  } else if (Array.isArray(ipHeader)) {
    rawIp = ipHeader[0];
  } else {
    rawIp = ipHeader;
  }

  // Normalize IPv6 format like "::ffff:192.168.0.1"
  const ipv4 = rawIp.startsWith("::ffff:") ? rawIp.replace("::ffff:", "") : rawIp;
  req.headers["x-forwarded-for"] = ipv4;

  const userAgent = req.headers["user-agent"];
  if (userAgent && typeof userAgent === "string") {
    req.headers["user-agent"] = userAgent.trim().slice(0, 256);
  }

  next();
}
