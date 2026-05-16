import { Loan } from "./loan.model";
import { createLoanSchema } from "./loan.validation";
import { calculateLoanDetails } from "./loan.utils";
import { Borrower } from "../borrower/borrower.model";
import { AppError } from "../../shared/errors/AppError";

export const createLoan = async (userId: string, payload: unknown) => {
    const validatedData = createLoanSchema.parse(payload);

    const borrower = await Borrower.findOne({ userId, });

    if (!borrower) {
        throw new AppError("Borrower profile not found", 404);
    }

    if (!borrower.isEligible) {
        throw new AppError(borrower.rejectionReason || "Borrower not eligible", 400);
    }

    const calculations =
        calculateLoanDetails({
            principalAmount: validatedData.principalAmount,
            interestRate: validatedData.interestRate,
            tenureDays: validatedData.tenureDays,
        });

    const loan =
        await Loan.create({
            borrowerId: userId,
            ...validatedData,
            ...calculations,
            remainingAmount:calculations.totalRepayment,
            totalPaidAmount: 0,
        });

    return loan;
};