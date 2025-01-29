import { Router } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import TaskController from "./controllers/TaskController";

const routes = Router();

const checkJwt = auth({
  audience: "pSC8W8AtuPoWetGCQXJhTmwyWqIj3t2n",
  issuerBaseURL: "https://dev-e2naertpnyw7t415.us.auth0.com/",
});

routes.get("/", (req, res) => {
  res.send("Public");
});

routes.use(checkJwt);

routes.get("/users", (req, res) => {});
routes.post("/tasks/:id", TaskController.saveTask);
routes.put("/tasks/:id", TaskController.updateTask);
routes.delete("/tasks/:id", TaskController.deleteTask);

export default routes;
