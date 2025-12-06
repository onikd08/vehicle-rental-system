import { Router } from "express";
import { userController } from "./users.controller";

const router = Router();

router.get("/", userController.getAllUsers); // admin only
router.put("/:id", userController.updateUser); // admin and user
router.delete("/:id", userController.deleteUserById); // admin only

export const userRoutes = router;
