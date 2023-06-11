import { Tournaments } from '../utils/Tournaments';

import trophyIcon2 from "../assets/trophy_gold.svg";
import tournamentIcon from '../assets/match.png';
import participantsIcon from '../assets/participants.svg';
import wasteBinIcon from '../assets/waste-bin.svg';
import { useState, useEffect } from 'react';
import { TournamentProps } from '../types/type';

interface TournamentsListProps {
  toggleIsTournamentSelected: () => void;
  setSelectedTournamentID: React.Dispatch<React.SetStateAction<string>>;
}

function TournamentsList({ toggleIsTournamentSelected, setSelectedTournamentID }: TournamentsListProps) {
  const [TournamentsList, setTournamentsList] = useState<TournamentProps[]>();
  const [isLoading, setIsLoading] = useState(true);

  function handleSelectedTournament(tournamentID: string){
    toggleIsTournamentSelected();
    setSelectedTournamentID(tournamentID);
  }

  function handleRemoveTournament(tournamentID: string){
    const newTournamentsList = TournamentsList?.filter(tournament => tournament.id !== tournamentID);
    setTournamentsList(newTournamentsList);
    Tournaments.splice(Tournaments.findIndex(tournament => tournament.id === tournamentID), 1);
  }

  useEffect(() => {
    setTournamentsList(Tournaments);
    setIsLoading(false);
  }, [Tournaments]);

  useEffect(() => {
    setIsLoading(true);
    setTournamentsList(Tournaments);
    setIsLoading(false);
  }, [TournamentsList]);
  
  return (
   <div className="flex flex-col pt-10 gap-4">
    {
      isLoading ? (
        <h1>Loading...</h1>
      ) : (
        TournamentsList?.map((tournament, index) => (
          <div className="flex gap-2">
            <button key={index} className="w-[40rem] h-16 bg-panel-item rounded-lg flex items-center justify-between p-4 text-xl text-white font-outline-1 gap-2 hover:drop-shadow-secondary" onClick={() => handleSelectedTournament(tournament.id)}>
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
            <button className='w-12 h-12 self-center p-1 text-xl bg-panel text-secondary rounded-full hover:drop-shadow-secondary' onClick={() => handleRemoveTournament(tournament.id)}>
              <img src={wasteBinIcon} alt="" />
            </button>
          </div>
          ))
      )
    }
    {}
   </div>
  )
}

export default TournamentsList