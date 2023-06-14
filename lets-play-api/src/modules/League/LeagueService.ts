import { MatchParticipants, PrismaClient, User } from '@prisma/client'
import { randomUUID } from "crypto";
import { LeagueDto } from './LeagueDto';

class LeagueService {
    private prisma = new PrismaClient();

    async create(leagueData: LeagueDto) {
        const id = randomUUID();

        const league = await this.prisma.league.create({
            data: {
                id,
                game: leagueData.game,
                game_img: leagueData.game_img,
                leagueSize: leagueData.leagueSize,
                title: leagueData.title,
            },
        });

        if (leagueData.teams) {
            const nameTeams = Object.keys(leagueData.teams);

            leagueData.teams.forEach(async (team, index) => {
                let te = await this.prisma.team.findFirst({ where: { title: nameTeams[index] } });

                if (!te) {
                    te = await this.prisma.team.create({
                        data: {
                            id: randomUUID(),
                            draw: 0,
                            loses: 0,
                            points: 0,
                            win: 0,
                            title: nameTeams[index]
                        }
                    });
                }

                team?.forEach(async (participant: string) => {

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

                    await this.prisma.teamParticipants.create({
                        data: {
                            id: randomUUID(),
                            participant_id: part.id,
                            team_id: te ? te.id : '1',
                        }
                    });
                });
            });
        }

        return league;
    }

    async get(id: string) {
        return await this.prisma.league.findUnique({
            where: { id }
        });
    }

    async getAll() {
        const leagues = await this.prisma.league.findMany({
            include: {
                Teams: {
                    include: {
                        TeamParticipants: {
                            select: {
                                participant: {
                                    select: {
                                        nickname: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        return leagues;
    }

    async update(id: string, updateMatchData: LeagueDto) {

    }

    async delete(id: string) {
    }

}


export const leagueService = new LeagueService();