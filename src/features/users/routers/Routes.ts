import { Router } from "express";
import UserController from "../controllers/UserController";

class Routes {
  public init(): Router {
    const routes = Router();

    routes.get("/user", UserController.index);
    routes.get("/user/:id", UserController.show);
    routes.post("/user", UserController.store);
    routes.post("/authenticate", UserController.authenticate);

    return routes;
  }
}

export default new Routes().init();
