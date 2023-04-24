import { ImplementationUserRepository } from "../../repositories/ImplementationUserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const implementationUserRepository = new ImplementationUserRepository();

const createUserUseCase = new CreateUserUseCase(implementationUserRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
