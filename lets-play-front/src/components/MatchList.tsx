import { useState, useEffect } from 'react';

import { matchs } from "../utils/matchs"
import { MatchProps } from "../types/type";

import wasteBinIcon from '../assets/waste-bin.svg';
import users from '../assets/users.svg';
import Confirmation from './Confirmation';
import Overlay from './Overlay';

interface MatchListProps {
  handleToggleMatchSelected: (match: MatchProps) => void,
}

function MatchList({ handleToggleMatchSelected }: MatchListProps) {
  const [isConfirmationWindowActive, setIsConfirmationWindowActive] = useState(false);
  const [matches, setMatches] = useState<MatchProps[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [matchIDToDelete, setMatchIDToDelete] = useState('');

  function handleRemoveMatch(matchID: string){
    const newMatchesList = matches?.filter(match => match.id !== matchID);
    setMatches(newMatchesList);
    matchs.splice(matchs.findIndex(match => match.id === matchID), 1);
  }

  function handleDelete(id: string){
    setMatchIDToDelete(id);
    toggleConfirmationWindow();
  }

  function toggleConfirmationWindow(){
    setIsConfirmationWindowActive(!isConfirmationWindowActive);
  }

  useEffect(() => {
    setMatches(matchs);
    setIsLoading(false);
  }, [matchs]);

  useEffect(() => {
    setIsLoading(true);
    setMatches(matchs);
    setIsLoading(false);
  }, [matches]);

  return (
    <div className="flex flex-col items-center gap-4 p-2 hide-scroll-bar overflow-scroll">
      {
        isLoading ? (
          <h1>Loading...</h1>
        ) : (
          matchs.map((match, index) => (
            <div className="flex gap-2">
              <button key={index} className="w-[40rem] h-24 bg-panel-item rounded-lg flex items-center justify-between p-4 text-2xl text-white font-outline-1 gap-2 hover:drop-shadow-primary" onClick={() => handleToggleMatchSelected(match)}>
                <div className="flex flex-col">
                  <span className="text-3xl">{match.game}</span>
                  <span className="w-72 text-primary overflow-ellipsis font-outline-0">{match.description}</span>
                </div>
  
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span>{match.participants.length}</span>
                    <img className="w-10 h-10" src={users} alt="estrutura de uma torneio" title="Tamanho do torneio" />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span>{match.time}</span>
                    <span>{match.date}</span>
                  </div>
                </div>
              </button>
              <button className='w-12 h-12 self-center p-1 text-xl bg-panel text-secondary rounded-full hover:drop-shadow-secondary' onClick={() => handleDelete(match.id)}>
                <img src={wasteBinIcon} alt="" />
              </button>
            </div>
          ))
        )
      }
       {
        isConfirmationWindowActive && (
          <>
            <Confirmation action="remover o jogo" onConfirm={() => handleRemoveMatch(matchIDToDelete)} toggleConfirmation={toggleConfirmationWindow} />
            <Overlay onClick={toggleConfirmationWindow} />
          </>
        )
        }
    </div>
  )
}

export default MatchList