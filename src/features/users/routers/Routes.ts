import { Router } from "express";
import UserController from "../controllers/UserController";
import userAlreadyExists from "../middlewares/userAlreadyExists";
import userAuth from "../middlewares/userAuth";

class Routes {
  public init(): Router {
    const routes = Router();

    routes.get("/users", userAuth, UserController.index);
    routes.get("/users/:id", userAuth, UserController.show);
    routes.post("/users", userAlreadyExists, UserController.store);
    routes.post("/auth", UserController.authenticate);

    return routes;
  }
}

export default new Routes().init();
