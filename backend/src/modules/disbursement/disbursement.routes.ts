import { Router } from "express";
import { authenticateUser } from "../../middlewares/auth.middleware";
import { authorizeRoles } from "../../middlewares/authorizeRoles";
import { UserRole } from "../users/user.types";
import {disburseLoan,getAllSanctionedLoans,} from "./disbursement.controller";

const router = Router();

router.get(
    "/sanctioned-loans",
    authenticateUser,
    authorizeRoles(UserRole.DISBURSEMENT),
    getAllSanctionedLoans
);

router.patch(
    "/:loanId/disburse",
    authenticateUser,
    authorizeRoles(UserRole.DISBURSEMENT),
    disburseLoan
);

export default router;