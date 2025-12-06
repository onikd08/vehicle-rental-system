import { Router } from "express";
import { vehicleController } from "./vehicles.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get("/", vehicleController.getAllVehicles);
router.get("/:id", vehicleController.getVehicleById);
router.post("/", auth("admin"), vehicleController.addNewVehicle);
router.put("/:id", auth("admin"), vehicleController.updateVehicleById);
router.delete("/:id", auth("admin"), vehicleController.deleteVehicleById);

export const vehicleRoutes = router;
