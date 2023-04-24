import { User } from "../../../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { CreateUserDto } from "./CreateUserDto";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, nickname, password }: CreateUserDto) {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      return "User alredy exists";
    }

    const user = new User({ email, nickname, password });

    return await this.userRepository.save(user);
  }
}
