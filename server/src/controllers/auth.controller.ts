// src/controllers/auth.controller.ts
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";
import { ILoginRequest } from "../types";
import { LoginRepository } from "../repositories/login.repository";

const loginRepo = new LoginRepository();

export class LoginController {
  loginUser = handleAsync<{}, {}, ILoginRequest>(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const result = await loginRepo.login({ email, password });

    if (!result.token) {
      throw new AppError(result.message || "Invalid credentials", 401);
    }

    res.status(200).json({ token: result.token, message: result.message });
  });
}
