import bcrypt from "bcryptjs";
import { connectDB } from "../config/database";
import { User } from "../modules/users/user.model";
import { UserRole } from "../modules/users/user.types";

const seedUsers = async ()=>{
  try{
    await connectDB();
    console.log("Connected to DB");

    await User.deleteMany({
      role: {
        $ne: UserRole.BORROWER,
      },
    });

    const hashedPassword = await bcrypt.hash("123456",10);

    const users=[
      {
        name: "Admin User",
        email:"admin@lms.com",
        password:hashedPassword,
        role: UserRole.ADMIN,
      },

      {
        name:"Sales User",
        email:"sales@lms.com",
        password:hashedPassword,
        role: UserRole.SALES,
      },

      {
        name:"Sanction User",
        email:"sanction@lms.com",
        password:hashedPassword,
        role:UserRole.SANCTION,
      },

      {
        name:"Disbursement User",
        email:"disbursement@lms.com",
        password:hashedPassword,
        role:UserRole.DISBURSEMENT,
      },

      {
        name:"Collection User",
        email:"collection@lms.com",
        password:hashedPassword,
        role:UserRole.COLLECTION,
      },
    ];

    await User.insertMany(users);

    console.log("Seed users created successfully");
    process.exit(0);

  } catch (error){
    console.error("Seeding failed:",error);
    process.exit(1);
  }
};

seedUsers();