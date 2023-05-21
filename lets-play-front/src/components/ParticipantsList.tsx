import { useState } from 'react';
import onlineIcon from '../assets/online-icon.svg';
import participantsIcon from '../assets/participants.svg';
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
        <span>1</span>
        <img className='w-12 h-12' src={participantsIcon} alt="person icon" />
      </button>
      {isParticipantsListActive && (
        <>
          <div className='w-60 h-[35rem] -right-48 absolute bg-highlight rounded-lg p-4 z-10'>
            <button type='button' className="w-full flex flex-row-reverse" onClick={toggleParticipantsList} title="Fechar painel de participantes">close</button>
            <ul className='flex p-2'>
              {participants.map((participant, index) => (
                <li key={index} className='flex gap-1 hover:drop-shadow-primary'>
                  <img src={onlineIcon} alt="Green Cicle icon" />
                  {participant}
                </li>
              ))}
              <li className='flex gap-1 hover:drop-shadow-primary'>
                <img src={onlineIcon} alt="Green Cicle icon" />
                Eu
              </li>
            </ul>
          </div>
          <Overlay onClick={toggleParticipantsList} />
        </>
      )}
    </>
  )
}

export default ParticipantsList