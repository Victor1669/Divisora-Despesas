import argon2 from "argon2";

import AppDataSource from "../config/data-source";

import { User } from "../models/UserModel";

import { CreateUserBody } from "../Types/RequestBodys";

export class UserService {
  private static getRepository() {
    return AppDataSource.getRepository(User);
  }

  static async create(dados: CreateUserBody): Promise<void> {
    const repository = this.getRepository();

    const userExists = await repository.exists({
      where: { email: dados.email },
    });

    if (userExists) {
      throw new Error("Email já cadastrado!");
    } else {
      const senhaHash = await argon2.hash(dados.senha);

      const user = repository.create({ ...dados, senha: senhaHash });

      await repository.save(user);
    }
  }

  static async getAll(): Promise<User[]> {
    return await this.getRepository().find();
  }
}
