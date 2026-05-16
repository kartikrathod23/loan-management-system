import { Router } from "express";
import { authenticateUser } from "../../middlewares/auth.middleware";
import { authorizeRoles } from "../../middlewares/authorizeRoles";
import { UserRole } from "../users/user.types";

import {collectLoanRepayment,getAllActiveLoans,} from "./repayment.controller";

const router = Router();

router.get(
    "/active-loans",
    authenticateUser,
    authorizeRoles(UserRole.COLLECTION),
    getAllActiveLoans
);

router.patch(
    "/:loanId/collect",
    authenticateUser,
    authorizeRoles(UserRole.COLLECTION),
    collectLoanRepayment
);

export default router;