import { FormEvent, useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

import TournamentParticipantsManager from './TournamentParticipantsManager';
import Overlay from './Overlay';
import rightArrowBlue from '../assets/right-arrow-blue.svg';
import offlineIcon from '../assets/offline-icon.svg';

interface GameProps {
  "id": number,
  "slug": string,
  "name": string,
  "background_image": string,
  "rating": number,
  "suggestions_count": number,
}

const users = ["Matheus", "Kelvyn", "Marcos", "Luiggie"];

function CreateTournamentForm() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [participant, setParticipant] = useState('');
  const [participants, setParticipants] = useState([]);
  const [tournamentSize, setTournamentSize] = useState(2);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [isParticipantsManagerActive, setIsParticipantsManagerActive] = useState(false);

  function handleToggleDropdown() {
    setIsDropdownActive(!isDropdownActive);
  }

  function handleToggleParticipantsManager() {
    setIsParticipantsManagerActive(!isParticipantsManagerActive);
  }

  function handleSelectGame(game: GameProps) {
    setSelectedGame(game.name);
    setSelectedImage(game.background_image);
    setIsDropdownActive(false);
  }

  function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleGameChange(e: ChangeEvent<HTMLInputElement>) {
    setSelectedGame(e.target.value);
    setIsDropdownActive(true);
  };

  function handleChangeTournamentSize(event: ChangeEvent<HTMLSelectElement>) {
    setTournamentSize(Number(event.target.value));
  }

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://api.rawg.io/api/games', {
          params: {
            key: '710e9bbeee7645df9aeeb8e5e70d5e3d',
            pageSize: 10,
            search: selectedGame,
          }
        });
        setGames(response.data.results);
        // console.log(response.data.results)
      } catch (error) {
        console.error(error);
      }
    };

    fetchGames();
  }, [selectedGame]);

  return (
    <form onSubmit={handleSubmitForm} className='w-[42rem] h-[35rem] bg-form absolute z-10 left-1/4 z-1 flex flex-col gap-4 text-secondary items-center text-3xl px-12 py-10'>
      <button type='button' onClick={handleToggleDropdown} className='w-[35rem] h-28 flex justify-between items-center bg-input text-white text-center rounded-lg font-outline-1 border focus-within:border-secondary'>
        <img src={selectedImage} className='w-28 h-28 bg-img border border-secondary rounded-lg'/>
        <input className='w-96 text-center p-2 bg-input text-ellipsis focus:outline-0' placeholder='Selecione o jogo' onChange={handleGameChange} value={selectedGame} />
        <img className='right-10' src={rightArrowBlue} alt="" />
      </button>
      {isDropdownActive && (
        <div className='w-[28rem] max-h-48 overflow-scroll hide-scroll-bar absolute bg-input rounded-br-lg rounded-bl-lg top-[7rem] left-[10.5rem] border-x border-b border-secondary'>
          <ul className='flex flex-col items-center gap-2'>
            {games.map((game: GameProps, index) => (
              <li 
                key={index} 
                onClick={() =>handleSelectGame(game)}
                className='flex items-start cursor-pointer text-left gap-1 text-ellipsis w-full p-2 hover:text-white'
              >
                <img className='w-16 h-16' src={game.background_image} alt="" />
                {game.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className='w-full flex flex-col self-start'>
        <label className='self-start' htmlFor="">Título</label>
        <input className='w-full h-10 self-start rounded-lg bg-input p-2 text-secondary text-2xl focus:border-secondary' type="text" placeholder='Título' />
      </div>

      <div className='w-full flex justify-between'>
        <div className='flex flex-col'>
          <label className='self-start' htmlFor="">Tamanho</label>
          {/* <input className='w-40 h-10 self-start rounded-lg bg-input p-2 text-secondary text-2xl focus:border-secondary' type="number" placeholder='Tamanho' /> */}
          <select className='w-40 h-10 self-start rounded-lg bg-input p-2 text-secondary text-2xl focus:border-secondary' name="size" value={tournamentSize} onChange={handleChangeTournamentSize}>
            <option className='rounded-xl' value="2">2</option>
            <option className='rounded-xl' value="4">4</option>
            <option className='rounded-xl' value="8">8</option>
            <option className='rounded-xl' value="16">16</option>
            <option className='rounded-xl' value="32">32</option>
          </select>
        </div>

        <div className='flex flex-col'>
          <label className='self-start' htmlFor="">Participantes</label>
          <input className='w-80 h-10 rounded-lg bg-input p-2 text-ellipsis text-secondary text-xl focus:border-secondary' type="text" placeholder='Adicione um participante' />
          <div className='w-80 h-40 max-h-40 overflow-scroll hide-scroll-bar flex flex-col mt-4 rounded-lg bg-input p-2 text-secondary text-2xl focus:border-secondary' onClick={handleToggleParticipantsManager}>
            {users.map((user, index) => (
              <span className='hover:drop-shadow-secondary hover:cursor-pointer flex gap-2' key={index}>
                <img src={offlineIcon} alt="" />
                {user}
              </span>
            ))}
          </div>
        </div>

        {isParticipantsManagerActive && (
          <>
            <TournamentParticipantsManager participants={users} tournamentSize={tournamentSize} onChange={handleChangeTournamentSize} />
            <Overlay onClick={handleToggleParticipantsManager} />
          </>

        )}
      </div>
    </form>
  )
}

export default CreateTournamentForm