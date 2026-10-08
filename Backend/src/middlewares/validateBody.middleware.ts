import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export default function validateBodyMiddleware<T>(schema: ZodType<T>) {
  return (req: Request<{}, {}, T>, res: Response, next: NextFunction) => {
    const { success, data, error } = schema.safeParse(req.body);

    if (!success) {
      throw error;
    }

    req.body = data;
    next();
  };
}
