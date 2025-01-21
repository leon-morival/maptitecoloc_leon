import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("tasks")
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dueDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  assignedTo: UserEntity;
}
