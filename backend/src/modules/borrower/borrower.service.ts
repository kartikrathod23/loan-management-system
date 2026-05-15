import { Borrower } from "./borrower.model";
import { borrowerProfileSchema } from "./borrower.validation";
import { calculateAge } from "../../shared/utils/calculateAge";
import { runBRE } from "./bre.service";
import { AppError } from "../../shared/errors/AppError";

export const createBorrowerProfile =async (userId: string,payload: unknown)=>{
    const validatedData = borrowerProfileSchema.parse(payload);
    const existingProfile = await Borrower.findOne({userId,});

    if(existingProfile){
      throw new AppError(
        "Borrower profile already exists",
        400
      );
    }

    const age =calculateAge(new Date(validatedData.dateOfBirth));

    const breResult = runBRE({
      age,
      monthlySalary:validatedData.monthlySalary,
      employmentType:validatedData.employmentType,
    });

    const borrower =
      await Borrower.create({
        ...validatedData,
        userId,
        isEligible:breResult.isEligible,
        rejectionReason:breResult.rejectionReason,
      });

    return borrower;
  };