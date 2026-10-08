import { redirect } from "react-router";
import type { UsuarioLogadoType } from "../types";

type SessaoType = Pick<UsuarioLogadoType, "id" | "role">;

export function getToken() {
  return localStorage.getItem("DIVISORA_TOKEN");
}

export function getUsuario() {
  const token = getToken();
  if (!token) return null;

  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes)) as SessaoType;
  } catch {
    return null;
  }
}

export function salvarSessao(token: string) {
  localStorage.setItem("DIVISORA_TOKEN", token);
}

export function limparSessao() {
  localStorage.removeItem("DIVISORA_TOKEN");
}

export function exigirLogin() {
  const usuario = getUsuario();

  if (!usuario) {
    throw redirect("/login");
  }

  return usuario;
}

export function exigirAdmin() {
  const usuario = exigirLogin();

  if (usuario.role !== "admin") {
    throw redirect("/despesas");
  }

  return usuario;
}
