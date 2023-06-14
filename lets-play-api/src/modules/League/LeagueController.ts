import { Request, Response } from "express";
import { leagueService } from "./LeagueService";
import { LeagueDto } from "./LeagueDto";

class LeagueController {

    async create(request: Request, response: Response) {
        const { game, game_img, leagueSize, title, teams, participants } = request.body as LeagueDto;

        const resp = await leagueService.create({ game, game_img, leagueSize, title, teams, participants });

        return response.json(resp).status(201);
    }

    async get(request: Request, response: Response) {
        const { id } = request.params;
        const resp = await leagueService.get(id);

        return response.json(resp).status(200);
    }

    async getAll(request: Request, response: Response) {
        const resp = await leagueService.getAll();

        return response.json(resp).status(200);
    }

    async update(request: Request, response: Response) {

    }

    async delete(request: Request, response: Response) {

    }

}

export const leagueController = new LeagueController();