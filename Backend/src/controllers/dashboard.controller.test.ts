import { Request, Response } from "express";

import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "../services/dashboard.service";

jest.mock("../services/dashboard.service", () => ({
  DashboardService: {
    getGastosPorPessoa: jest.fn(),
  },
}));

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

describe("DashboardController", () => {
  it("Deve retornar os gastos por pessoa e status 200", async () => {
    const req = {} as Request;

    const gastos = [{ nome: "Fulano", total: 100 }];

    (DashboardService.getGastosPorPessoa as jest.Mock).mockResolvedValue(
      gastos,
    );

    await DashboardController.getGastosPorPessoa(req, res);

    expect(res.json).toHaveBeenCalledWith(gastos);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
