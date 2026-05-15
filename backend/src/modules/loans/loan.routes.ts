import { Router } from "express";
import { applyLoan } from "./loan.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";
import { authorizeRoles } from "../../middlewares/authorizeRoles";
import { UserRole } from "../users/user.types";

const router = Router();

router.post("/apply",authenticateUser,authorizeRoles(UserRole.BORROWER),applyLoan);

export default router;