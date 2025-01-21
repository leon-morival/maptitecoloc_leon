import { Router } from "express";
import * as colocMembersController from "../../controllers/coloc_members.controller";

const routes = Router();

// Route to add a member to a coloc
routes.post("/", colocMembersController.addMember);

// Route to get members of a coloc by coloc ID
routes.get("/:colocId/members", colocMembersController.getMembersByColocId);
routes.delete("/", colocMembersController.removeMember);

export default routes;
