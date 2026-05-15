import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {errorMiddleware} from "./middlewares/error.middleware";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/users/user.routes"
import borrowerRoutes from "./modules/borrower/borrower.routes"
import documentsRoutes from "./modules/documents/document.routes"
import loanRoutes from "./modules/loans/loan.routes"
import sanctionRoutes from "./modules/sanction/sanction.routes"
import disbursementRoutes from "./modules/disbursement/disbursement.routes";

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
app.use("/api/users",userRoutes);
app.use("/api/borrower",borrowerRoutes);
app.use('/api/documents', documentsRoutes)
app.use('/api/loans',loanRoutes);
app.use('/api/sanction',sanctionRoutes);
app.use('/api/disbursement', disbursementRoutes);

app.get("/", (_req, res)=>{
  res.send("Loan Management Backend Running");
});

app.use(errorMiddleware);

export default app;