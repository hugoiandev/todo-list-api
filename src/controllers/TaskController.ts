import { Request, Response } from "express";
import TaskService from "../services/TaskService";

class TaskController {
  private TaskService: TaskService;

  constructor() {
    this.TaskService = new TaskService();
  }

  async getTasks(req: Request, res: Response) {
    console.log(req);
    try {
      const id = req.params.id;

      const task = await this.TaskService.getAllTasks(id);

      res.status(200).json(task);
    } catch (err: any) {
      const error = err as Error;

      if (error.message === "Occured an error while fetching tasks") {
        res.status(400).json({ message: error.message });
      }
      console.error("Unexpected Error", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async saveTask(req: Request, res: Response) {
    try {
      const title = req.body;
      const auth0Id = req.body;

      const task = await this.TaskService.createTask(title, auth0Id);

      res.status(201).json(task);
    } catch (err) {
      const error = err as Error;

      if (error.message === "Already exists task") {
        res.status(400).json({ message: error.message });
      }
      if (error.message === "Invalid data") {
        res.status(400).json({ message: error.message });
      }

      console.error("Unexpected Error", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const id = Number(req.params.taskId);
      const auth0Id = req.params.auth0Id;
      const title = req.body.title;
      const completed = req.body.completed;

      const task = await this.TaskService.updateTask({
        id,
        auth0Id,
        title,
        completed,
      });

      res.status(200).json(task);
    } catch (err) {
      const error = err as Error;

      console.error("Unexpected Error", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteTask(req: Request, res: Response) {
    const id = Number(req.body.id);
    const auth0Id = req.body.auth0Id;

    try {
      await this.TaskService.deleteTask({ id, auth0Id });

      res.status(200).json({ message: "Success" });
    } catch (err) {
      const error = err as Error;
      console.error("Unexpected Error", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new TaskController();
