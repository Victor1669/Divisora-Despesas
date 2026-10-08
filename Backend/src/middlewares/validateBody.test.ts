import type { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";
import validateBodyMiddleware from "./validateBody.middleware";

const schema = z.object({
  name: z.string().regex(/^[^<>]*$/),
});

type Body = z.infer<typeof schema>;

describe("validateBody", () => {
  const res = {} as Response;
  const next = jest.fn() as NextFunction;
  const middleware = validateBodyMiddleware(schema);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Deve lançar erro e não chamar next quando o body contém XSS", () => {
    const req = {
      body: { name: "<script>alert('XSS')</script>" },
    } as Request<{}, {}, Body>;

    expect(() => middleware(req, res, next)).toThrow(ZodError);
    expect(next).not.toHaveBeenCalled();
  });

  it("Deve bloquear XSS em atributos HTML", () => {
    const req = {
      body: { name: '<img src=x onerror="alert(1)">' },
    } as Request<{}, {}, Body>;

    expect(() => middleware(req, res, next)).toThrow(ZodError);
    expect(next).not.toHaveBeenCalled();
  });

  it("Deve chamar next quando o body é válido", () => {
    const req = {
      body: { name: "Maria" },
    } as Request<{}, {}, Body>;

    expect(() => middleware(req, res, next)).not.toThrow();
    expect(next).toHaveBeenCalledTimes(1);
    expect(req.body).toEqual({ name: "Maria" });
  });
});
