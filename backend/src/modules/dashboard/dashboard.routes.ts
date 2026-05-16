import { Router } from "express";
import { authenticateUser } from "../../middlewares/auth.middleware";
import { authorizeRoles } from "../../middlewares/authorizeRoles";
import { UserRole } from "../users/user.types";
import { getAdminDashboard } from "./dashboard.controller";
import { getBorrowerDashboardData } from "./dashboard.controller";

const router = Router();

router.get(
    "/stats",
    authenticateUser,
    authorizeRoles(
        UserRole.ADMIN,
        UserRole.SALES,
        UserRole.SANCTION,
        UserRole.DISBURSEMENT,
        UserRole.COLLECTION
    ),
    getAdminDashboard
);

router.get(
    "/borrower",
    authenticateUser,
    authorizeRoles(UserRole.BORROWER),
    getBorrowerDashboardData
);

export default router;