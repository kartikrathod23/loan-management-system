import { Request, Response } from "express";
import { asyncHandler } from "../../shared/handlers/asyncHandler";
import { sendResponse } from "../../shared/responses/sendResponse";

import {collectRepayment,getActiveLoans,} from "./repayment.service";

export const collectLoanRepayment = asyncHandler(async (req: Request, res: Response) => {
    const loan = await collectRepayment(req.params.loanId as string,req.user!.userId,req.body);

    sendResponse(res, 200, {
        success: true,
        message: "Repayment collected successfully",
        data: loan,
    });
});

export const getAllActiveLoans = asyncHandler(async (_req: Request, res: Response) => {
    const loans = await getActiveLoans();

    sendResponse(res, 200, {
        success: true,
        message: "Active loans fetched successfully",
        data: loans,
    });
});