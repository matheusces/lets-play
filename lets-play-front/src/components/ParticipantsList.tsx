import { useState } from 'react';

import onlineIcon from '../assets/online-icon.svg';
import participantsIcon from '../assets/participants.svg';
import closeIcon from '../assets/cross-mark.svg';

import Overlay from './Overlay';

interface ParticipantsListProps {
  participants: string[],
}

function ParticipantsList({ participants }: ParticipantsListProps) {
  const [isParticipantsListActive, setIsParticipantsListActive] = useState(false);

  function toggleParticipantsList() {
    setIsParticipantsListActive(!isParticipantsListActive);
  }

  return (
    <>
      <button type='button' className='flex items-end text-5xl text-white font-outline-1 hover:drop-shadow-secondary' onClick={toggleParticipantsList} title='Exibir participantes'>
        <span>{participants.length}</span>
        <img className='w-12 h-12' src={participantsIcon} alt="person icon" />
      </button>
      {isParticipantsListActive && (
        <>
          <div className='w-60 h-[35rem] -right-48 absolute bg-highlight rounded-lg p-4 z-10'>
            <button type='button' className="w-full flex flex-row-reverse" onClick={toggleParticipantsList} title="Fechar painel de participantes">
              <img className='w-8 hover:drop-shadow-logo hover:bg-highlight p-1 rounded-lg' src={closeIcon} alt="Close List" title='Fechar lista' />
            </button>
            <ul className='flex flex-col p-2'>
              <li className='flex gap-1 hover:drop-shadow-primary'>
                <img src={onlineIcon} alt="Green Cicle icon" />
                Eu
              </li>
              {participants.map((participant, index) => (
                <li key={index} className='flex gap-1 hover:drop-shadow-primary'>
                  <img src={onlineIcon} alt="Green Cicle icon" />
                  {participant}
                </li>
              ))}
            </ul>
          </div>
          <Overlay onClick={toggleParticipantsList} />
        </>
      )}
    </>
  )
}

export default ParticipantsList