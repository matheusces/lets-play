import { Router } from "express";
import { leagueController } from "./LeagueController";

const leagueRoutes = Router();

leagueRoutes.post("/", leagueController.create);
leagueRoutes.get("/:date", leagueController.getAll);
leagueRoutes.get("/:id", leagueController.get);
leagueRoutes.put("/:id", leagueController.update);
leagueRoutes.delete("/:id", leagueController.delete);

export { leagueRoutes };