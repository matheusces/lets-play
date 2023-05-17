import { PrismaClient } from '@prisma/client'
import { randomUUID } from "crypto";
import { GroupDto } from './GroupDto';

export class GroupService {
    private prisma = new PrismaClient();

    async create(groupData: GroupDto) {
        const id = randomUUID();
        const description = groupData.description || '';

        return await this.prisma.group.create({
            data: {
                id,
                name: groupData.name,
                description,
            },
        });
    }

    async get(id: string) {
        return await this.prisma.group.findUnique({
            where: { id }
        });
    }

    async getAll() {
        return await this.prisma.group.findMany();
    }

    async update(id: string, updateGroupData: GroupDto) {
        const description = updateGroupData.description || '';

        return await this.prisma.group.update({
            where: { id },
            data: {
                name: updateGroupData.name,
                description,
            }
        })
    }

    async delete(id: string) {
        return await this.prisma.group.delete({ where: { id } });
    }

}
