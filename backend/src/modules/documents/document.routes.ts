import { Router } from "express";
import { upload } from "../../config/multer";
import { uploadSalarySlip } from "./document.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";
import { authorizeRoles } from "../../middlewares/authorizeRoles";
import { UserRole } from "../users/user.types";

const router = Router();

router.post("/upload-salary-slip",authenticateUser,authorizeRoles(UserRole.BORROWER), upload.single("salarySlip"),uploadSalarySlip);

export default router;