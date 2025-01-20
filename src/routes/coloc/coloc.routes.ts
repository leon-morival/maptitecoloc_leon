import { Router } from "express";

import * as colocController from "../../controllers/coloc.controller";
// import { authenticate } from "../middlewares/auth.middleware";

const routes = Router();

// Route to create a new coloc
routes.post("/", colocController.createColoc);

// Route to get a coloc by ID
routes.get("/:id", colocController.getColocById);

export default routes;
