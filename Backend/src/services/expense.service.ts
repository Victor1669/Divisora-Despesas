import AppDataSource from "../config/data-source";

import { Expense } from "../models/ExpenseModel";

import { CreateExpenseBody } from "../Types/RequestBodys";

export class ExpenseService {
  private static getRepository() {
    return AppDataSource.getRepository(Expense);
  }

  static async create(expense: CreateExpenseBody) {
    await this.getRepository().save(expense);
  }

  static async getAll() {
    return await this.getRepository().find({ relations: { splits: true } });
  }
}
