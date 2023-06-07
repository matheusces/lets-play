import { participantProps } from "./Leagues";

export interface TournamentProps {
  id: string;
  title: string;
  game_img: string;
  game: string;
  tournamentSize: number;
  participants: participantProps[];
  teams: {
    [team: string]: string[];
  };
}

export let Tournaments = [
  {
    id: '1',
    title: 'Torneio CS',
    game_img: '',
    game: 'Counter Striker',
    tournamentSize: 2,
    participants: [
      {
        name: 'Matheus',
        team: 'Time 1'
      },
      {
        name: 'Kelvyn',
        team: 'Time 1'
      },
      {
        name: 'Marcos',
        team: 'Time 2'
      },
      {
        name: 'Luiggie',
        team: 'Time 2'
      }
    ],
    teams: {
      'Time 1': ['Matheus', 'Kelvyn'],
      'Time 2': ['Marcos', 'Luiggie'],
    }
  },
  {
    id: '1',
    title: 'Torneio CS',
    game_img: '',
    game: 'Counter Striker',
    tournamentSize: 2,
    participants: [
      {
        name: 'Matheus',
        team: 'Time 1'
      },
      {
        name: 'Kelvyn',
        team: 'Time 1'
      },
      {
        name: 'Marcos',
        team: 'Time 2'
      },
      {
        name: 'Luiggie',
        team: 'Time 2'
      }
    ],
    teams: {
      'Time 1': ['Matheus', 'Kelvyn'],
      'Time 2': ['Marcos', 'Luiggie'],
    }
  },
  {
    id: '1',
    title: 'Torneio CS',
    game_img: '',
    game: 'Counter Striker',
    tournamentSize: 2,
    participants: [
      {
        name: 'Matheus',
        team: 'Time 1'
      },
      {
        name: 'Kelvyn',
        team: 'Time 1'
      },
      {
        name: 'Marcos',
        team: 'Time 2'
      },
      {
        name: 'Luiggie',
        team: 'Time 2'
      }
    ],
    teams: {
      'Time 1': ['Matheus', 'Kelvyn'],
      'Time 2': ['Marcos', 'Luiggie'],
    }
  },
]