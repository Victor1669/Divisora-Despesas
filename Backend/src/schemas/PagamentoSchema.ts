import { z } from "zod";

export const pagamentoSchema = z.object({
  valor: z.number().positive().max(99999999.99),
});
