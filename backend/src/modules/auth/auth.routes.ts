import { Router } from "express";
import {getCurrentUser,login,logout,signup,} from "./auth.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/me",authenticateUser,getCurrentUser);


export default router;