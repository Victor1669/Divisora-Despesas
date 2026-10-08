import express, { Express } from "express";

import helmet from "helmet";
import cors from "cors";

import errorMiddleware from "./src/middlewares/error.middleware.js";

import userRoutes from "./src/routes/user.route.js";
import expenseRoutes from "./src/routes/expense.route.js";
import dashboardRoutes from "./src/routes/dashboard.route.js";
import authRoutes from "./src/routes/auth.route.js";

class App {
  app: Express;

  constructor() {
    this.app = express();
    this.security();
    this.middlewares();
    this.routes();
    this.app.use(errorMiddleware);
  }

  security() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.disable("x-powered-by");
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      express.json({
        limit: "100kb",
      }),
    );
  }

  routes() {
    this.app.use("/usuarios", userRoutes);
    this.app.use("/despesas", expenseRoutes);
    this.app.use("/dashboard", dashboardRoutes);
    this.app.use("/auth", authRoutes);
  }
}

export default new App().app;
