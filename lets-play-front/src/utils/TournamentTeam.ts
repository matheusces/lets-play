export class TournamentTeam {
  id: number;
  name: string;
  players: string[];
  position: string;

  constructor(id: number, name: string, players: string[], position: string) {
    this.id = id;
    this.name = name;
    this.players = players;
    this.position = position;
  }
}
