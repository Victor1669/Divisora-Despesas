import { Request, Response } from "express";

import { UserService } from "../services/user.service";

import { CreateUserBody } from "../Types/RequestBodys";

export class UserController {
  static async create(req: Request<{}, {}, CreateUserBody>, res: Response) {
    try {
      const newUser = req.body;

      await UserService.create(newUser);

      return res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      const message = (error as any).message;

      if (message === "Email já cadastrado") {
        return res.status(409).json({ error: message });
      }

      return res
        .status(500)
        .json({ error: "Erro ao criar usuário: " + message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const usuarios = await UserService.getAll();

      return res.status(200).json(usuarios);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao listar usuários: " + error });
    }
  }
}
