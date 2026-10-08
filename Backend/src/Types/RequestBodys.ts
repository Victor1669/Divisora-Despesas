import { Expense } from "../models/ExpenseModel";

export interface CreateUserBody {
  nome: string;
  email: string;
  senha: string;
}

export interface LoginBody {
  email: string;
  senha: string;
}

export type CreateExpenseBody = Omit<Expense, "id" | "createdAt" | "splits"> & {
  splits: { usuarioId: number; valorDevido: number }[];
};
