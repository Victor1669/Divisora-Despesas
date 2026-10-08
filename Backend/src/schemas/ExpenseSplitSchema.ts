import { z } from "zod";

export const expenseSplitSchema = z.object({
  despesaId: z.number().int().positive(),
  usuarioId: z.number().int().positive(),
  valorDevido: z.number().positive().max(99999999.99),
  pago: z.boolean().optional(),
});
