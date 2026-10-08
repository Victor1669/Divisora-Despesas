import type { Request, Response } from "express";

import { DashboardService } from "../services/dashboard.service";

export class DashboardController {
  static async getGastosPorPessoa(req: Request, res: Response) {
    const gastos = await DashboardService.getGastosPorPessoa();

    return res.status(200).json(gastos);
  }
}
