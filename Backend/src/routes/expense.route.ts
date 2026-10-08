import { Router } from "express";

import { ExpenseController } from "../controllers/expense.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import validateBodyMiddleware from "../middlewares/validateBody.middleware";
import { expenseSchema } from "../schemas/ExpenseSchema";
import { pagamentoSchema } from "../schemas/PagamentoSchema";

const router = Router();

router.use(authMiddleware);

router.get("/", ExpenseController.getAll);
router.get("/historico", ExpenseController.getHistorico);
router.post(
  "/",
  validateBodyMiddleware(expenseSchema),
  ExpenseController.create,
);
router.post(
  "/splits/:id/pagamentos",
  validateBodyMiddleware(pagamentoSchema),
  ExpenseController.pagar,
);

export default router;
