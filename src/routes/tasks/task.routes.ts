import { Router } from "express";
import * as taskController from "../../controllers/task.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
const router = Router();

router.post("/", authMiddleware, taskController.createTask);
router.get("/", authMiddleware, taskController.getTasks);

export default router;
