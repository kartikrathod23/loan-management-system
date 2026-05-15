import { Loan } from "../loans/loan.model";
import { LoanStatus } from "../loans/loan.types";
import { AppError } from "../../shared/errors/AppError";
import { sanctionDecisionSchema } from "./sanction.validation";

export const processSanctionDecision = async (loanId: string,sanctionUserId: string,payload: unknown) => {
    const validatedData = sanctionDecisionSchema.parse(payload);
    const loan = await Loan.findById(loanId);
    if (!loan) {
        throw new AppError("Loan not found", 404);
    }

    if (loan.status !== LoanStatus.PENDING) {
        throw new AppError("Only pending loans can be processed", 400);
    }

    loan.status =validatedData.decision === "SANCTIONED"? LoanStatus.SANCTIONED: LoanStatus.REJECTED;
    loan.sanctionRemarks = validatedData.remarks
    loan.sanctionedBy = sanctionUserId as any;
    loan.sanctionedAt = new Date();

    await loan.save();
    return loan;
};


export const getPendingLoans = async () => {
    return await Loan.find({
        status: LoanStatus.PENDING,
    }).populate("borrowerId", "name email");
};