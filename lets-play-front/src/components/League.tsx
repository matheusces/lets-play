import { Leagues, LeagueProps } from '../utils/Leagues';
import { useEffect, useState } from 'react';

interface ComponentLeagueProps {
  leagueID: string;
  toggleIsLeagueSelected: () => void;
}

function League({ leagueID, toggleIsLeagueSelected }: ComponentLeagueProps) {
  const [league, setLeague] = useState<LeagueProps>({} as LeagueProps);

  useEffect(() => {
    const fetchedLeague = Leagues.find(league => league.id === leagueID);
    setLeague(fetchedLeague);
  }, [leagueID]);


  return (
    <div className="w-full h-full flex justify-evenly">
      <div className='w-2/3 h-full'>
        <h1>{league.title}</h1>
        
        <div className="w-full h-full bg-panel-item rounded-lg flex flex-col items-start justify-start py-4 px-2 text-xl text-white font-outline-1 gap-2 hover:drop-shadow-secondary">
          <div className='w-full h-fit text-sm flex justify-between px-2'>
            <span className='w-44 text-start '>Participantes</span>
            <span>V</span>
            <span>E</span>
            <span>D</span>
            <span>P</span>
          </div>
          <div className='w-full h-full flex flex-col gap-1 overflow-scroll hide-scroll-bar'>
            {league.participants.map(participant => (
              <div className='w-full h-fit text-sm flex justify-between text-secondary font-outline-0 hover:drop-shadow-primary hover:bg-highlight rounded-lg px-2'>
                <span className='w-44 text-start '>{participant.name}</span>
                <span>3</span>
                <span>2</span>
                <span>1</span>
                <span>11</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='w-1/3 h-full flex justify-center'>
        <span>{league.game}</span>
        <button className='w-fit h-fit rounded-lg p-2 hover:drop-shadow-primary bg-primary text-white' onClick={toggleIsLeagueSelected}>Voltar</button>
      </div>
    </div>
  )
}

export default League