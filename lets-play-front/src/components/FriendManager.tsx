import React, { useState } from 'react';
import closeIcon from '../assets/cross-mark.svg';
import hourglassIcon from '../assets/hourglass.gif';
import invite from '../assets/invite.svg';

interface FriendManagerProps {
  friends: string[];
  setFriends: React.Dispatch<React.SetStateAction<string[]>>;
  toggleFriendManager: () => void;
}

function FriendManager({ friends, setFriends, toggleFriendManager }: FriendManagerProps) {
  const [friend, setFriend] = useState('');
  const [isAddUserFieldActive, setIsAddUserFieldActive] = useState(false);

  function toggleAddUserField() {
    setIsAddUserFieldActive(!isAddUserFieldActive);
  }

  function handleChangeFriend(e: React.ChangeEvent<HTMLInputElement>) {
    setFriend(e.target.value);
  }

  function handleAddFriend(friend: string) {
    setFriends([...friends, friend]);
  }

  function handleRemoveFriend(friend: string) {
    const newFriends = friends.filter((friendName) => friendName !== friend);
    setFriends(newFriends);
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLFormElement>) {
  
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmitForm(event);
    }
  }

  function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    handleAddFriend(friend);

    console.log('Invite sent successfully');

    toggleAddUserField();
    setFriend('');
  }

  return (
    <div className="w-[22rem] h-[35rem] max-h-[35rem] flex flex-col absolute right-[40%] bg-panel p-6 z-10">
      <h1 className='w-full text-2xl flex justify-center pt-2'>Gerencie os grupos</h1>
      
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 items-center">
          <div className='w-full flex flex-col items-center mt-6 gap-4'>
            <div className='w-full flex justify-end'>
              {isAddUserFieldActive && (
                <form onKeyDown={handleKeyPress} onSubmit={handleSubmitForm} className='flex flex-col justify-end gap-2'>
                  <input className='bg-input rounded-lg px-2 text-secondary' type="text" value={friend} onChange={handleChangeFriend} placeholder='Adicione um amigo' />
                  <button className='w-32 self-center bg-primary rounded-lg text-white hover:drop-shadow-secondary' type='submit'>Enviar pedido</button>
                </form>
              )}
              <button className="w-16 h-16 flex p-2 self-end text-white hover:text-primary hover:drop-shadow-secondary" type='button' onClick={toggleAddUserField}>
                <img className={isAddUserFieldActive ? 'drop-shadow-secondary' : ''} src={invite} alt="Pessoa com simbolo de mais" title='Adcionar amigo' />
              </button>
            </div>
            <h2 className="text-lg text-secondary">Meus Amigos</h2>
            <div className='w-full max-h-72 h-72 flex flex-col text-secondary border border-primary p-2 overflow-scroll hide-scroll-bar'>
              <ul>
                {friends.map((friend, index) => (
                  <li key={index} className='flex justify-between rounded-lg'>
                    <div className='w-full flex px-2 rounded-lg text-white font-outline-1 hover:bg-highlight'>
                      <img className='w-6 h-6' src={hourglassIcon} alt="Esperando aceitação" title='Aceitação Pendente' />
                      {friend}
                    </div>
                    <button onClick={() => handleRemoveFriend(friend)}>
                      <img className='hover:drop-shadow-primary hover:bg-highlight rounded-lg p-1' src={closeIcon} alt="Cancelar pedido" title='Cancelar pedido ou remover amigo' />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex self-center gap-4 mt-10'>
              <button className='w-fit h-fit self-center p-2 rounded-xl text-white bg-primary hover:bg-white hover:text-primary' type='button' onClick={toggleFriendManager}>Feito</button>
              <button className='w-fit h-fit self-center p-2 rounded-xl text-white bg-primary hover:bg-white hover:text-primary' type='button' onClick={toggleFriendManager}>Fechar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FriendManager