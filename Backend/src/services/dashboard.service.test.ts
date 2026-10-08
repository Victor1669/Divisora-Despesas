import AppDataSource from "../config/data-source";

import { DashboardService } from "./dashboard.service";

jest.mock("../config/data-source", () => {
  const queryBuilder = {
    innerJoin: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    addGroupBy: jest.fn().mockReturnThis(),
    getRawMany: jest.fn(),
  };

  return {
    __esModule: true,
    default: {
      getRepository: jest.fn().mockReturnValue({
        createQueryBuilder: jest.fn().mockReturnValue(queryBuilder),
      }),
    },
  };
});

const repository = AppDataSource.getRepository({} as never) as unknown as {
  createQueryBuilder: () => { getRawMany: jest.Mock };
};

describe("DashboardService", () => {
  it("Deve retornar o total gasto por pessoa com o total como número", async () => {
    repository
      .createQueryBuilder()
      .getRawMany.mockResolvedValue([
        { nome: "Fulano", total: "150.50" },
        { nome: "Beltrano", total: "49.50" },
      ]);

    const gastos = await DashboardService.getGastosPorPessoa();

    expect(gastos).toEqual([
      { nome: "Fulano", total: 150.5 },
      { nome: "Beltrano", total: 49.5 },
    ]);
  });
});
