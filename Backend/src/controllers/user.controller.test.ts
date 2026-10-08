import { Request, Response } from "express";
import { UserController } from "./user.controller";
import { UserService } from "../services/user.service";

jest.mock("../services/user.service", () => ({
  UserService: {
    create: jest.fn(),
    getAll: jest.fn(),
  },
}));

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

describe("UserController", () => {
  it("deve criar um usuário e retornar status 201", async () => {
    const usuarioCriado = { nome: "Ana", email: "ana@email.com" };
    (UserService.create as jest.Mock).mockResolvedValue(usuarioCriado);

    const req = {
      body: { nome: "Ana", email: "ana@email.com", senha: "senha12345" },
    } as Request;

    await UserController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuário criado com sucesso!",
    });
  });

  it("não deve criar usuário se o email já estiver cadastrado e retornar status 409", async () => {
    (UserService.create as jest.Mock).mockRejectedValue(
      new Error("Email já cadastrado"),
    );

    const req = {
      body: { nome: "Ana", email: "ana@email.com", senha: "senha12345" },
    } as Request;

    await UserController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: "Email já cadastrado" });
  });

  it("deve listar usuários e retornar status 200", async () => {
    const usuarios = [{ id: 1, nome: "Ana" }];
    (UserService.getAll as jest.Mock).mockResolvedValue(usuarios);

    const req = {} as Request;

    await UserController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(usuarios);
  });
});
