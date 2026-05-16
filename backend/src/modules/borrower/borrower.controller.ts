import { Request, Response, } from "express";
import { asyncHandler } from "../../shared/handlers/asyncHandler";
import { sendResponse } from "../../shared/responses/sendResponse";
import { createBorrowerProfile,getBorrowerProfile } from "./borrower.service";

export const createProfile = asyncHandler(async (req: Request, res: Response) => {
    const borrower = await createBorrowerProfile(req.user!.userId, req.body);
    sendResponse(res, 201, {
        success: true,
        message: borrower.isEligible ? "Borrower eligible" : "Borrower rejected by BRE",
        data: borrower,
    });
}
);

export const getMyBorrowerProfile = asyncHandler(
    async (req: Request, res: Response) => {

        const borrower = await getBorrowerProfile(
            req.user!.userId
        );

        sendResponse(res, 200, {
            success: true,
            message: "Borrower profile fetched",
            data: borrower,
        });
    }
);