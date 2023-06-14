import { Request, Response } from "express";
import { matchService } from "./MatchService";
import { MatchDto } from "./MatchDto";

class MatchController {

    async create(request: Request, response: Response) {
        const { date, description, time, gameImage, gameTitle, participants, voiceChannel } = request.body as MatchDto;

        const resp = await matchService.create({
            date, time, description, gameImage, gameTitle, participants, voiceChannel
        });

        return response.json(resp).status(201);
    }

    async get(request: Request, response: Response) {
        const { id } = request.params;
        const resp = await matchService.get(id);

        return response.json(resp).status(200);
    }

    async getAll(request: Request, response: Response) {
        const { date } = request.params;

        const resp = await matchService.getAll(date);

        return response.json(resp).status(200);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { date, time, description, gameImage, gameTitle, participants, voiceChannel } = request.body as MatchDto;
        const resp = await matchService.update(id, { date, time, description, gameImage, gameTitle, participants, voiceChannel });

        return response.json(resp).status(200);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const resp = await matchService.delete(id);

        return response.json(resp).status(200);
    }

}

export const matchController = new MatchController();