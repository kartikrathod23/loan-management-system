import { z } from "zod";
import { EmploymentType } from "./borrower.types";

export const borrowerProfileSchema =
  z.object({
    fullName:z.string().min(2),
    panNumber: z
      .string()
      .regex(
        /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,

        "Invalid PAN format"
      ),

    dateOfBirth:z.string(),
    monthlySalary:z.number().positive(),
    employmentType:
      z.enum([
        EmploymentType.SALARIED,
        EmploymentType.SELF_EMPLOYED,
        EmploymentType.UNEMPLOYED,
      ]),
  });