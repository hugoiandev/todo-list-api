import express, { Express } from "express";
import routes from "./routes";
import cors from "cors";
import dotenv from "dotenv";
import error from "./middlewares/error";

dotenv.config();

class App {
  server: Express;

  constructor() {
    this.server = express();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(error);
  }

  routes() {
    this.server.use(routes);
  }
}

export default App;
