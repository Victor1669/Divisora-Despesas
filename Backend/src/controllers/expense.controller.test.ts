import { Request, Response } from "express";

import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "../services/expense.service";

import { mockExpense } from "../mockData";

jest.mock("../services/expense.service", () => ({
  ExpenseService: {
    create: jest.fn(),
    getAll: jest.fn(),
  },
}));

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

describe("ExpenseController", () => {
  it("Deve criar uma despesa e retornar status 201", async () => {
    const req = { body: mockExpense } as unknown as Request;

    (ExpenseService.create as jest.Mock).mockResolvedValue(undefined);

    await ExpenseController.create(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Despesa registrada com sucesso!",
    });
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("Deve listar as despesas e retornar status 200", async () => {
    const req = {} as Request;

    const expenses = [mockExpense];

    (ExpenseService.getAll as jest.Mock).mockResolvedValue(expenses);

    await ExpenseController.getAll(req, res);

    expect(res.json).toHaveBeenCalledWith([mockExpense]);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("Deve retornar 400 quando a soma das divisões não bate com o valor", async () => {
    const req = {
      body: { ...mockExpense, valor: mockExpense.valor + 1 },
    } as unknown as Request;

    await ExpenseController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(ExpenseService.create).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se algum usuário da divisão não existir", async () => {
    (ExpenseService.create as jest.Mock).mockRejectedValue({
      code: "ER_NO_REFERENCED_ROW_2",
      errno: 1452,
    });

    const req = {
      body: {
        descricao: "Teste",
        valor: 100,
        pagoPorId: 1,
        splits: [
          { usuarioId: 1, valorDevido: 50 },
          { usuarioId: 2, valorDevido: 50 },
        ],
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await ExpenseController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Um ou mais usuários informados não existem",
    });
  });
});
