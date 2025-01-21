import { TaskRepository } from "../repositories/task.repository";
import { TaskEntity } from "../databases/mysql/task.entity";
import { UserRepository } from "../repositories/user.repository";

export class TaskService {
  private taskRepository = new TaskRepository();
  private userRepository = new UserRepository();

  async createTask(
    name: string,
    assignedToId: number,
    dueDate: Date
  ): Promise<TaskEntity> {
    console.log(
      `Creating task: ${name}, assigned to user ID: ${assignedToId}, due date: ${dueDate}`
    );

    const user = await this.userRepository.findById(assignedToId);
    if (!user) {
      console.error(`User with ID ${assignedToId} not found`);
      throw new Error("User not found");
    }

    const task = this.taskRepository.create({
      name,
      assignedTo: user,
      dueDate,
    });
    return this.taskRepository.save(task);
  }

  async getTasks(): Promise<TaskEntity[]> {
    return this.taskRepository.findAll();
  }
}
