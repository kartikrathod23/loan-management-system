import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { AppError } from "../shared/errors/AppError";

export const globalErrorHandler = (error: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: error.issues[0]?.message || "Validation Error",
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const firstError = Object.values(error.errors)[0];

    return res.status(400).json({
      success: false,
      message: firstError.message,
    });
  }

  if (error.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate value entered",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};