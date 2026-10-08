import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export default function errorHandler(
  err: Error & { status?: number },
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Dados inválidos",
      errors: err.issues.map(
        (error) => `${error.path.at(0)?.toString()}: ${error.message}`,
      ),
    });
  }

  console.error(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`,
  );

  if (Object.keys(err).length) {
    console.log(JSON.stringify(err, null, 2));
  }

  if (res.headersSent) {
    return next(err);
  }

  const status = err.status && err.status < 500 ? err.status : 500;
  const message = status === 500 ? "Erro interno do servidor" : err.message;

  res.status(status).json({ message });
}
