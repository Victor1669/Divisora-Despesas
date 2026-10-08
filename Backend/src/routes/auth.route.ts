import { Router } from "express";

import { loginSchema } from "../schemas/LoginSchema";

import { authMiddleware } from "../middlewares/auth.middleware";
import requestLimiterMiddleware from "../middlewares/rateLimit.middleware";
import validateBodyMiddleware from "../middlewares/validateBody.middleware";

import { AuthController } from "../controllers/auth.controller";

const router = Router();

router.post(
  "/login",
  requestLimiterMiddleware,
  validateBodyMiddleware(loginSchema),
  AuthController.login,
);

router.get("/me", authMiddleware, AuthController.me);

export default router;
