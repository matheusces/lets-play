import { Router } from "express";
import { userController } from "./UserController";

const userRoutes = Router();

userRoutes.post("/", userController.create);
userRoutes.get("/", userController.getAll);
userRoutes.get("/:id", userController.get);
userRoutes.put("/:id", userController.update);
userRoutes.delete("/:id", userController.delete);

export { userRoutes };