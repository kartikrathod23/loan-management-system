import mongoose, { Schema } from "mongoose";
import { EmploymentType } from "./borrower.types";

export interface IBorrower {
    userId: mongoose.Types.ObjectId;
    fullName: string;
    panNumber: string;
    dateOfBirth: Date;
    monthlySalary: number;
    employmentType: EmploymentType;
    isEligible: boolean;
    rejectionReason?: string;
}

const borrowerSchema =
    new Schema<IBorrower>({
        userId:{
            type:Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        fullName:{
            type: String,
            required: true,
            trim: true,
        },

        panNumber:{
            type: String,
            required: true,
            uppercase: true,
            unique: true,
        },

        dateOfBirth:{
            type: Date,
            required: true,
        },

        monthlySalary:{
            type: Number,
            required: true,
        },

        employmentType:{
            type: String,
            enum:Object.values(EmploymentType),
            required: true,
        },

        isEligible:{
            type: Boolean,
            default: true,
        },

        rejectionReason:{
            type: String,
        },
    },
        {
            timestamps: true,
        }
    );

export const Borrower = mongoose.model<IBorrower>("Borrower",borrowerSchema);