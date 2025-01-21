import { Request, Response } from "express";
import { TaskService } from "../services/task.service";

const taskService = new TaskService();

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, assignedTo, dueDate } = req.body;
    const task = await taskService.createTask(
      name,
      assignedTo,
      new Date(dueDate)
    );
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error creating task", error });
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await taskService.getTasks();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error fetching tasks", error });
  }
};
