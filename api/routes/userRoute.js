import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();

// Routes
router.post("/register", userController.register);
// router.get("/api/auth/users", userController.listUsers);
// router.get("/api/auth/users/:id", userController.listOneUser);
// router.delete("/api/auth/users/:id", userController.deleteUser);
// router.patch("/api/auth/users/:id", userController.updateUser);


export default router;
