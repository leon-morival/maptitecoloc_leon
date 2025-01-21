import { Router } from "express";

import * as colocController from "../../controllers/coloc.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
// import { authenticate } from "../middlewares/auth.middleware";
const routes = Router();

// Route to create a new coloc
routes.post("/create", authMiddleware, colocController.createColoc);

// Route to get a coloc by ID
routes.get("/:id", colocController.getColocById);
routes.get("/:id/members", colocController.getColocById);
routes.delete("/:id", authMiddleware, colocController.deleteColoc);

export default routes;
