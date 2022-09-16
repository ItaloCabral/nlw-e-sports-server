import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes";

class App {
  public app = express();

  constructor() {
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use((request: Request, response: Response, next: NextFunction) => {
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Methods', 'GET,POST');
      response.header('Access-Control-Allow-Headers', 'Content-Type');
      this.app.use(cors());
      next();
    });

  }

  private routes() {
    this.app.use(router);
  }
}

export default App;
