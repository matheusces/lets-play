import { UserDto } from "./UserDto";
import { PrismaClient } from '@prisma/client'
import { randomUUID } from "crypto";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Response } from "express";
dotenv.config();

class UserService {
    private prisma = new PrismaClient();

    async create(userData: UserDto) {
        try {
            if (!userData.password) {
                return {
                    type: 'error',
                    message: "password is required",
                };
            }

            const hash = await bcrypt.hash(userData.password, 10);
            const id = randomUUID();

            return await this.prisma.user.create({
                data: {
                    id,
                    email: userData.email,
                    nickname: userData.nickname,
                    password: hash,
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({ where: { email } });
        if (!user) {
            return {
                type: "error",
                message: "Wrong email or password",
            };
        }

        console.log(user);
        console.log(password, email);


        if (bcrypt.compareSync(password, user.password)) {
            return user;
        }


        return {
            type: "error",
            message: "Wrong email or password",
        };
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

export const userService = new UserService();