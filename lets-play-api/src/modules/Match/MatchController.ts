import { Request, Response } from "express";
import { MatchService } from "./MatchService";
import { MatchDto } from "./MatchDto";

class MatchController {
    private matchService = new MatchService();

    async create(request: Request, response: Response) {
        const { date, description, time } = request.body as MatchDto;

        const resp = await this.matchService.create({
            date, time, description
        });

        return response.json(resp).status(201);
    }

    async get(request: Request, response: Response) {
        const { id } = request.params;
        const resp = await this.matchService.get(id);

        return response.json(resp).status(200);
    }

    async getAll(request: Request, response: Response) {
        const resp = await this.matchService.getAll();

        return response.json(resp).status(200);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { date, time, description } = request.body as MatchDto;
        const resp = await this.matchService.update(id, { date, time, description });

        return response.json(resp).status(200);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const resp = await this.matchService.delete(id);

        return response.json(resp).status(200);
    }

}

export const matchController = new MatchController();