import argon2 from "argon2";
import jwt from "jsonwebtoken";

import AppDataSource from "../config/data-source";

import { User } from "../models/UserModel";
import { LoginBody } from "../Types/RequestBodys";

export class AuthService {
  private static getRepository() {
    return AppDataSource.getRepository(User);
  }

  static async login({ email, senha }: LoginBody) {
    const user = await this.getRepository().findOne({
      where: { email },
      select: { id: true, email: true, senha: true, role: true },
    });

    if (!user || !(await argon2.verify(user.senha, senha))) {
      return null;
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return {
      token,
    };
  }

  static async me(id: number) {
    return this.getRepository().findOne({ where: { id } });
  }
}
