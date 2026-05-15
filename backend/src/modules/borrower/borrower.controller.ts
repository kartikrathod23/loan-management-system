import { Request, Response, } from "express";
import { asyncHandler } from "../../shared/handlers/asyncHandler";
import { sendResponse } from "../../shared/responses/sendResponse";
import { createBorrowerProfile } from "./borrower.service";

export const createProfile = asyncHandler(async (req: Request, res: Response) => {
    const borrower = await createBorrowerProfile(req.user!.userId, req.body);
    sendResponse(res, 201, {
        success: true,
        message: borrower.isEligible ? "Borrower eligible" : "Borrower rejected by BRE",
        data: borrower,
    });
}
);