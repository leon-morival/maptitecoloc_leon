import { Repository } from "typeorm";
import { TaskEntity } from "../databases/mysql/task.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";

export class TaskRepository {
  private taskDB: Repository<TaskEntity>;

  constructor() {
    this.taskDB = connectMySQLDB.getRepository(TaskEntity);
  }

  create(task: Partial<TaskEntity>): TaskEntity {
    return this.taskDB.create(task);
  }

  async save(task: TaskEntity): Promise<TaskEntity> {
    return this.taskDB.save(task);
  }

  async findAll(): Promise<TaskEntity[]> {
    return this.taskDB.find({ relations: ["assignedTo"] });
  }
}
