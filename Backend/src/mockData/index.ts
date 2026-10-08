import { Expense } from "../models/ExpenseModel";
import { ExpenseSplit } from "../models/ExpenseSplitModel";
import { User } from "../models/UserModel";

const mockUserFulano: User = {
  id: 1,
  createdAt: new Date("09/12/2025"), //"2025-09-12T03:00:00.000Z"
  nome: "Fulano",
  email: "fulano@gmail.com",
  role: "user",
  despesasPagas: [],
  divisoes: [],
};

const mockUserBeltrano: User = {
  id: 2,
  createdAt: new Date("09/12/2025"), //"2025-09-12T03:00:00.000Z"
  nome: "Beltrano",
  email: "beltrano@gmail.com",
  role: "user",
  despesasPagas: [],
  divisoes: [],
};

const mockExpense = {
  id: 1,
  descricao: "Mercado",
  valor: 100,
  pagoPorId: 1,
  splits: [
    { id: 1, despesaId: 1, usuarioId: 1, valorDevido: 50, pago: false },
    { id: 2, despesaId: 1, usuarioId: 2, valorDevido: 50, pago: false },
  ],
  createdAt: new Date(),
} as Expense;

const mockExpenseSplit: ExpenseSplit = {
  id: 1,
  despesaId: mockExpense.id,
  despesa: mockExpense,
  usuarioId: mockUserBeltrano.id,
  usuario: mockUserBeltrano,
  valorDevido: 100,
  pago: false,
  pagamentos: [],
};

export { mockUserFulano, mockUserBeltrano, mockExpense, mockExpenseSplit };
