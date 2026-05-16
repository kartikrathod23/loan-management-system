import { z } from "zod";

export const createLoanSchema = z.object({
    principalAmount: z.number({
          error:"Principal amount is required",
        })
        .min(
            50000,
            {
                error:"Minimum loan amount is ₹50,000",
            }
        )
        .max(
            500000,
            {
                error:"Maximum loan amount is ₹5,00,000",
            }
        ),

    tenureDays: z
        .number({
            error:"Tenure is required",
        })
        .min(
            30,
            {
                error:"Minimum tenure is 30 days",
            }
        )
        .max(
            365,
            {
                error:"Maximum tenure is 365 days",
            }
        ),

    interestRate: z
        .number({
            error:"Interest rate is required",
        })
        .min(
            1,
            {
                error:"Minimum interest rate is 1%",
            }
        )
        .max(
            30,
            {
                error:"Maximum interest rate is 30%",
            }
        ),
});