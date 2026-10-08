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

export interface PagamentoBody {
  valor: number;
}

export type CreateExpenseBody = Omit<
  Expense,
  "id" | "createdAt" | "splits" | "pagoPor"
> & {
  splits: { usuarioId: number; valorDevido: number }[];
};
