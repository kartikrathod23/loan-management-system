import mongoose, { Schema } from "mongoose";

export interface IRepayment {
    loanId: mongoose.Types.ObjectId;
    amount: number;
    collectedBy: mongoose.Types.ObjectId;
    paymentDate: Date;
    transactionReference: string;
}

const repaymentSchema = new Schema<IRepayment>({
    loanId: {
        type: Schema.Types.ObjectId,
        ref: "Loan",
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    collectedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    paymentDate: {
        type: Date,
        default: Date.now,
    },

    transactionReference: {
        type: String,
        required: true,
        unique:true,
    },
},
    {
        timestamps: true,
    }
);

export const Repayment = mongoose.model<IRepayment>("Repayment", repaymentSchema);