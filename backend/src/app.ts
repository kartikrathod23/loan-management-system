import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {errorMiddleware} from "./middlewares/error.middleware";
import authRoutes from "./modules/auth/auth.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);

app.get("/", (_req, res)=>{
  res.send("Loan Management Backend Running");
});

app.use(errorMiddleware);

export default app;