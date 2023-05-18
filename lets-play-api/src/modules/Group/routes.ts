import { Router } from "express";
import { groupController } from "./GroupController";

const groupRoutes = Router();

groupRoutes.post("/", groupController.create);
groupRoutes.get("/", groupController.getAll);
groupRoutes.get("/:id", groupController.get);
groupRoutes.put("/:id", groupController.update);
groupRoutes.delete("/:id", groupController.delete);

export { groupRoutes };