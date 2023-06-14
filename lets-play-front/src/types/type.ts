import { Match } from "@g-loot/react-tournament-brackets/dist/src/types";

export interface TeamInfoProps {
  id: number;
  name: string;
  players: string[];
}

export interface TournamentProps {
  id: string;
  title: string;
  game_img: string;
  game: string;
  tournamentSize: number;
  participants: ParticipantProps[];
  teams: TeamInfoProps[];
  matches: Match[];
}

export interface LeagueProps {
  id: string;
  title: string;
  game_img: string;
  game: string;
  leagueSize: number;
  participants: ParticipantProps[];
  teams: {
    [team: string]: string[];
  };
}

export interface ParticipantProps {
  name: string;
  team: string;
}

export interface GameProps {
  "id": number;
  "slug": string;
  "name": string;
  "background_image": string;
  "rating": number;
  "suggestions_count": number;
}

export interface MatchProps {
  id: string;
  game: string;
  date: string;
  time: string;
  participants: string[];
  voiceChannel: string;
  description: string;
  gameImage?: string;
}

export interface GroupProps {
  id: string;
  name: string;
  participants: string[];
  matches: MatchProps[];
  leagues: LeagueProps[];
  tournaments: TournamentProps[];
}