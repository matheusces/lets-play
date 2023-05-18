import { UserDto } from "./UserDto";
import { PrismaClient } from '@prisma/client'
import { randomUUID } from "crypto";
import bcrypt from 'bcrypt';

export class UserService {
    private prisma = new PrismaClient();

    async create(userData: UserDto) {
        if (!userData.password) {
            return {
                type: 'error',
                message: "password is required",
            };
        }

        const hash = await bcrypt.hash(userData.password, process.env.SALTS || 10);
        const id = randomUUID();

        return await this.prisma.user.create({
            data: {
                id,
                email: userData.email,
                nickname: userData.nickname,
                password: hash,
            },
        });
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({ where: { email } });

        if (!user) {
            return {
                type: "error",
                message: "Wrong email or password",
            }
        }

        bcrypt.compare(password, user.password).then(() => {
            return user;
        }).catch(() => {
            return {
                type: "error",
                message: "Wrong email or password",
            }
        })
    }

    async get(id: string) {
        return await this.prisma.user.findUnique({
            where: { id }
        });
    }

    async getAll() {
        return await this.prisma.user.findMany();
    }

    async update(id: string, updateUserData: UserDto) {
        return await this.prisma.user.update({
            where: { id },
            data: {
                email: updateUserData.email,
                nickname: updateUserData.nickname,
            }
        })
    }

    async delete(id: string) {
        return await this.prisma.user.delete({ where: { id } });
    }

}
