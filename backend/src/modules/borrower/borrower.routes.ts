import { Router } from "express";
import { createProfile } from "./borrower.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";
import { authorizeRoles } from "../../middlewares/authorizeRoles";
import { UserRole } from "../users/user.types";

const router = Router();
router.post("/profile",authenticateUser,authorizeRoles(UserRole.BORROWER),createProfile);

export default router;