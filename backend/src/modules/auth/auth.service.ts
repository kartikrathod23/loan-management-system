import bcrypt from "bcryptjs";
import { User } from "../users/user.model";
import { AppError } from "../../shared/errors/AppError";
import { signupSchema } from "./auth.validation";

export const signupUser=async(payload: unknown)=>{
    
  const validatedData=signupSchema.parse(payload);
  const existingUser = await User.findOne({ email:validatedData.email,});

  if(existingUser){
    throw new AppError(
      "Email already exists",
      400
    );
  }

  const hashedPassword = await bcrypt.hash(validatedData.password,10);
  const user = await User.create({...validatedData, password:hashedPassword,});

  return user;
};