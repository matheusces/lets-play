import { CreateUserUseCase } from "./CreateUserUseCase";
import { Request, Response } from "express";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response) {
    const { nickname, email, password } = request.body;

    try {
      const user = await this.createUserUseCase.execute({
        email,
        nickname,
        password,
      });

      return response.status(201).send(user);
    } catch (error) {
      return response.status(400).json({
        message: error || "Unexpected Error",
      });
    }
  }
}
