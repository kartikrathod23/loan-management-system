import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "../shared/errors/AppError";
import { AuthenticatedUser } from "../shared/interfaces/auth.interface";

export const authenticateUser = (req: Request,_res: Response,next: NextFunction)=>{
  try{
    const token =req.cookies.token;

    if(!token){
      throw new AppError(
        "Unauthorized",
        401
      );
    }

    const decoded =jwt.verify(token,env.JWT_SECRET) as AuthenticatedUser;

    req.user = decoded;
    next();
  } 
  catch (error){
    next(new AppError("Unauthorized",401));
  }
};