import { Router } from "express";

import { ExpenseController } from "../controllers/expense.controller";
import validateBodyMiddleware from "../middlewares/validateBody.middleware";
import { expenseSchema } from "../schemas/ExpenseSchema";

const router = Router();

router.get("/", ExpenseController.getAll);
router.post(
  "/",
  validateBodyMiddleware(expenseSchema),
  ExpenseController.create,
);

export default router;
