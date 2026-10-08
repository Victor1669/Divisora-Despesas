import { api } from "../config/axiosConfigToast";
import type { ExpenseType } from "../types";

export function pagarDivisao(splitId: number, valor: number) {
  return api.post(`/despesas/splits/${splitId}/pagamentos`, { valor });
}

export async function listarHistorico() {
  const resposta = await api.get<ExpenseType[]>("/despesas/historico", {
    showToast: false,
  });
  return resposta.data;
}
