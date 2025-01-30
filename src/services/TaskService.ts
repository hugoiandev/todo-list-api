import { TaskRepositoryEnum } from "../enums/TaskRepositoryEnum";
import ITask from "../models/TaskModel";
import TaskRepository from "../repositories/TaskRepository";

class TaskService {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async getAllTasks(auth0Id: string) {
    try {
      return this.taskRepository.findAllById(auth0Id);
    } catch (err) {
      const error = err as Error;
      if (error.message === TaskRepositoryEnum.QueryError) {
        throw new Error("Occured an error while fetching tasks");
      }

      throw error;
    }
  }

  async createTask(title: string, auth0Id: string) {
    try {
      return this.taskRepository.save(title, auth0Id);
    } catch (err) {
      const error = err as Error;

      if (error.message === TaskRepositoryEnum.DuplicateId) {
        throw new Error("Already exists task");
      }
      if (error.message === TaskRepositoryEnum.ValidationError) {
        throw new Error("Invalid data");
      }

      throw error;
    }
  }

  async updateTask({
    id,
    auth0Id,
    title,
    completed,
  }: {
    id: number;
    auth0Id: string;
    title: string;
    completed: boolean;
  }) {
    try {
      return this.taskRepository.update({ id, auth0Id, title, completed });
    } catch (err) {
      const error = err as Error;

      if (error.message === TaskRepositoryEnum.ValidationError) {
        throw new Error("Invalid data");
      }

      throw error;
    }
  }

  async deleteTask({ id, auth0Id }: { id: number; auth0Id: string }) {
    try {
      return this.taskRepository.delete({ id, auth0Id });
    } catch (err) {
      const error = err as Error;

      throw error;
    }
  }
}

export default TaskService;
