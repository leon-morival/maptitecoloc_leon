import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ColocEntity } from "./coloc.entity";
import { UserEntity } from "./user.entity";

@Entity("finances")
export class FinanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column("float")
  amount: number;

  @ManyToOne(() => ColocEntity, (coloc) => coloc.finances)
  coloc: ColocEntity;

  @ManyToOne(() => UserEntity, (user) => user.finances)
  paidBy: UserEntity;

  @Column()
  date: Date;
}
