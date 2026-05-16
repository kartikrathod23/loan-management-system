import { Loan } from "../loans/loan.model";
import { LoanStatus } from "../loans/loan.types";
import { Repayment } from "./repayment.model";
import { repaymentSchemaValidation } from "./repayment.validation";
import { AppError } from "../../shared/errors/AppError";

export const collectRepayment = async (loanId: string,collectionOfficerId: string,payload: unknown) => {
    const validatedData =repaymentSchemaValidation.parse(payload);
    const loan =await Loan.findById(loanId);

    if (!loan) {
        throw new AppError("Loan not found",404);
    }

    if(loan.status !== LoanStatus.ACTIVE) {
        throw new AppError("Only active loans can receive repayments",400);
    }

    if(validatedData.amount >(loan.remainingAmount || 0)) {
        throw new AppError("Repayment exceeds remaining amount",400);
    }

    await Repayment.create({
        loanId: loan._id,
        amount:validatedData.amount,
        collectedBy:collectionOfficerId as any,
        transactionReference:validatedData.transactionReference,
    });

    loan.totalPaidAmount =(loan.totalPaidAmount || 0) +validatedData.amount;

    loan.remainingAmount =(loan.remainingAmount || 0) -validatedData.amount;

    if(loan.remainingAmount <= 0) {
        loan.status =LoanStatus.CLOSED;
        loan.closedAt =new Date();
    }

    await loan.save();

    return loan;
};

export const getActiveLoans = async () => {
    return await Loan.find({status: LoanStatus.ACTIVE,}).populate("borrowerId","name email");
};