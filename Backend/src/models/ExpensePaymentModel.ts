import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Relation,
} from "typeorm";

import { ExpenseSplit } from "./ExpenseSplitModel";

@Entity("expense_payments")
export class ExpensePayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  splitId: number;

  @ManyToOne(() => ExpenseSplit, (split) => split.pagamentos, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "splitId" })
  split: Relation<ExpenseSplit> | undefined;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  valor: number;

  @CreateDateColumn()
  createdAt: Date;

  constructor(
    id: number,
    splitId: number,
    split: Relation<ExpenseSplit> | undefined,
    valor: number,
    createdAt: Date,
  ) {
    this.id = id;
    this.splitId = splitId;
    this.split = split;
    this.valor = valor;
    this.createdAt = createdAt;
  }
}
