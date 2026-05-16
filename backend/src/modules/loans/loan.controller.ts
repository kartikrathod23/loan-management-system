import { Request, Response } from "express";
import { asyncHandler } from "../../shared/handlers/asyncHandler";
import { sendResponse } from "../../shared/responses/sendResponse";
import { createLoan,getLoansByBorrower } from "./loan.service";

export const applyLoan = asyncHandler(async (req: Request, res: Response) => {
    const loan = await createLoan(req.user!.userId, req.body);
    sendResponse(res, 201, {
        success: true,
        message: "Loan application submitted",
        data: loan,
    });
}
);

export const getMyLoans = asyncHandler(async (req: Request, res: Response) => {
    const loans = await getLoansByBorrower(
        req.user!.userId
    );

    sendResponse(res, 200, {
        success: true,
        message: "Loans fetched successfully",
        data: loans,
    });
});