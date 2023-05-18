import { Request, Response } from "express";
import { UserDto } from "./UserDto";
import { userService } from "./UserService";

class UserController {

    async create(request: Request, response: Response) {
        const { nickname, email, password, photo } = request.body as UserDto;

        const resp = await userService.create({
            email,
            nickname,
            password,
            photo,
        });

        return response.json(resp).status(201);
    }

    async login(request: Request, response: Response) {
        const { email, password } = request.body;

        const resp = await userService.login(email, password);

        return response.json(resp).status(200);
    }

    async get(request: Request, response: Response) {
        const { id } = request.params;
        const resp = await userService.get(id);

        return response.json(resp).status(200);
    }

    async getAll(request: Request, response: Response) {
        const resp = await userService.getAll();

        return response.json(resp).status(200);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { nickname, email, photo } = request.body as UserDto;
        const resp = await userService.update(id, { nickname, email, photo });

        return response.json(resp).status(200);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const resp = await userService.delete(id);

        return response.json(resp).status(200);
    }

}

export const userController = new UserController();