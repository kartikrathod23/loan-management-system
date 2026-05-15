import { z } from "zod";

export const sanctionDecisionSchema = z.object({
    decision: z.enum(["SANCTIONED", "REJECTED"]),
    remarks: z.string().min(3),
});