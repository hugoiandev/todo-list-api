import { Router } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import TaskController from "./controllers/TaskController";
import TaskService from "./services/TaskService";
import TaskRepository from "./repositories/TaskRepository";

const routes = Router();

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

const checkJwt = auth({
  audience: "https://dev-e2naertpnyw7t415.us.auth0.com/api/v2/",
  issuerBaseURL: "https://dev-e2naertpnyw7t415.us.auth0.com/",
});

routes.get("/", (req, res) => {
  res.send("Public");
});

routes.use(checkJwt);

routes.get("/tasks/:userId", taskController.getTasks.bind(taskController));
routes.post("/tasks/:userId", taskController.saveTask.bind(taskController));
routes.put(
  "/tasks/:id/:userId",
  taskController.updateTask.bind(taskController)
);
routes.delete(
  "/tasks/:id/:userId",
  taskController.deleteTask.bind(taskController)
);

export default routes;
