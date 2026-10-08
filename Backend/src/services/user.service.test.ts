import AppDataSource from "../config/data-source";
import { mockUserFulano } from "../mockData";
import { UserService } from "./user.service";

jest.mock("argon2", () => ({
  __esModule: true,
  default: {
    hash: jest.fn().mockResolvedValue("hash-da-senha"),
  },
}));

jest.mock("../config/data-source", () => {
  const repository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockResolvedValue(undefined),
    find: jest.fn().mockResolvedValue([{ id: 1, nome: "Carlos" }]),
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

describe("UserService", () => {
  beforeEach(() => {
    repository.save.mockClear();
    repository.exists.mockReset();
  });

  it("deve criar um usuário com sucesso salvando a senha criptografada", async () => {
    repository.exists.mockResolvedValue(false);

    await UserService.create({
      nome: mockUserFulano.nome,
      email: mockUserFulano.email,
      senha: "senha12345",
    });

    expect(repository.save).toHaveBeenCalledWith({
      nome: "Fulano",
      email: "fulano@gmail.com",
      senha: "hash-da-senha",
    });
  });

  it("deve lançar erro se o email já estiver cadastrado", async () => {
    repository.exists.mockResolvedValue(true);

    await expect(
      UserService.create({
        nome: mockUserFulano.nome,
        email: mockUserFulano.email,
        senha: "senha12345",
      }),
    ).rejects.toThrow("Email já cadastrado!");

    expect(repository.save).not.toHaveBeenCalled();
  });

  it("deve listar os usuários com sucesso", async () => {
    const usuario = await UserService.getAll();

    expect(usuario).toHaveLength(1);
    expect(usuario[0].nome).toBe("Carlos");
  });
});
