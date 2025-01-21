import { Router } from "express";
import * as userController from "../../controllers/user.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const routes = Router();

routes.post("/register", userController.registerUser);
routes.post("/login", userController.loginUser);

// Nouvelle route pour rafraîchir le token
routes.post("/refresh", userController.refreshToken);

// Nouvelle route pour récupérer le profil de l’utilisateur connecté
routes.get("/me", authMiddleware, userController.getUserProfile);

export default routes;
