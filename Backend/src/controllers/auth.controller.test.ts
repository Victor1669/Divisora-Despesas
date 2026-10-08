import { Request, Response } from "express";

import { AuthController } from "./auth.controller";
import { AuthService } from "../services/auth.service";

jest.mock("../services/auth.service", () => ({
  AuthService: {
    login: jest.fn(),
  },
}));

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

const reqLogin = {
  body: { email: "fulano@gmail.com", senha: "senha12345" },
} as Request;

describe("AuthController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar as informações corretas e status 200 no login válido", async () => {
    const resultado = {
      token: "jwt",
    };

    (AuthService.login as jest.Mock).mockResolvedValue(resultado);

    await AuthController.login(reqLogin, res);

    expect(AuthService.login).toHaveBeenCalledWith({
      email: "fulano@gmail.com",
      senha: "senha12345",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: "jwt",
      message: "Login realizado com sucesso!",
    });
  });

  it("deve retornar 401 quando as credenciais forem inválidas", async () => {
    (AuthService.login as jest.Mock).mockResolvedValue(null);

    await AuthController.login(reqLogin, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Email ou senha inválidos",
    });
  });

  it("deve retornar 400 quando o email não for enviado", async () => {
    const reqSemEmail = { body: { senha: "senha12345" } } as Request;

    await AuthController.login(reqSemEmail, res);

    expect(AuthService.login).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Email e senha são obrigatórios",
    });
  });

  it("deve retornar 400 quando a senha não for enviada", async () => {
    const reqSemSenha = { body: { email: "fulano@gmail.com" } } as Request;

    await AuthController.login(reqSemSenha, res);

    expect(AuthService.login).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("deve retornar 400 quando email ou senha não forem texto", async () => {
    const reqInvalida = {
      body: { email: { $ne: null }, senha: 123 },
    } as unknown as Request;

    await AuthController.login(reqInvalida, res);

    expect(AuthService.login).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("deve retornar 400 quando o body não for enviado", async () => {
    const reqSemBody = {} as Request;

    await AuthController.login(reqSemBody, res);

    expect(AuthService.login).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("deve retornar 500 quando o service lançar um erro", async () => {
    (AuthService.login as jest.Mock).mockRejectedValue(new Error("falha"));

    await AuthController.login(reqLogin, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Erro ao realizar login",
    });
  });
});
