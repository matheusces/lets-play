import { TournamentProps } from "../types/type";

interface TournamentTeamManagerProps {
  tournament: TournamentProps;
  setTournament: React.Dispatch<React.SetStateAction<TournamentProps>>;
}

function TournamentTeamManager({ tournament, setTournament }: TournamentTeamManagerProps) {

  function handleChangeLabel(team: string, matchId: string | number) {
    
    setTournament((prevTournament) => {
      let matches = prevTournament.matches;
      let newMatch = matches.find(match => match.id === matchId);
      
      if (newMatch) {
        newMatch.participants[0].name = [team];
      }

      matches.map(match => match.id === matchId ? newMatch : match);

      const updatedMatches = matches;
      const newTournament = { ...prevTournament, updatedMatches };
      return newTournament;
    });
  }

  function handleChangeTeamPosition(teamIndex: number, position: string) {
    setTournament((prevTournament) => {
      const newTournament = { ...prevTournament };
      newTournament.teams[teamIndex].position = position;
      return newTournament;
    });
  }
  
  return (
    <>
      { tournament.matches.map((match) => (
          match.participants.map((participant, index) => (
            <div key={index} className="w-full h-fit flex justify-between items-center p-2 rounded-lg hover:bg-panel hover:drop-shadow-primary">
              <span>{match.name}</span>
              <select className='w-86 h-8 self-start rounded-lg bg-panel px-1 text-secondary text-sm focus:border-secondary' onChange={(e) => handleChangeLabel(e.target.value, match.id)}>
                <option value="TBD">TBD</option> 
                {
                  tournament.teams.map((team, index) => (
                    <option className="w-44 flex" key={index} value={team.players.join(', ')}>{team.players.join(', ')}</option>
                  ))
                }
              </select>
            </div>
          ))
        )
      )}
    </>
  )
}

export default TournamentTeamManager