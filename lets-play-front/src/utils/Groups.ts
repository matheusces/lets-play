import { GroupProps } from "../types/type"
import { Leagues } from "./Leagues"
import { Tournaments } from "./Tournaments"
import { matchs } from "./matchs"

export let group: GroupProps = {
  id: '1',
  name: 'Grupo do CI',
  participants: ['Matheus', 'Kelvyn', 'Marcos', 'Luiggie'],
  matches: [matchs[0], matchs[1]],
  tournaments: [Tournaments[0]],
  leagues: [Leagues[0]]
}

export let groups: GroupProps[] =  [
  group
]