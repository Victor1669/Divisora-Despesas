import AppDataSource from "../config/data-source";

import { mockExpense } from "../mockData";

import { ExpenseService } from "./expense.service";

jest.mock("../config/data-source", () => {
  const repository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn(),
  };

  return {
    __esModule: true,
    default: {
      getRepository: jest.fn().mockReturnValue(repository),
    },
  };
});

const repository = AppDataSource.getRepository({} as never) as unknown as {
  save: jest.Mock;
  exists: jest.Mock;
};

describe("ExpenseService", () => {
  beforeEach(() => {
    repository.save.mockClear();
    repository.exists.mockReset();
  });

  it("Deve registrar uma despesa e retornar 201", async () => {
    repository.exists.mockResolvedValue(false);

    await ExpenseService.create(mockExpense);

    expect(repository.save).toHaveBeenCalledWith(mockExpense);
  });
});
