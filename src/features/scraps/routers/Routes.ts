import { Router } from "express";
import userAuth from "../../users/middlewares/userAuth";
import ScrapController from "../controllers/ScrapController";
import scrapExists from "../middlewares/scrapExists";
import validBodyRequest from "../middlewares/validBodyRequest";

class Routes {
  public init(): Router {
    const routes = Router();

    routes.get("/scraps", userAuth, ScrapController.index);
    routes.get("/scraps/:id", [userAuth, scrapExists], ScrapController.show);
    routes.post("/scraps", [userAuth, validBodyRequest], ScrapController.store);
    routes.put(
      "/scraps/:id",
      [userAuth, scrapExists, validBodyRequest],
      ScrapController.update
    );
    routes.delete(
      "/scraps/:id",
      [userAuth, scrapExists],
      ScrapController.delete
    );

    return routes;
  }
}

export default new Routes().init();
