import express from "express";
import type { Application, Request, Response } from "express";
import clothesRoutes from "./routes/cloth.route.js";
import usersRoutes from "./routes/user.route.js";
import path from "path";
const app: Application = express();

app.use("/img", express.static(path.join(process.cwd(), "src","img")));

app.use("/api/clothes", clothesRoutes);


app.use(express.json());
app.use("/api/users", usersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the!");
});

export default app;
