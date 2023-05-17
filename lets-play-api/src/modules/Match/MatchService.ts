import { PrismaClient } from '@prisma/client'
import { randomUUID } from "crypto";
import { MatchDto } from './MatchDto';

export class MatchService {
    private prisma = new PrismaClient();

    async create(matchData: MatchDto) {
        const id = randomUUID();
        const description = matchData.description || '';

        return await this.prisma.match.create({
            data: {
                id,
                date: matchData.date,
                description,
                time: matchData.time,
            },
        });
    }

    async get(id: string) {
        return await this.prisma.match.findUnique({
            where: { id }
        });
    }

    async getAll() {
        return await this.prisma.match.findMany();
    }

    async update(id: string, updateMatchData: MatchDto) {
        const description = updateMatchData.description || '';

        return await this.prisma.match.update({
            where: { id },
            data: {
                date: updateMatchData.date,
                description,
                time: updateMatchData.time,
            }
        })
    }

    async delete(id: string) {
        return await this.prisma.match.delete({ where: { id } });
    }

}
