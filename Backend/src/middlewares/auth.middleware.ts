import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import type { Role } from "../models/UserModel";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  let payload;
  try {
    payload = jwt.verify(header.replace("Bearer ", ""), process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    }) as { id: number; role: Role };
  } catch {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }

  req.user = { id: payload.id, role: payload.role };
  next();
}

export function roleMiddleware(role: Role) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: "Acesso negado" });
    }
    next();
  };
}
