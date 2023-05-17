import { Request, Response } from "express";
import { GroupService } from "./GroupService";
import { GroupDto } from "./GroupDto";

class GroupController {
    private groupService = new GroupService();

    async create(request: Request, response: Response) {
        const { description, name } = request.body as GroupDto;

        const resp = await this.groupService.create({ name, description });

        return response.json(resp).status(201);
    }

    async get(request: Request, response: Response) {
        const { id } = request.params;
        const resp = await this.groupService.get(id);

        return response.json(resp).status(200);
    }

    async getAll(request: Request, response: Response) {
        const resp = await this.groupService.getAll();

        return response.json(resp).status(200);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name, description } = request.body as GroupDto;
        const resp = await this.groupService.update(id, { name, description });

        return response.json(resp).status(200);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const resp = await this.groupService.delete(id);

        return response.json(resp).status(200);
    }

}

export const groupController = new GroupController();