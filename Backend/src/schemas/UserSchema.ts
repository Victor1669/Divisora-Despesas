import { z } from "zod";

export const userSchema = z.object({
  nome: z.string().min(1).max(100),
  email: z.email().max(150),
  senha: z.string().min(8).max(100),
});
