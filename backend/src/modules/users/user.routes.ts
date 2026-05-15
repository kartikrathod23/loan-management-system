import { Router } from "express";
import { getAdminData } from "./user.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";
import { authorizeRoles } from "../../middlewares/authorizeRoles";
import { UserRole } from "./user.types";

const router = Router();

router.get("/admin-data",authenticateUser,authorizeRoles(UserRole.ADMIN),getAdminData);

export default router;