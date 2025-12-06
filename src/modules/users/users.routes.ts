import { Router } from "express";
import { userController } from "./users.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get("/", auth("admin"), userController.getAllUsers);
router.put("/:id", auth("admin", "customer"), userController.updateUser);
router.delete("/:id", auth("admin"), userController.deleteUserById);

export const userRoutes = router;
