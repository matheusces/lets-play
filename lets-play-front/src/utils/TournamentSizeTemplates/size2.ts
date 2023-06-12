import { Match } from "@g-loot/react-tournament-brackets/dist/src/types";

export const size2: Match[] =  [
  {
    id: 'Time 1',
    name: 'Time Finalista',
    nextMatchId: 'Champion',
    nextLooserMatchId: undefined,
    tournamentRoundText: '2',
    startTime: 'Date time',
    state: 'DONE',
    participants: [
      {
        id: '1',
        resultText: null,
        isWinner: false,
        status: 'DONE',
        name: 'TBD',
      },
    ],
  },
  {
    id: 'Time 2',
    name: 'Time Finalista',
    nextMatchId: 'Champion',
    nextLooserMatchId: undefined,
    tournamentRoundText: '2',
    startTime: 'Date time',
    state: 'DONE',
    participants: [
      {
        id: 'NULL',
        resultText: null,
        isWinner: false,
        status: 'PLAYED',
        name: '',
      },
      {
        id: '2',
        resultText: null,
        isWinner: false,
        status: 'DONE',
        name: 'TBD',
      },
    ],
  },
  {
    id: 'Champion',
    name: 'CHAMPION',
    nextMatchId: null,
    nextLooserMatchId: undefined,
    tournamentRoundText: '3',
    startTime: 'Date time',
    state: 'DONE',
    participants: [
      {
        id: '',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'CHAMPION',
      }
    ],
  },
];

