import AppDataSource from "../config/data-source";

import { Expense } from "../models/ExpenseModel";
import { ExpensePayment } from "../models/ExpensePaymentModel";
import { ExpenseSplit } from "../models/ExpenseSplitModel";
import type { Role } from "../models/UserModel";

import { CreateExpenseBody } from "../Types/RequestBodys";

type UsuarioAutenticado = { id: number; role: Role };

function erro(status: number, message: string) {
  return Object.assign(new Error(message), { status });
}

export class ExpenseService {
  private static getRepository() {
    return AppDataSource.getRepository(Expense);
  }

  static async create(expense: CreateExpenseBody) {
    await this.getRepository().save(expense);
  }

  static async getAll(user: UsuarioAutenticado) {
    return this.listar(user, false);
  }

  static async getHistorico(user: UsuarioAutenticado) {
    return this.listar(user, true);
  }

  private static async listar(user: UsuarioAutenticado, concluidas: boolean) {
    const query = this.getRepository()
      .createQueryBuilder("expense")
      .leftJoinAndSelect("expense.splits", "split")
      .leftJoin("split.usuario", "usuario")
      .addSelect(["usuario.id", "usuario.nome"])
      .leftJoinAndSelect("split.pagamentos", "pagamento")
      .where(
        `${concluidas ? "NOT " : ""}EXISTS (SELECT 1 FROM expense_splits s WHERE s.despesaId = expense.id AND s.pago = 0)`,
      )
      .orderBy("expense.createdAt", "DESC")
      .addOrderBy("pagamento.createdAt", "ASC");

    if (user.role !== "admin") {
      query.andWhere(
        "(expense.pagoPorId = :id OR EXISTS (SELECT 1 FROM expense_splits p WHERE p.despesaId = expense.id AND p.usuarioId = :id))",
        { id: user.id },
      );
    }

    return query.getMany();
  }

  static async pagar(
    splitId: number,
    usuarioId: number,
    valorCentavos: number,
  ) {
    await AppDataSource.transaction(async (manager) => {
      const split = await manager.findOne(ExpenseSplit, {
        where: { id: splitId },
        lock: { mode: "pessimistic_write" },
      });

      if (!split) {
        throw erro(404, "Divisão não encontrada");
      }

      if (split.usuarioId !== usuarioId) {
        throw erro(403, "Você só pode pagar a sua própria parte");
      }

      const totalPago =
        (await manager.sum(ExpensePayment, "valor", { splitId })) ?? 0;
      const restanteCentavos =
        Math.round(Number(split.valorDevido) * 100) -
        Math.round(totalPago * 100);

      if (valorCentavos > restanteCentavos) {
        throw erro(
          400,
          `O valor excede o restante devido (R$ ${(restanteCentavos / 100).toFixed(2)})`,
        );
      }

      await manager.save(ExpensePayment, {
        splitId,
        valor: valorCentavos / 100,
      });

      if (valorCentavos === restanteCentavos) {
        await manager.update(ExpenseSplit, splitId, { pago: true });
      }
    });
  }
}
