import { Router } from "express";
import { authenticateUser } from "../../middlewares/auth.middleware";
import { authorizeRoles } from "../../middlewares/authorizeRoles";
import { UserRole } from "../users/user.types";
import { sanctionLoan, getAllPendingLoans } from "./sanction.controller";

const router = Router();

router.get(
    "/pending-loans",
    authenticateUser,
    authorizeRoles(UserRole.SANCTION),
    getAllPendingLoans
);

router.patch(
    "/:loanId/decision",
    authenticateUser,
    authorizeRoles(UserRole.SANCTION),
    sanctionLoan
);

export default router;