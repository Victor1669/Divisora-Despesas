import { api } from "../config/axiosConfigToast";
import { exigirLogin } from "../config/sessao";
import type { UsuarioLogadoType } from "../types";

export async function login(dados: { email: string; senha: string }) {
  const resposta = await api.post<{ token: string }>("/auth/login", dados);
  return resposta.data;
}

export async function carregarUsuario() {
  exigirLogin();
  const resposta = await api.get<UsuarioLogadoType>("/auth/me", {
    showToast: false,
  });
  return resposta.data;
}
