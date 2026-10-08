import { z } from "zod";

import { expenseSplitSchema } from "./ExpenseSplitSchema";

export const expenseSchema = z.object({
  descricao: z.string().min(1).max(255),
  valor: z.number().positive().max(99999999.99),
  pagoPorId: z.number().int().positive(),
  splits: z.array(expenseSplitSchema.omit({ despesaId: true })).min(1),
});
