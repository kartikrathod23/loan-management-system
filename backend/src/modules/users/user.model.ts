import mongoose, {Schema} from "mongoose";

import {UserRole} from "./user.types";

export interface IUser{
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name:{
      type: String,
      required: true,
      trim: true,
    },

    email:{
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password:{
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role:{
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.BORROWER,
    },

    isActive:{
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);