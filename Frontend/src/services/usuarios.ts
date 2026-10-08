import { api } from "../config/axiosConfigToast";
import type { UserType } from "../types";

export async function listarUsuarios() {
  const resposta = await api.get<UserType[]>("/usuarios", { showToast: false });

  return resposta.data;
}

export function criarUsuario(dados: {
  nome: string;
  email: string;
  senha: string;
}) {
  return api.post("/usuarios", dados);
}
