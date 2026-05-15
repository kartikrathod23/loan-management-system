import { Request, Response, NextFunction } from "express";
import { UserRole } from "../modules/users/user.types";
import { AppError } from "../shared/errors/AppError";

export const authorizeRoles =(...roles: UserRole[]) =>(req: Request,_res: Response,next: NextFunction) =>{
    if(!req.user){
      return next(
        new AppError(
          "Unauthorized",
          401
        )
      );
    }

    const hasAccess =roles.includes(req.user.role);

    if(!hasAccess){
        return next(new AppError("Forbidden",403));
    }
    next();
};