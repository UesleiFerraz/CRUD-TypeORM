import { Router } from "express";
import UserController from "../controllers/UserController";

class Routes {
  public init(): Router {
    const routes = Router();

    routes.get("/users", UserController.index);
    routes.get("/users/:id", UserController.show);
    routes.post("/users", UserController.store);
    routes.post("/auth", UserController.authenticate);

    return routes;
  }
}

export default new Routes().init();
