import { Router } from "express";
import  glucoseController  from "../controllers/glucoseController";

const router = Router();

router.post("/glucose", glucoseController.saveReadings);
router.get("/glucose", glucoseController.getReadings);

export default router;