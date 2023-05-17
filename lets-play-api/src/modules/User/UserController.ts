import { Request, Response } from "express";
import { UserDto } from "./UserDto";
import { UserService } from "./UserService";

class UserController {
    private userService = new UserService();

    async create(request: Request, response: Response) {
        const { nickname, email, password, photo } = request.body as UserDto;

        const resp = await this.userService.create({
            email,
            nickname,
            password,
            photo,
        });

        return response.json(resp).status(201);
    }

    async get(request: Request, response: Response) {
        const { id } = request.params;
        const resp = await this.userService.get(id);

        return response.json(resp).status(200);
    }

    async getAll(request: Request, response: Response) {
        const resp = await this.userService.getAll();

        return response.json(resp).status(200);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { nickname, email, photo } = request.body as UserDto;
        const resp = await this.userService.update(id, { nickname, email, photo });

        return response.json(resp).status(200);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const resp = await this.userService.delete(id);

        return response.json(resp).status(200);
    }

}

export const userController = new UserController();