import express, { NextFunction, Request, Response } from "express";
import exampleRoutes from "./routes/api/exemple";
import userRoutes from "./routes/api/user";
import gameRoutes from "./routes/api/game";
import authRoutes from "./routes/api/auth";
// import { connectDB } from "./config/db";
import dotenv from "dotenv";

const app: any = express();

/**
 * accessing the .env variables
 */
dotenv.config();

// connectDB();
app.use(express.json());

/**
 * App Configuration
 */
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/", (_req: Request, res: Response) => {
  res.send("api is running..." + new Date());
});

/** register routes */
app.use("/api/example", exampleRoutes);
app.use("/api/gamers", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/auth", authRoutes);

export default app;
