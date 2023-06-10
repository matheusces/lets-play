
export let Tournaments = [
  {
    id: '1',
    title: 'Torneio CS',
    game_img: 'https://s2.glbimg.com/h5m-VmkOra1ugbCPmL7eJxMkRJ8=/0x0:789x595/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/Y/T/zTFjLwQpKLXpXwZgIsCA/cover-cs16.png',
    game: 'Counter Strike',
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
    teams: [
      {
        id: 1,
        name: "Time 1",
        players: ['Matheus', 'Kelvyn']
      },
      {
        id: 2,
        name: "Time 2",
        players: ['Marcos', 'Luiggie']
      },
    ],
    matches: [
      {
        id: 'Time Finalista 1',
        name: 'Time Finalista 1',
        nextMatchId: 'Champion',
        nextLooserMatchId: undefined,
        tournamentRoundText: '2',
        startTime: 'Date time',
        state: 'DONE',
        participants: [
          {
            id: 'Time 1',
            resultText: null,
            isWinner: true,
            status: 'DONE',
            name: 'TBD',
          },
        ],
      },
      {
        id: 'Time Finalista 2',
        name: 'Time Finalista 2',
        nextMatchId: 'Champion',
        nextLooserMatchId: undefined,
        tournamentRoundText: '2',
        startTime: 'Date time',
        state: 'DONE',
        participants: [
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
        id: 'Champion',
        name: 'CHAMPION',
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
    ]
  },
]