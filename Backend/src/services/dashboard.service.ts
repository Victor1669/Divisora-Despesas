import AppDataSource from "../config/data-source";

import { Expense } from "../models/ExpenseModel";

export class DashboardService {
  private static getRepository() {
    return AppDataSource.getRepository(Expense);
  }

  static async getGastosPorPessoa() {
    const linhas = await this.getRepository()
      .createQueryBuilder("expense")
      .innerJoin("expense.pagoPor", "usuario")
      .select("usuario.nome", "nome")
      .addSelect("SUM(expense.valor)", "total")
      .groupBy("usuario.id")
      .addGroupBy("usuario.nome")
      .getRawMany<{ nome: string; total: string }>();

    return linhas.map(({ nome, total }) => ({ nome, total: Number(total) }));
  }
}
