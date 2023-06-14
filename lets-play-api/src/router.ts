import { Router } from "express";
import { userRoutes } from "./modules/User/routes";
import { matchRoutes } from "./modules/Match/routes";
import { leagueRoutes } from "./modules/League/routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/matches", matchRoutes);
router.use("/leagues", leagueRoutes);

export { router };