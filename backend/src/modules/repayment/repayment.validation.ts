import { z } from "zod";

export const repaymentSchemaValidation = z.object({
    amount: z.number().positive(),
    transactionReference:z.string().min(5),
});