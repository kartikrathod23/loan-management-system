import { Request, Response } from "express";

export const getAdminData = (_req: Request,res: Response)=>{
  res.json({
    success: true,
    message:
      "Welcome Admin",
  });
};