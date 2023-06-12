import { useState, useEffect } from 'react';

import Overlay from './Overlay';

import { LeagueProps } from "../types/type";

import trophyIcon from "../assets/trophy_grad.svg";
import tableIcon from '../assets/table.svg';
import participantsIcon from '../assets/participants.svg';
import wasteBinIcon from '../assets/waste-bin.svg';
import Confirmation from './Confirmation';

interface LeaguesListProps {
  leagues: LeagueProps[];
}

function GroupLeaguesList({ leagues }: LeaguesListProps) {
  const [leagueList, setLeagueList] = useState<LeagueProps[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmationWindowActive, setIsConfirmationWindowActive] = useState(false);
  const [leagueIDToDelete, setLeagueIDToDelete] = useState('');

  // function handleSelecLeague(leagueID: string){
  //   toggleIsLeagueSelected();
  //   setSelectedLeagueID(leagueID);
  // }

  function handleRemoveLeague(leagueID: string){
    const newLeagueList = leagueList?.filter(league => league.id !== leagueID);
    setLeagueList(newLeagueList);
    leagues.splice(leagues.findIndex(league => league.id === leagueID), 1);
  }

  function handleDelete(id: string){
    setLeagueIDToDelete(id);
    toggleConfirmationWindow();
  }

  function toggleConfirmationWindow(){
    setIsConfirmationWindowActive(!isConfirmationWindowActive);
  }

  useEffect(() => {
    setLeagueList(leagues);
    setIsLoading(false);
  }, [leagues]);

  useEffect(() => {
    setIsLoading(true);
    setLeagueList(leagues);
    setIsLoading(false);
  }, [leagueList]);

  return (
    <>
      { isLoading ? ( 
        <h1>Loading...</h1>
      ) : (
          leagueList?.map((league) => (
            <>
              <div key={league.id} className='flex gap-2 pt-10'>
                <button key={league.id} className="w-[40rem] h-16 bg-panel-item rounded-lg flex items-center justify-between p-4 text-xl text-white font-outline-1 gap-2 hover:drop-shadow-secondary">
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
                <button className='w-12 h-12 self-center p-1 text-xl bg-panel text-secondary rounded-full hover:drop-shadow-secondary' onClick={() => handleDelete(league.id)}>
                  <img src={wasteBinIcon} alt="" />
                </button>
              </div>
            </>
          ))
        )
      }
      {
        isConfirmationWindowActive && (
        <>
          <Confirmation action="excluir a liga" onConfirm={() => handleRemoveLeague(leagueIDToDelete)} toggleConfirmation={toggleConfirmationWindow} />
          <Overlay onClick={toggleConfirmationWindow} />
        </>
      )}
    </>
  )
}

export default GroupLeaguesList