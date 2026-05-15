import { z } from "zod";

export const createLoanSchema =
  z.object({
    principalAmount:z.number().positive(),
    tenureMonths:z.number().min(6).max(60),
    interestRate:z.number().min(1).max(30),
  });