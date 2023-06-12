import { Match } from "@g-loot/react-tournament-brackets/dist/src/types";

export const size4: Match[] =  [
  {
    id: 'Match 1',
    name: 'Match 1',
    nextMatchId: 'Champion',
    nextLooserMatchId: undefined,
    tournamentRoundText: '2',
    startTime: 'Date time',
    state: 'DONE',
    participants: [
      {
        id: 'Time 1',
        resultText: null,
        isWinner: false,
        status: 'DONE',
        name: 'TBD',
      },
      {
        id: 'Time 2',
        resultText: null,
        isWinner: false,
        status: 'DONE',
        name: 'TBD',
      },
    ],
  },
  {
    id: 'Match 2',
    name: 'Match 2',
    nextMatchId: 'Champion',
    nextLooserMatchId: undefined,
    tournamentRoundText: '2',
    startTime: 'Date time',
    state: 'DONE',
    participants: [
      {
        id: 'Time 3',
        resultText: null,
        isWinner: false,
        status: 'DONE',
        name: 'TBD',
      },
      {
        id: 'Time 4',
        resultText: null,
        isWinner: false,
        status: 'DONE',
        name: 'TBD',
      },
    ],
  },
  {
    id: 'Champion',
    name: 'Champion',
    nextMatchId: null,
    nextLooserMatchId: undefined,
    tournamentRoundText: '3',
    startTime: 'Date time',
    state: 'DONE',
    participants: [
      {
        id: 'Champion',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'CHAMPION',
      }
    ],
  },
];

