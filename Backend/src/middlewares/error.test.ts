import type { NextFunction, Request, Response } from "express";

import errorHandler from "./error.middleware";

describe("Error Handler", () => {
  const error = new Error("Erro interno do servidor");

  const req = {
    headers: {},
    method: "POST",
    originalUrl: "http://localhost:3000/teste",
  } as unknown as Request;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  const next = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Deve executar corretamente", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Erro interno do servidor",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("Deve mostrar o método e URL", () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    errorHandler(error, req, res, next);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("POST http://localhost:3000/teste"),
    );
  });
});
