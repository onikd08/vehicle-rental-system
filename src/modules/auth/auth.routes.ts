import { Router } from "express";
import { authConroller } from "./auth.controller";

const router = Router();

router.post("/signup", authConroller.userRegistration);
router.post("/signin", authConroller.userLogin);

export const authRoutes = router;
