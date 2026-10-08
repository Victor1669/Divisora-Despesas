import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().max(150),
  senha: z.string().min(1).max(100),
});
