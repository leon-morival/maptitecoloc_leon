import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user/user.routes";
import colocRoutes from "./routes/coloc/coloc.routes";
import colocMemberRoutes from "./routes/coloc/coloc_members.routes";
import tasksRoutes from "./routes/tasks/task.routes";
import financeRoutes from "./routes/finance/finance.routes";

const app = express();

app.use(express.json());
app.use(cors());
// Routes
app.get("/", (req, res) => {
  throw new Error(
    "Il n'y a rien d'implémenté dans cette route, à vous de jouer !"
  );
});

app.use("/api/users", userRoutes);
app.use("/api/colocs", colocRoutes);
app.use("/api/members", colocMemberRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/finances", financeRoutes);
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
