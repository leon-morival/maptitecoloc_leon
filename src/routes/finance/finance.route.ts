import { Router } from "express";
import * as financeController from "../../controllers/finance.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post("/charges", authMiddleware, financeController.addCharge);
router.get(
  "/history/:colocId",
  authMiddleware,
  financeController.getFinanceHistory
);

export default router;
