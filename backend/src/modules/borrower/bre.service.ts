import { EmploymentType } from "./borrower.types";

interface BREPayload {
  age: number;
  monthlySalary: number;
  employmentType:EmploymentType;
}

export const runBRE = (payload: BREPayload)=>{
  const {age,monthlySalary,employmentType} = payload;

  if(age < 23 ||age > 50){
    return {
      isEligible: false,
      rejectionReason:"Age must be between 23 and 50",
    };
  }

  if(monthlySalary < 25000){
    return {
      isEligible: false,
      rejectionReason:"Monthly salary must be at least 25000",
    };
  }

  if(employmentType ===EmploymentType.UNEMPLOYED){
    return {
      isEligible: false,
      rejectionReason:"Unemployed applicants are not eligible",
    };
  }

  return{
    isEligible: true,
    rejectionReason: "",
  };
};