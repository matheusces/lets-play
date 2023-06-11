import { useState, useEffect } from 'react';
import { Leagues } from "../utils/Leagues";

import { LeagueProps } from "../types/type";

import trophyIcon from "../assets/trophy_grad.svg";
import tableIcon from '../assets/table.svg';
import participantsIcon from '../assets/participants.svg';
import wasteBinIcon from '../assets/waste-bin.svg';

interface LeaguesListProps {
  toggleIsLeagueSelected: () => void;
  setSelectedLeagueID: React.Dispatch<React.SetStateAction<string>>;
}

function LeaguesList({ toggleIsLeagueSelected, setSelectedLeagueID }: LeaguesListProps) {
  const [leagueList, setLeagueList] = useState<LeagueProps[]>();
  const [isLoading, setIsLoading] = useState(true);

  function handleSelecLeague(leagueID: string){
    toggleIsLeagueSelected();
    setSelectedLeagueID(leagueID);
  }

  function handleRemoveLeague(leagueID: string){
    const newLeagueList = leagueList?.filter(league => league.id !== leagueID);
    setLeagueList(newLeagueList);
    Leagues.splice(Leagues.findIndex(league => league.id === leagueID), 1);
  }

  useEffect(() => {
    setLeagueList(Leagues);
    setIsLoading(false);
  }, [Leagues]);

  useEffect(() => {
    setIsLoading(true);
    setLeagueList(Leagues);
    setIsLoading(false);
  }, [leagueList]);

  return (
    <>
      { isLoading ? ( 
        <h1>Loading...</h1>
      ) : (
          Leagues.map((league) => (
            <div className='flex gap-2'>
              <button key={league.id} className="w-[40rem] h-16 bg-panel-item rounded-lg flex items-center justify-between p-4 text-xl text-white font-outline-1 gap-2 hover:drop-shadow-secondary" onClick={() => handleSelecLeague(league.id)}>
                <img className="w-10 h-10" src={trophyIcon} alt="Icone de um Troféu" />
                <div className="flex flex-col">
                  <span>{league.title}</span>
                  <span className="text-xs text-primary font-outline-0">{league.game}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <img className="w-9 h-9" src={tableIcon} alt="estrutura de uma liga" title="Tamanho do torneio" />
                    <span>{league.leagueSize}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <img className="w-10 h-10" src={participantsIcon} alt="icone de participantes" title="Quantidade de participantes neste torneio" />
                    <span>{league.participants.length}</span>
                  </div>
                </div>
              </button>
              <button className='w-12 h-12 self-center p-1 text-xl bg-panel text-secondary rounded-full hover:drop-shadow-secondary' onClick={() => handleRemoveLeague(league.id)}>
                <img src={wasteBinIcon} alt="" />
              </button>
            </div>
          )
        )
      )
      }
    </>
  )
}

export default LeaguesList