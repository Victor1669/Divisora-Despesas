import type { Request, Response } from "express";

import { AuthService } from "../services/auth.service";

import type { LoginBody } from "../Types/RequestBodys";

export class AuthController {
  static async login(req: Request<{}, {}, LoginBody>, res: Response) {
    try {
      const { email, senha } = req.body ?? {};

      if (
        typeof email !== "string" ||
        typeof senha !== "string" ||
        !email.trim() ||
        !senha
      ) {
        return res
          .status(400)
          .json({ message: "Email e senha são obrigatórios" });
      }

      const resultado = await AuthService.login({ email, senha });

      if (!resultado) {
        return res.status(401).json({ message: "Email ou senha inválidos" });
      }

      return res.status(200).json({
        message: "Login realizado com sucesso!",
        token: resultado.token,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao realizar login" });
    }
  }

  static async me(req: Request, res: Response) {
    try {
      const usuario = await AuthService.me(req.user!.id);

      if (!usuario) {
        return res.status(401).json({ message: "Usuário não encontrado" });
      }

      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar usuário" });
    }
  }
}
