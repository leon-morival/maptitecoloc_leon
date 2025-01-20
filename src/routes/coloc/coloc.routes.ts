import { Router } from "express";

import * as colocController from "../../controllers/coloc.controller";
// import { authenticate } from "../middlewares/auth.middleware";

const routes = Router();

// Route pour l'inscription d'un utilisateur
routes.post("/register", colocController.registerUser);

// Route pour la connexion d'un utilisateur
routes.post("/login", colocController.loginUser);

// Route pour récupérer le profil de l'utilisateur connecté
routes.get("/me" /* authenticate, userController.getUserProfile */);

export default routes;
