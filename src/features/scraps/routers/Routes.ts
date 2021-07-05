import { Router } from "express";
import userAuth from "../../users/middlewares/userAuth";
import ScrapController from "../controllers/ScrapController";

class Routes {
  public init(): Router {
    const routes = Router();

    routes.get("/scraps", userAuth, ScrapController.index);
    routes.get("/scraps/:id", userAuth, ScrapController.show);
    routes.post("/scraps", userAuth, ScrapController.store);
    routes.put("/scraps/:id", userAuth, ScrapController.update);
    routes.delete("/scraps/:id", userAuth, ScrapController.delete);

    return routes;
  }
}

export default new Routes().init();
