import { TournamentProps } from "../types/type";

interface TournamentMatchManagerProps {
  tournament: TournamentProps;
  setTournament: React.Dispatch<React.SetStateAction<TournamentProps>>;
  toggleMatchManager: () => void;
}

function TournamentMatchManager({ tournament, setTournament, toggleMatchManager }: TournamentMatchManagerProps) {

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

  return (
      <div className="w-[47rem] h-[500px] flex flex-col gap-2 p-4 absolute rounded-md items-center bg-overlay">
        <div className="w-full flex justify-end">
          <button className="w-44 h-fit p-2 bg-primary rounded-md text-white" onClick={toggleMatchManager}>voltar</button>
        </div>
        <div className="w-full h-full flex flex-col justify-center bg-panel overflow-scroll hide-scroll-bar">
          { tournament.matches.map((match) => (
              match.participants.map((participant, index) => (
                <div key={index} className="w-full h-fit flex justify-between items-center p-2 rounded-lg hover:bg-panel hover:drop-shadow-primary">
                  <span>{match.id}</span>
                  <select className='w-86 h-8 self-start rounded-lg bg-panel px-1 text-secondary text-sm focus:border-secondary' onChange={(e) => handleChangeLabel(e.target.value, match.id)}>
                    <option value="">Escolha um time</option>
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
        </div>
      </div>
  )
}

export default TournamentMatchManager