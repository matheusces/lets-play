import invite from '../assets/invite.svg';
import { useState, ChangeEvent } from 'react';
import Overlay from './Overlay';

interface InviteParticipantInputProps {
  participants: string[]
  setParticipants: (participants: string[]) => void
}

function InviteParticipantInput({ participants, setParticipants }: InviteParticipantInputProps) {
  const [isInviteInputActive, setisInviteInputActive] = useState(false);
  const [newParticipant, setNewParticipant] = useState('');

  function toggleInviteInput() {
    setisInviteInputActive(!isInviteInputActive);
  }

  function clearInput() {
    setNewParticipant('');
    toggleInviteInput();
  }


  function handleAddParticipant() {
    setParticipants([...participants, newParticipant]);
    setNewParticipant('');
  }

  function handleNewParticipantChange(e: ChangeEvent<HTMLInputElement>){
    setNewParticipant(e.target.value)
  }

  return (
    <>
      <button type='button' className='hover:drop-shadow-secondary' onClick={toggleInviteInput} title='Convidar um usuário'>
        <img className='w-12 h-12' src={invite} alt="person with a plus icon" />
      </button>

      {isInviteInputActive && (
        <>
          <div className='w-30 h-30 border border-secondary rounded-lg bg-form absolute z-10 left-1/4 top-20 z-1 flex flex-col gap-2 text-secondary items-center text-3xl px-6 py-4'>
            <label htmlFor="">Convide um amigo</label>
            <input className="bg-input rounded-lg p-2" type="text" placeholder='nome do usuário' value={newParticipant} onChange={handleNewParticipantChange} />
            <div className='flex gap-2'>
              <button className='bg-primary text-white rounded-lg p-1 text-lg hover:drop-shadow-secondary' type='button' onClick={handleAddParticipant}>Adicionar</button>
              <button className='bg-white text-primary rounded-lg p-1 text-lg hover:drop-shadow-secondary' type='button' onClick={clearInput}>cancelar</button>
            </div>
          </div>
          <Overlay onClick={toggleInviteInput} />
        </>
      )}
    </>
  )
}

export default InviteParticipantInput