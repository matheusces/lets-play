import { useState, useEffect } from 'react';
import Confirmation from './Confirmation';
import Overlay from './Overlay';

import { TournamentProps } from '../types/type';

import trophyIcon2 from "../assets/trophy_gold.svg";
import tournamentIcon from '../assets/match.png';
import participantsIcon from '../assets/participants.svg';
import wasteBinIcon from '../assets/waste-bin.svg';

interface TournamentsListProps {
  tournaments: TournamentProps[];
  handleSelectTournament: (tournamentId: string) => void;
}

function GroupTournamentsList({ tournaments, handleSelectTournament }: TournamentsListProps) {
  const [isConfirmationWindowActive, setIsConfirmationWindowActive] = useState(false);
  const [TournamentsList, setTournamentsList] = useState<TournamentProps[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [tournamentIDToDelete, setTournamentIDToDelete] = useState('');

  function toggleConfirmationWindow(){
    setIsConfirmationWindowActive(!isConfirmationWindowActive);
  }

  function handleDelete(id: string){
    setTournamentIDToDelete(id);
    toggleConfirmationWindow();
  }

  function handleRemoveTournament(tournamentID: string){
    const newTournamentsList = TournamentsList?.filter(tournament => tournament.id !== tournamentID);
    setTournamentsList(newTournamentsList);
    tournaments.splice(tournaments.findIndex(tournament => tournament.id === tournamentID), 1);
  }

  useEffect(() => {
    setTournamentsList(tournaments);
    setIsLoading(false);
  }, [tournaments]);

  useEffect(() => {
    setIsLoading(true);
    setTournamentsList(tournaments);
    setIsLoading(false);
  }, [TournamentsList]);
  
  return (
   <div className="flex flex-col pt-10 gap-4">
    {
      isLoading ? (
        <h1>Loading...</h1>
      ) : (
        TournamentsList?.map((tournament, index) => (
          <div key={tournament.id} className="flex gap-2">
            <button key={index} className="w-[40rem] h-16 bg-panel-item rounded-lg flex items-center justify-between p-4 text-xl text-white font-outline-1 gap-2 hover:drop-shadow-secondary" onClick={() => handleSelectTournament(tournament.id)}>
              <img className="w-10 h-10" src={trophyIcon2} alt="Icone de um Troféu" />
              <span>{tournament.title}</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <img className="w-10 h-10" src={tournamentIcon} alt="estrutura de uma torneio" title="Tamanho do torneio" />
                  <span>{tournament.tournamentSize}</span>
                </div>
                <div className="flex items-center gap-1">
                  <img className="w-10 h-10" src={participantsIcon} alt="icone de participantes" title="Quantidade de participantes neste torneio" />
                  <span>{tournament.participants.length}</span>
                </div>
              </div>
            </button>
            <button className='w-12 h-12 self-center p-1 text-xl bg-panel text-secondary rounded-full hover:drop-shadow-secondary' onClick={() => handleDelete(tournament.id)}>
              <img src={wasteBinIcon} alt="" />
            </button>
          </div>
          ))
        )
      }
      {
        isConfirmationWindowActive && (
        <>
          <Confirmation action="excluir o torneio" onConfirm={() => handleRemoveTournament(tournamentIDToDelete)} toggleConfirmation={toggleConfirmationWindow} />
          <Overlay onClick={toggleConfirmationWindow} />
        </>
      )}
   </div>
  )
}

export default GroupTournamentsList