import { User } from "../../../entities/User";
import { IUserRepository } from "./IUserRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ImplementationUserRepository implements IUserRepository {
  find(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) return null;

    return new User(
      {
        email: user.email,
        nickname: user.nickname,
        password: user.password,
      },
      user.id
    );
  }

  async save(user: User): Promise<User | null> {
    console.log(user);
    await prisma.user.create({
      data: {
        id: user._id || "",
        nickname: user.nickname,
        email: user.email,
        password: user.password,
      },
    });

    return user;
  }
}
