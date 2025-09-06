import express from "express";
import type { Application, Request, Response } from "express";
import clothesRoutes from "./routes/cloth.route.js";
import usersRoutes from "./routes/user.route.js";

const app: Application = express();

app.use(express.json());

app.use("/api/clothes", clothesRoutes);
app.use("/api/users", usersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the!");
});

export default app;
