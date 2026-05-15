import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../../shared/handlers/asyncHandler";
import { signupUser } from "./auth.service";
import { sendResponse } from "../../shared/responses/sendResponse";
import { User } from "../users/user.model";
import { AppError } from "../../shared/errors/AppError";
import { generateToken } from "../../shared/utils/generateToken";
import { setAuthCookie } from "../../shared/utils/setAuthCookie";

export const signup = asyncHandler(async (req: Request, res: Response) => {

    const user = await signupUser(req.body);
    sendResponse(res, 201, {
        success: true,
        message:
            "User registered successfully",
        data: user,
    });
}
);

export const login = asyncHandler(async (req: Request, res: Response) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email, }).select("+password");

    if (!user) {
        throw new AppError(
            "Invalid credentials",
            401
        );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new AppError(
            "Invalid credentials",
            401
        );
    }

    const token = generateToken({ userId: user._id.toString(), role: user.role, });

    setAuthCookie(res, token);

    sendResponse(res, 200, {
        success: true,
        message:
            "Login successful",
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        },
    });
}
);

export const logout = asyncHandler(async (_req: Request, res: Response) => {
    res.clearCookie("token");
    sendResponse(res, 200, {
        success: true,
        message:
            "Logout successful",
    });
}
);


export const getCurrentUser = asyncHandler(async (req: Request, res: Response)=>{
    const user = await User.findById(req.user?.userId);

    if(!user){
        throw new AppError("User not found",404);
    }

    sendResponse(res, 200,{
        success: true,
        message:
            "Current user fetched",
        data: user,
    });
}
);