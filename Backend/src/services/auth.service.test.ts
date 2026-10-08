import argon2 from "argon2";
import jwt from "jsonwebtoken";

import AppDataSource from "../config/data-source";

import { AuthService } from "./auth.service";

jest.mock("argon2", () => ({
  __esModule: true,
  default: {
    verify: jest.fn(),
  },
}));

jest.mock("../config/data-source", () => {
  const repository = {
    findOne: jest.fn(),
  };

  return {
    __esModule: true,
    default: {
      getRepository: jest.fn().mockReturnValue(repository),
    },
  };
});

const repository = AppDataSource.getRepository({} as never) as unknown as {
  findOne: jest.Mock;
};

const usuarioDoBanco = {
  id: 1,
  nome: "Fulano",
  email: "fulano@gmail.com",
  senha: "hash-da-senha",
  role: "admin",
};

describe("AuthService", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = "segredo-de-teste";
    repository.findOne.mockReset();
    (argon2.verify as jest.Mock).mockReset();
  });

  it("deve retornar o token e o usuário sem a senha quando as credenciais forem válidas", async () => {
    repository.findOne.mockResolvedValue(usuarioDoBanco);
    (argon2.verify as jest.Mock).mockResolvedValue(true);

    const resultado = await AuthService.login({
      email: "fulano@gmail.com",
      senha: "senha12345",
    });

    expect(jwt.verify(resultado!.token, "segredo-de-teste")).toMatchObject({
      id: 1,
      role: "admin",
    });
  });

  it("deve retornar null se o usuário não existir", async () => {
    repository.findOne.mockResolvedValue(null);

    const resultado = await AuthService.login({
      email: "x@gmail.com",
      senha: "senha12345",
    });

    expect(resultado).toBeNull();
    expect(argon2.verify).not.toHaveBeenCalled();
  });

  it("deve retornar null se a senha estiver incorreta", async () => {
    repository.findOne.mockResolvedValue(usuarioDoBanco);
    (argon2.verify as jest.Mock).mockResolvedValue(false);

    const resultado = await AuthService.login({
      email: "fulano@gmail.com",
      senha: "errada123",
    });

    expect(resultado).toBeNull();
  });
});
