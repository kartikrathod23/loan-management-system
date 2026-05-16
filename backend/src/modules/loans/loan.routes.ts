import { Router } from "express";
import { applyLoan,getMyLoans } from "./loan.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";
import { authorizeRoles } from "../../middlewares/authorizeRoles";
import { UserRole } from "../users/user.types";

const router = Router();

router.post("/apply",authenticateUser,authorizeRoles(UserRole.BORROWER),applyLoan);
router.get(
    "/my-loans",
    authenticateUser,
    authorizeRoles(UserRole.BORROWER),
    getMyLoans
);

export default router;