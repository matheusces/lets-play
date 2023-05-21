import React, { useState } from 'react';
import addFolderIcon from '../assets/folder-add.svg';
import wasteBin from '../assets/waste-bin.svg';
import closeIcon from '../assets/cross-mark.svg';

interface GroupManagerProps {
  groups: string[];
  setGroups: React.Dispatch<React.SetStateAction<string[]>>;
  toggleGroupManager: () => void;
}

function GroupManager({ groups, setGroups, toggleGroupManager }: GroupManagerProps) {
  const [groupName, setGroupName] = useState('');
  const [newParticipant, setNewParticipant] = useState('');
  const [invitedParticipants, setInvitedParticipants] = useState<string[]>([]);

  const [isCreateGroupActive, setIsCreateGroupActive] = useState(false);

  function handleChangeGroupName(e: React.ChangeEvent<HTMLInputElement>) {
    setGroupName(e.target.value);
  }

  function handleNewParticipantChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewParticipant(e.target.value);
  }

  function handleAddParticipant() {
    setInvitedParticipants([...invitedParticipants, newParticipant]);
    setNewParticipant('');
  }

  function handleRemoveParticipant(participant: string) {
    const newInvitedParticipants = invitedParticipants.filter((invitedParticipant) => invitedParticipant !== participant);
    setInvitedParticipants(newInvitedParticipants);
  }

  function toggleCreateGroup() {
    setIsCreateGroupActive(!isCreateGroupActive);
  }

  function handleKeyForm(event: React.KeyboardEvent<HTMLFormElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleAddParticipant();
    }
  }

  function clearForm() {
    setGroupName('');
    setNewParticipant('');
    setInvitedParticipants([]);

  }

  function handleAddGroup(group: string) {
    setGroups([...groups, group]);
  }

  function handleRemoveGroup(group: string) {
    const newGroups = groups.filter((groupItem) => groupItem !== group);
    setGroups(newGroups);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = {
      groupName,
      invitedParticipants
    }

    handleAddGroup(groupName);

    console.log(formData)
    console.log('Group created');
    clearForm();
    toggleCreateGroup();
  }

  return (
    <div className="w-[22rem] h-[35rem] max-h-[35rem] flex flex-col absolute right-[40%] bg-panel p-6 z-10">
      <h1 className='w-full text-2xl flex justify-center pt-2'>Gerencie os grupos</h1>
      
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 items-center">
          {isCreateGroupActive ? (
            <form onKeyDown={handleKeyForm} onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <label className="text-secondary" htmlFor="">Nome do grupo</label>
              <input className="text-secondary bg-input rounded-lg p-2" type="text" value={groupName} onChange={handleChangeGroupName} placeholder='Nome do grupo' />

              <div className='flex items-center gap-2 justify-center'>
                <div className='flex flex-col'>
                  <label className="text-secondary" htmlFor="">Convide um participante</label>
                  <input className="text-secondary bg-input rounded-lg p-2" type="text"  value={newParticipant} onChange={handleNewParticipantChange} onKeyDown={handleKeyPress} placeholder='Nome do usuário'/>
                </div>
                <button className='w-8 h-8 flex absolute right-[9%] top-1/3 items-center justify-center p-2 rounded-full text-white bg-primary hover:drop-shadow-secondary' type='button' onClick={handleAddParticipant}>+</button>

              </div>
              <div className='w-ful h-44 max-h-44 flex flex-col text-secondary rounded-md border border-primary p-2 overflow-scroll hide-scroll-bar'>
                {invitedParticipants.map((participant, index) => (
                  <div key={index} className='w-full flex justify-between rounded-lg '>
                    <span className='w-full hover:drop-shadow-primary'>
                      {participant}
                    </span>
                    <button type='button' onClick={() => handleRemoveParticipant(participant)}>
                      <img src={closeIcon} className='hover:drop-shadow-primary hover:bg-highlight rounded-lg p-1' alt="X" />
                    </button>
                  </div>
                ))}
              </div>

              <div className='flex self-center gap-4'>
                <button className='w-fit h-fit self-center mt-2 p-2 rounded-xl text-white bg-primary hover:bg-white hover:text-primary' type='submit'>Criar</button>
                <button className='w-fit h-fit self-center mt-2 p-2 rounded-xl text-white bg-primary hover:bg-white hover:text-primary' type='button' onClick={toggleCreateGroup}>Cancelar</button>
              </div>
            </form>
          ) : (
            <div className='w-full flex flex-col items-center mt-6 gap-4'>
              <button className="w-16 h-16 flex p-2 absolute top-[10%] right-0 self-end text-white hover:text-primary hover:drop-shadow-secondary" type='button' onClick={toggleCreateGroup}>
                <img src={addFolderIcon} alt="Pasta com simbolo de mais" title='Criar um grupo' />
              </button>
              <h2 className="text-lg text-secondary">Meus grupos</h2>
              <div className='w-full max-h-72 h-72 flex flex-col text-secondary border border-primary p-2 overflow-scroll hide-scroll-bar'>
                <ul>
                  {groups.map((group, index) => (
                    <li key={index} className='flex justify-between rounded-lg'>
                      <span className='w-full px-2 rounded-lg text-white font-outline-1 hover:bg-highlight'>
                        {group}
                      </span>
                      <button onClick={() => handleRemoveGroup(group)}>
                        <img className='w-6 h-6 hover:drop-shadow-secondary' src={wasteBin} alt="" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='flex self-center gap-4 mt-10'>
                <button className='w-fit h-fit self-center p-2 rounded-xl text-white bg-primary hover:bg-white hover:text-primary' type='button' onClick={toggleGroupManager}>Feito</button>
                <button className='w-fit h-fit self-center p-2 rounded-xl text-white bg-primary hover:bg-white hover:text-primary' type='button' onClick={toggleGroupManager}>Fechar</button>
              </div>
            </div>
          )}
        </div>


      </div>
    </div>
  )
}

export default GroupManager