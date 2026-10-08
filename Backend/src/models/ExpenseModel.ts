import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Relation,
} from "typeorm";

import { ExpenseSplit } from "./ExpenseSplitModel";
import { User } from "./UserModel";

@Entity("expenses")
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  descricao: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  valor: number;

  @Column({ type: "int" })
  pagoPorId: number;

  @ManyToOne(() => User, (user) => user.despesasPagas, { onDelete: "CASCADE" })
  @JoinColumn({ name: "pagoPorId" })
  pagoPor: Relation<User> | undefined;

  @OneToMany(() => ExpenseSplit, (split) => split.despesa, { cascade: true })
  splits: Relation<ExpenseSplit[]>;

  @CreateDateColumn()
  createdAt: Date;

  constructor(
    id: number,
    descricao: string,
    valor: number,
    pagoPorId: number,
    pagoPor: Relation<User> | undefined,
    splits: Relation<ExpenseSplit[]>,
    createdAt: Date,
  ) {
    this.id = id;
    this.descricao = descricao;
    this.valor = valor;
    this.pagoPorId = pagoPorId;
    this.pagoPor = pagoPor;
    this.splits = splits;
    this.createdAt = createdAt;
  }
}
