import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user/user.routes";
import colocRoutes from "./routes/coloc/coloc.routes";
import colocMemberRoutes from "./routes/coloc/coloc_members.routes";
import tasksRoutes from "./routes/tasks/task.routes"; // <-- Import

const app = express();

// Middlewares globaux
app.use(express.json()); // Permet de lire le body en JSON
app.use(cors()); // Active CORS pour les requêtes cross-origin
// app.use(helmet());       // Sécurise les headers HTTP

// Routes
app.get("/", (req, res) => {
  throw new Error(
    "Il n'y a rien d'implémenté dans cette route, à vous de jouer !"
  );
});

app.use("/api/users", userRoutes); // Routes pour les utilisateurs
app.use("/api/colocs", colocRoutes); // Routes pour les utilisateurs
app.use("/api/members", colocMemberRoutes); // Routes pour les utilisateurs
app.use("/api/tasks", tasksRoutes);

// Middleware de gestion des erreurs (à vous de le personnaliser pour qu'il soit réutilisable, pensez aux classes d'erreurs)
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(err);

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      statusCode,
      errorCode: err.code || "INTERNAL_SERVER_ERROR",
      message: err.message || "An unexpected error occurred",
    });
  }
);

export default app;
