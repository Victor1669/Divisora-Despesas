import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { authMiddleware, roleMiddleware } from "./auth.middleware";

process.env.JWT_SECRET = "segredo-de-teste";

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

const next = jest.fn() as NextFunction;

describe("Auth Middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar 401 se nenhum token for fornecido", () => {
    const req = {
      headers: {},
    } as unknown as Request;

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token não fornecido" });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 401 se o token for inválido", () => {
    const req = {
      headers: { authorization: "Bearer token123" },
    } as unknown as Request;

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Token inválido ou expirado",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 401 se o token estiver expirado", () => {
    const token = jwt.sign({ id: 1, role: "user" }, "segredo-de-teste", {
      expiresIn: -10,
    });

    const req = {
      headers: { authorization: `Bearer ${token}` },
    } as unknown as Request;

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("deve preencher req.user e chamar o next se o token for válido", () => {
    const token = jwt.sign({ id: 1, role: "admin" }, "segredo-de-teste");

    const req = {
      headers: { authorization: `Bearer ${token}` },
    } as unknown as Request;

    authMiddleware(req, res, next);

    expect(req.user).toEqual({ id: 1, role: "admin" });
    expect(next).toHaveBeenCalled();
  });
});

describe("Role Middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar 403 se o usuário não tiver o role exigido", () => {
    const req = { user: { id: 1, role: "user" } } as Request;

    roleMiddleware("admin")(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "Acesso negado" });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve chamar o next se o usuário tiver o role exigido", () => {
    const req = { user: { id: 1, role: "admin" } } as Request;

    roleMiddleware("admin")(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
