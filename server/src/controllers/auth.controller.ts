// src/controllers/auth.controller.ts
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";
import { ILoginRequest } from "../types";
import { LoginRepository } from "../repositories/login.repository";

const loginRepo = new LoginRepository();

export class LoginController {
  loginUser = handleAsync<{}, {}, ILoginRequest & { ipAddress?: string; deviceInfo?: string }>(
    async (req, res) => {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new AppError("Email and password are required", 400);
      }

      // Normalize IP address from headers or fallback to req.ip
      const ipHeader = req.headers["x-forwarded-for"];
      const ipAddress = Array.isArray(ipHeader) ? ipHeader[0] : ipHeader || req.ip;

      // Device info from user-agent header
      const deviceInfo = req.headers["user-agent"] as string | undefined;

      const result = await loginRepo.login({ email, password, ipAddress, deviceInfo });

      if (!result.token) {
        throw new AppError(result.message || "Invalid credentials", 401);
      }

      res.status(200).json({ token: result.token, message: result.message });
    }
  );
}
