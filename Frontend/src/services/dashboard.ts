import { api } from "../config/axiosConfigToast";

export async function listarGastosPorPessoa() {
  const resposta = await api.get<{ nome: string; total: number }[]>(
    "/dashboard",
    { showToast: false },
  );
  return resposta.data;
}
