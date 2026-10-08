import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
} from "typeorm";

import { Expense } from "./ExpenseModel";
import { User } from "./UserModel";

@Entity("expense_splits")
export class ExpenseSplit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  despesaId: number;

  @ManyToOne(() => Expense, (expense) => expense.splits, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "despesaId" })
  despesa: Relation<Expense> | undefined;

  @Column({ type: "int" })
  usuarioId: number;

  @ManyToOne(() => User, (user) => user.divisoes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "usuarioId" })
  usuario: Relation<User> | undefined;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  valorDevido: number;

  @Column({ type: "boolean", default: false })
  pago: boolean;

  constructor(
    id: number,
    despesaId: number,
    despesa: Relation<Expense> | undefined,
    usuarioId: number,
    usuario: Relation<User> | undefined,
    valorDevido: number,
    pago: boolean,
  ) {
    this.id = id;
    this.despesaId = despesaId;
    this.despesa = despesa;
    this.usuarioId = usuarioId;
    this.usuario = usuario;
    this.valorDevido = valorDevido;
    this.pago = pago;
  }
}
