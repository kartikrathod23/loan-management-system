import mongoose, { Schema } from "mongoose";
import { LoanStatus } from "./loan.types";

export interface ILoan {
    borrowerId: mongoose.Types.ObjectId;
    principalAmount: number;
    tenureMonths: number;
    interestRate: number;
    totalInterest: number;
    totalRepayment: number;
    monthlyEMI: number;
    status: LoanStatus;
    sanctionedBy?: mongoose.Types.ObjectId;
    sanctionRemarks?: string;
    sanctionedAt?: Date;
    disbursedBy?: mongoose.Types.ObjectId;
    disbursedAt?: Date;
    transactionReference?: string;
}

const loanSchema = new Schema<ILoan>({
    borrowerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    principalAmount: {
        type: Number,
        required: true,
    },

    tenureMonths: {
        type: Number,
        required: true,
    },

    interestRate: {
        type: Number,
        required: true,
    },

    totalInterest: {
        type: Number,
        required: true,
    },

    totalRepayment: {
        type: Number,
        required: true,
    },

    monthlyEMI: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: Object.values(LoanStatus),
        default: LoanStatus.PENDING,
    },

    sanctionedBy:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    sanctionRemarks: {
        type: String,
    },

    sanctionedAt: {
        type: Date,
    },

    disbursedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    disbursedAt: {
        type: Date,
    },

    transactionReference: {
        type: String,
    },
},
    {
        timestamps: true,
    }
);

export const Loan = mongoose.model<ILoan>("Loan", loanSchema);