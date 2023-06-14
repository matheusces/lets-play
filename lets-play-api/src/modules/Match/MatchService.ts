import { MatchParticipants, PrismaClient } from '@prisma/client'
import { randomUUID } from "crypto";
import { MatchDto } from './MatchDto';

class MatchService {
    private prisma = new PrismaClient();

    async create(matchData: MatchDto) {
        const id = randomUUID();
        const description = matchData.description || '';
        const verifiedParticipants: MatchParticipants[] = [];

        const match = await this.prisma.match.create({
            data: {
                id,
                date: matchData.date,
                gameImage: matchData.gameImage,
                gameTitle: matchData.gameTitle,
                voiceChannel: matchData.voiceChannel,
                description,
                time: matchData.time,
            },
        });

        if (matchData.participants) {
            matchData.participants.forEach(async (participant) => {
                let part = await this.prisma.user.findFirst({ where: { 'nickname': participant } });

                if (part) {
                    verifiedParticipants.push({ id: randomUUID(), match_id: match.id, participant_id: part?.id });
                } else {
                    part = await this.prisma.user.create({
                        data: {
                            id: randomUUID(),
                            email: '',
                            nickname: participant,
                            password: '123456'
                        }
                    });
                }
            });
        }

        return match;
    }

    async get(id: string) {
        return await this.prisma.match.findUnique({
            where: { id }
        });
    }

    async getAll(date: string) {
        if (date) {
            return await this.prisma.match.findMany({ where: { date } });
        }

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


export const matchService = new MatchService();