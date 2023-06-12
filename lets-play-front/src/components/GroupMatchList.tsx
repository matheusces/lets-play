import { useState, useEffect } from 'react';

import Confirmation from './Confirmation';
import Overlay from './Overlay';

import { MatchProps } from "../types/type";

import wasteBinIcon from '../assets/waste-bin.svg';
import users from '../assets/users.svg';

interface GroupMatchListProps {
  matches: MatchProps[],
  handleToggleMatchSelected: (match: MatchProps) => void,
}

function GroupMatchList({ matches, handleToggleMatchSelected }: GroupMatchListProps) {
  const [isConfirmationWindowActive, setIsConfirmationWindowActive] = useState(false);
  const [matchesList, setMatchesList] = useState<MatchProps[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [matchIDToDelete, setMatchIDToDelete] = useState('');

  function handleRemoveMatch(matchID: string){
    const newMatchesList = matches?.filter(match => match.id !== matchID);
    setMatchesList(newMatchesList);
    matchesList!.splice(matchesList!.findIndex(match => match.id === matchID), 1);
  }

  function handleDelete(id: string){
    setMatchIDToDelete(id);
    toggleConfirmationWindow();
  }

  function toggleConfirmationWindow(){
    setIsConfirmationWindowActive(!isConfirmationWindowActive);
  }

  useEffect(() => {
    setMatchesList(matches);
    setIsLoading(false);
  }, [matches]);

  useEffect(() => {
    setIsLoading(true);
    setMatchesList(matches);
    setIsLoading(false);
  }, [matchesList]);

  return (
    <div className="flex flex-col items-center gap-4 p-2 mt-7">
      {
        isLoading ? (
          <h1>Loading...</h1>
        ) : (
          matchesList?.map((match, index) => (
            <div key={match.id} className="flex gap-2">
              <button key={index} className="w-[40rem] h-fit bg-panel-item rounded-lg flex items-center justify-between p-2 text-2xl text-white font-outline-1 gap-2 hover:drop-shadow-primary" onClick={() => handleToggleMatchSelected(match)}>
                <div className="flex flex-col">
                  <span className="text-xl">{match.game}</span>
                  <span className="w-72 text-sm text-primary overflow-ellipsis font-outline-0">{match.description}</span>
                </div>
  
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span>{match.participants.length}</span>
                    <img className="w-10 h-10" src={users} alt="estrutura de uma torneio" title="Tamanho do torneio" />
                  </div>
                  <div className="flex flex-col text-base items-center gap-1">
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

export default GroupMatchList