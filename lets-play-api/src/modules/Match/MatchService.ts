import { MatchParticipants, PrismaClient, User } from '@prisma/client'
import { randomUUID } from "crypto";
import { MatchDto } from './MatchDto';

class MatchService {
    private prisma = new PrismaClient();

    async create(matchData: MatchDto) {
        const id = randomUUID();
        const description = matchData.description || '';

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
                console.log(participant);

                let part = await this.prisma.user.findFirst({ where: { 'nickname': participant } });

                if (!part) {
                    part = await this.prisma.user.create({
                        data: {
                            id: randomUUID(),
                            email: participant + '@' + 'example.com',
                            nickname: participant,
                            password: '123456'
                        }
                    });
                }

                await this.prisma.matchParticipants.create({ data: { id: randomUUID(), match_id: match.id, participant_id: part?.id } });
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
        let data: { participants: any[]; id: string; description: string | null; date: string; time: string; gameImage: string; gameTitle: string; voiceChannel: string; MatchParticipants: (MatchParticipants & { participant: User; })[]; }[] = [];
        let matches = [];

        if (date) {
            matches = await this.prisma.match.findMany({
                where: { date }, include: {
                    MatchParticipants: {
                        include: {
                            participant: true
                        }
                    },
                }
            });
        }

        matches = await this.prisma.match.findMany({
            include: {
                MatchParticipants: {
                    include: {
                        participant: true
                    }
                },
            }
        });

        matches?.forEach(async (item) => {
            let participants: any[] = [];

            item.MatchParticipants?.forEach((item_2) => {
                participants.push(item_2.participant.nickname);
            });

            data.push({
                ...item,
                participants,
            });
        });

        return data;
    }

    async update(id: string, updateMatchData: MatchDto) {
        const description = updateMatchData.description || '';

        const response = await this.prisma.match.update({
            where: { id },
            data: {
                date: updateMatchData.date,
                description,
                time: updateMatchData.time,
            }
        });

        if (updateMatchData.participants) {
            await this.prisma.matchParticipants.deleteMany({ where: { match_id: id } });

            updateMatchData.participants.forEach(async (participant) => {
                let part = await this.prisma.user.findFirst({ where: { 'nickname': participant } });

                if (!part) {
                    part = await this.prisma.user.create({
                        data: {
                            id: randomUUID(),
                            email: participant + '@' + 'example.com',
                            nickname: participant,
                            password: '123456'
                        }
                    });
                }

                await this.prisma.matchParticipants.create({ data: { id: randomUUID(), match_id: id, participant_id: part?.id } });
            });
        }

        return response;
    }

    async delete(id: string) {
        return await this.prisma.match.delete({ where: { id } });
    }

}


export const matchService = new MatchService();