import { Router } from "express";
import smsController from "../controllers/smsController";

const router = Router();

router.post("/messages", smsController.sendSMS);

export default router;
