import { Loan } from "../loans/loan.model";
import { LoanStatus } from "../loans/loan.types";
import { AppError } from "../../shared/errors/AppError";
import { disbursementSchema } from "./disbursement.validation";

export const processDisbursement = async (loanId: string,disbursementUserId: string,payload: unknown) => {
    const validatedData = disbursementSchema.parse(payload);
    const loan = await Loan.findById(loanId);

    if (!loan) {
        throw new AppError("Loan not found", 404);
    }

    if (loan.status !== LoanStatus.SANCTIONED) {
        throw new AppError(
            "Only sanctioned loans can be disbursed",
            400
        );
    }

    loan.status = LoanStatus.ACTIVE;
    loan.transactionReference =validatedData.transactionReference;
    loan.disbursedBy =disbursementUserId as any;
    loan.disbursedAt = new Date();

    await loan.save();

    return loan;
};

export const getSanctionedLoans = async () => {
    return await Loan.find({
        status: LoanStatus.SANCTIONED,
    }).populate("borrowerId", "name email");
};