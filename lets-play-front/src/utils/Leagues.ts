export interface LeagueProps {
  id: string;
  title: string;
  game_img: string;
  game: string;
  leagueSize: number;
  participants: participantProps[];
  teams: {
    team: string;
    players: string[];
  };
}

interface participantProps {
  name: string;
  team: string;
}

export let Leagues = [
  {
    id: '1',
    title: 'Premier League',
    game_img: '',
    game: 'Fifa 22',
    leagueSize: 4,
    participants: [
      {
        name: 'Matheus',
        team: 'Time 1'
      },
      {
        name: 'Kelvyn',
        team: 'Time 2'
      },
      {
        name: 'Marcos',
        team: 'Time 3'
      },
      {
        name: 'Luiggie',
        team: 'Time 4'
      }
    ],
    teams: {
      'Time 1': ['Matheus'],
      'Time 2': ['Kelvyn'],
      'Time 3': ['Luiggie'],
      'Time 4': ['Marcos'],
    }
  }
]