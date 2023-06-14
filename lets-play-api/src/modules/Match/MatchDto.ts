export interface MatchDto {
    gameTitle: string;
    gameImage: string,
    voiceChannel: string,
    participants: string[],
    description?: string;
    date: Date;
    time: string;
}