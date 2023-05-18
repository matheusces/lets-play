import { Router } from "express";
import { matchController } from "./MatchController";

const matchRoutes = Router();

matchRoutes.post("/", matchController.create);
matchRoutes.get("/", matchController.getAll);
matchRoutes.get("/:id", matchController.get);
matchRoutes.put("/:id", matchController.update);
matchRoutes.delete("/:id", matchController.delete);

export { matchRoutes };