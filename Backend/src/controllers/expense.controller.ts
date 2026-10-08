import type { Request, Response } from "express";

import { ExpenseService } from "../services/expense.service";

import type { CreateExpenseBody, PagamentoBody } from "../Types/RequestBodys";

export class ExpenseController {
  static async create(req: Request<{}, {}, CreateExpenseBody>, res: Response) {
    const expense = req.body;

    const totalCentavos = Math.round(expense.valor * 100);
    const somaCentavos = expense.splits.reduce(
      (soma, split) => soma + Math.round(split.valorDevido * 100),
      0,
    );

    if (somaCentavos !== totalCentavos) {
      return res.status(400).json({
        message: "A soma das divisões deve ser igual ao valor da despesa",
      });
    }

    try {
      await ExpenseService.create(expense);
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "ER_NO_REFERENCED_ROW_2"
      ) {
        return res.status(400).json({
          message: "Um ou mais usuários informados não existem",
        });
      }
      throw error;
    }

    return res.status(201).json({ message: "Despesa registrada com sucesso!" });
  }

  static async getAll(req: Request, res: Response) {
    const expenses = await ExpenseService.getAll(req.user!);

    return res.status(200).json(expenses);
  }

  static async getHistorico(req: Request, res: Response) {
    const expenses = await ExpenseService.getHistorico(req.user!);

    return res.status(200).json(expenses);
  }

  static async pagar(
    req: Request<{ id: string }, {}, PagamentoBody>,
    res: Response,
  ) {
    const splitId = Number(req.params.id);
    const valorCentavos = Math.round(req.body.valor * 100);

    if (!Number.isInteger(splitId) || valorCentavos < 1) {
      return res.status(400).json({ message: "Dados inválidos" });
    }

    await ExpenseService.pagar(splitId, req.user!.id, valorCentavos);

    return res.status(201).json({ message: "Pagamento registrado com sucesso!" });
  }
}
