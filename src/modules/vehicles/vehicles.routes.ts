import { Router } from "express";
import { vehicleController } from "./vehicles.controller";

const router = Router();

router.get("/", vehicleController.getAllVehicles);
router.get("/:id", vehicleController.getVehicleById);
router.post("/", vehicleController.addNewVehicle);
router.put("/:id", vehicleController.updateVehicleById);
router.delete("/:id", vehicleController.deleteVehicleById);

export const vehicleRoutes = router;
