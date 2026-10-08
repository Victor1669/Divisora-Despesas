export type Role = "admin" | "user";

export interface UsuarioLogadoType {
  id: number;
  nome: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface UserType {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

export interface PagamentoType {
  id: number;
  splitId: number;
  valor: string;
  createdAt: string;
}

export interface ExpenseSplitType {
  id: number;
  despesaId: number;
  usuarioId: number;
  usuario: { id: number; nome: string };
  valorDevido: string;
  pago: boolean;
  pagamentos: PagamentoType[];
}

export interface ExpenseType {
  id: number;
  descricao: string;
  valor: number;
  pagoPorId: number;
  splits: ExpenseSplitType[];
  createdAt: string;
}
