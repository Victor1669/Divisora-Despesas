import { createContext, useContext } from "react";
import type { UsuarioLogadoType } from "../types";

export const UsuarioContext = createContext<UsuarioLogadoType | null>(null);

export function useUsuario() {
  const usuario = useContext(UsuarioContext);

  if (!usuario) {
    throw new Error("useUsuario deve ser usado dentro do UsuarioContext");
  }

  return usuario;
}
