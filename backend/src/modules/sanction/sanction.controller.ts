import { Request, Response } from "express";
import { asyncHandler } from "../../shared/handlers/asyncHandler";
import { sendResponse } from "../../shared/responses/sendResponse";
import { processSanctionDecision,getPendingLoans } from "./sanction.service";

export const sanctionLoan = asyncHandler(async (req: Request, res: Response) => {
    const loan = await processSanctionDecision(
        req.params.loanId as string,
        req.user!.userId,
        req.body
    );

    sendResponse(res, 200, {
        success: true,
        message: `Loan ${loan.status.toLowerCase()} successfully`,
        data: loan,
    });
});


export const getAllPendingLoans = asyncHandler(async (_req: Request, res: Response) => {
    const loans = await getPendingLoans();

    sendResponse(res, 200, {
        success: true,
        message: "Pending loans fetched successfully",
        data: loans,
    });
});