import { Match } from "@g-loot/react-tournament-brackets/dist/src/types";

export const size4: Match[] =  [
  {
    id: 20464,
    name: 'Semi Final - Match 1',
    nextMatchId: 20463,
    nextLooserMatchId: undefined,
    tournamentRoundText: '2',
    startTime: 'Date time',
    state: 'WALK_OVER',
    participants: [
      {
        id: '9fd1f0e6-eb92-4159-a96d-6657fbdd963e',
        resultText: null,
        isWinner: false,
        status: 'PLAYED',
        name: 'SEMI-FINALIST 1',
      },
      {
        id: 'a504c49a-e9b2-4a2e-b4b8-a2c11651c356',
        resultText: null,
        isWinner: false,
        status: 'PLAYED',
        name: 'BTC',
      },
    ],
  },
  {
    id: 20467,
    name: 'Semi Final - Match 2',
    nextMatchId: 20463,
    nextLooserMatchId: undefined,
    tournamentRoundText: '2',
    startTime: 'Date time',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'b9a3cc7a-95d9-483a-b515-f24bd0531f45',
        resultText: null,
        isWinner: false,
        status: 'PLAYED',
        name: 'SEMI-FINALIST 2',
      },
      {
        id: '1d11ce35-de11-49de-b48e-cec5427eb82c',
        resultText: null,
        isWinner: false,
        status: 'PLAYED',
        name: 'Alex',
      },
    ],
  },
  {
    id: 20463,
    name: 'Final - Match',
    nextMatchId: null,
    nextLooserMatchId: undefined,
    tournamentRoundText: '3',
    startTime: 'Date time',
    state: 'DONE',
    participants: [
      {
        id: '9fd1f0e6-eb92-4159-a96d-6657fbdd963e',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'CHAMPION',
      }
    ],
  },
];

