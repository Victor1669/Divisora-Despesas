import "dotenv/config";
import { DataSource } from "typeorm";

import { User } from "../models/UserModel";
import { Expense } from "../models/ExpenseModel";
import { ExpenseSplit } from "../models/ExpenseSplitModel";

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: [User, Expense, ExpenseSplit],
  migrations: ["src/migrations/*.ts"],
  synchronize: false,
});

export default AppDataSource;
