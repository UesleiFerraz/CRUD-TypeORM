import cors from "cors";
import express from "express";
import Database from "../data/connections/Database";
import { default as UserRoutes } from "../../features/users/routers/Routes";
import { default as ScrapRoutes } from "../../features/scraps/routers/Routes";

class App {
  readonly #express: express.Application;

  constructor() {
    this.#express = express();
  }

  public async init() {
    this.config();
    this.routes();
    await this.database();
  }

  private async database() {
    await Database.openConnection();
  }

  private config() {
    this.#express.use(cors());
    this.#express.use(express.json());
    this.#express.use(express.urlencoded({ extended: false }));
  }

  private routes() {
    this.#express.get("/", (req, res) => {
      return res.send("oi");
    });
    this.#express.use(UserRoutes);
    this.#express.use(ScrapRoutes);
  }

  public start(port: number) {
    this.#express.listen(port, () => console.log("server on"));
  }
}

export default new App();
