import { api } from "../config/axiosConfigToast";
import type { ExpenseType } from "../types";

export async function listarDespesas() {
  const resposta = await api.get<ExpenseType[]>("/despesas", {
    showToast: false,
  });
  return resposta.data;
}

export function criarDespesa(dados: {
  descricao: string;
  valor: number;
  pagoPorId: number;
  splits: { usuarioId: number; valorDevido: number }[];
}) {
  return api.post("/despesas", dados);
}
