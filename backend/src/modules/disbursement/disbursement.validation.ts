import { z } from "zod";

export const disbursementSchema = z.object({
    transactionReference: z.string().min(5),
});