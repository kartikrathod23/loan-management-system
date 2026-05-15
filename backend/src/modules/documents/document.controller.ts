import { Request, Response, } from "express";
import { asyncHandler } from "../../shared/handlers/asyncHandler";
import { AppError } from "../../shared/errors/AppError";
import { saveDocument } from "./document.service";
import { sendResponse } from "../../shared/responses/sendResponse";

export const uploadSalarySlip = asyncHandler(async (req: Request, res: Response)=>{
    if(!req.file){
        throw new AppError("File is required", 400);
    }

    const document = await saveDocument(req.user!.userId, req.file);

    sendResponse(res, 201,{
        success: true,
        message: "Salary slip uploaded successfully",
        data: document,
    });
}
);