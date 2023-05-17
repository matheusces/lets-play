import { Router } from "express";
import { userRoutes } from "./modules/User/routes";
import { matchRoutes } from "./modules/Match/routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/matches", matchRoutes);

export { router };