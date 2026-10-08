import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  Relation,
} from "typeorm";

import { Expense } from "./ExpenseModel";
import { ExpenseSplit } from "./ExpenseSplitModel";

export type Role = "admin" | "user";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  nome: string;

  @Column({ type: "varchar", length: 150, unique: true, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 255, nullable: false, select: false })
  senha: string;

  @Column({ type: "enum", enum: ["admin", "user"], default: "user" })
  role: Role;

  @OneToMany(() => Expense, (expense) => expense.pagoPor)
  despesasPagas: Relation<Expense[]>;

  @OneToMany(() => ExpenseSplit, (split) => split.usuario)
  divisoes: Relation<ExpenseSplit[]>;

  @CreateDateColumn()
  createdAt: Date;

  constructor(
    id: number,
    nome: string,
    email: string,
    senha: string,
    role: Role,
    despesasPagas: Relation<Expense[]>,
    divisoes: Relation<ExpenseSplit[]>,
    createdAt: Date,
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.role = role;
    this.despesasPagas = despesasPagas;
    this.divisoes = divisoes;
    this.createdAt = createdAt;
  }
}
