import { Router } from "express";
import ScrapController from "../controllers/ScrapController";

class Routes {
  public init(): Router {
    const routes = Router();

    routes.get("/scraps", ScrapController.index);
    routes.get("/scraps/:id", ScrapController.show);
    routes.post("/scraps", ScrapController.store);
    routes.put("/scraps/:id", ScrapController.update);
    routes.delete("/scraps/:id", ScrapController.delete);

    return routes;
  }
}

export default new Routes().init();
