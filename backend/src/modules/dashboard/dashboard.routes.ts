import { Router } from "express";
import { authenticateUser } from "../../middlewares/auth.middleware";
import { authorizeRoles } from "../../middlewares/authorizeRoles";
import { UserRole } from "../users/user.types";
import { getAdminDashboard } from "./dashboard.controller";
import { getBorrowerDashboardData } from "./dashboard.controller";

const router = Router();

router.get(
    "/admin",
    authenticateUser,
    authorizeRoles(UserRole.ADMIN),
    getAdminDashboard
);

router.get(
    "/borrower",
    authenticateUser,
    authorizeRoles(UserRole.BORROWER),
    getBorrowerDashboardData
);

export default router;