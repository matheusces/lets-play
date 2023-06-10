import { Match } from "@g-loot/react-tournament-brackets/dist/src/types";

export let tournamentMatches: Match[] =  [
  {
    id: 20464,
    name: 'Time Finalista',
    nextMatchId: 20463,
    nextLooserMatchId: undefined,
    tournamentRoundText: '2',
    startTime: 'Date time',
    state: 'DONE',
    participants: [
      {
        id: '1',
        resultText: null,
        isWinner: true,
        status: 'DONE',
        name: 'TBD',
      },
    ],
  },
  {
    id: 20467,
    name: 'Time Finalista',
    nextMatchId: 20463,
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
    id: 20463,
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

