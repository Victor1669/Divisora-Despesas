import { Router } from "express";

import { userSchema } from "../schemas/UserSchema";

import validateBodyMiddleware from "../middlewares/validateBody.middleware";

import { UserController } from "../controllers/user.controller";

const router = Router();

router.get("/", UserController.getAll);
router.post("/", validateBodyMiddleware(userSchema), UserController.create);

export default router;
