import { Request, Response } from "express";
import { asyncHandler } from "../../shared/handlers/asyncHandler";
import { sendResponse } from "../../shared/responses/sendResponse";

import {processDisbursement,getSanctionedLoans,} from "./disbursement.service";

export const disburseLoan = asyncHandler(async (req: Request, res: Response) => {
    const loan = await processDisbursement(
        req.params.loanId as string,
        req.user!.userId,
        req.body
    );

    sendResponse(res, 200, {
        success: true,
        message: "Loan disbursed successfully",
        data: loan,
    });
});

export const getAllSanctionedLoans = asyncHandler(async (_req: Request, res: Response) => {
    const loans = await getSanctionedLoans();
    sendResponse(res, 200, {
        success: true,
        message: "Sanctioned loans fetched successfully",
        data: loans,
    });
});