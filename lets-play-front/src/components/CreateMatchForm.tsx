import rightArrowBlue from '../assets/right-arrow-blue.svg'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import AddVoiceChannel from './AddVoiceChannel';
import InviteParticipantInput from './InviteParticipantInput';
import ParticipantsList from './ParticipantsList';

interface CreateMatchFormProps {
  toggleCreateMatchForm: (value: boolean) => void
}

interface GameProps {
  "id": number,
  "slug": string,
  "name": string,
  "background_image": string,
  "rating": number,
  "suggestions_count": number,
}

function CreateMatchForm({ toggleCreateMatchForm }: CreateMatchFormProps) {
  const [games, setGames] = useState([]);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedDate, setselectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [description, setDescription] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [voiceChannel, setVoiceChannel] = useState<string>('');
  const [participants, setParticipants] = useState<string[]>([])

  function handleToggleDropdown() {
    setIsDropdownActive(!isDropdownActive);
  }

  function handleGameChange(e: ChangeEvent<HTMLInputElement>) {
    setSelectedGame(e.target.value);
    setIsDropdownActive(true);
  };
  
  function handleSelectGame(game: GameProps) {
    setSelectedGame(game.name);
    setSelectedImage(game.background_image);
    setIsDropdownActive(false);
  }

  function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
    setselectedDate(e.target.value);
  }

  function handleTimeChange(e: ChangeEvent<HTMLInputElement>) {
    setSelectedTime(e.target.value);
  }

  function handleDescriptionChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value);
  }

  function clearForm() {
    setSelectedGame('');
    setSelectedImage(undefined);
    setSelectedTime('');
    setselectedDate('');
    setDescription('');
    setVoiceChannel('');
    setParticipants(['eu'])
  }

 function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = {
      gameTitle: selectedGame,
      gameImage: selectedImage,
      date: selectedDate,
      time: selectedTime,
      description: description,
      voiceChannel: voiceChannel,
      participants: participants
    };
    
    console.log(formData)
    console.log('Formulário enviado');

    clearForm()
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
    <>
      <form onSubmit={handleSubmitForm} className='w-[42rem] h-[35rem] bg-form absolute z-10 left-1/4 z-1 flex flex-col gap-2 text-secondary items-center text-3xl px-6 py-4'>
        <div className='w-full flex justify-between px-6'>
          <label className='self-end'>Jogo</label>
          <div className='flex gap-5'>
            <AddVoiceChannel voiceChannel={voiceChannel} setVoiceChannel={setVoiceChannel} />
            <InviteParticipantInput participants={participants} setParticipants={setParticipants} />
            <ParticipantsList participants={participants} />
          </div>
        </div>
        
        <button type='button' onClick={handleToggleDropdown} className='w-[35rem] h-28 flex justify-between items-center bg-input text-white text-center rounded-lg font-outline-1 border focus-within:border-secondary'>
          <img src={selectedImage} className='w-28 h-28 bg-img border border-secondary rounded-lg'/>
          <input className='w-96 text-center p-2 bg-input text-ellipsis focus:outline-0' placeholder='Selecione o jogo' onChange={handleGameChange} value={selectedGame} />
          <img className='right-10' src={rightArrowBlue} alt="" />
        </button>
        {isDropdownActive && (
          <div className='w-[28rem] max-h-48 overflow-scroll hide-scroll-bar absolute bg-input rounded-br-lg rounded-bl-lg top-[11rem] left-[10.5rem] border-x border-b border-secondary'>
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

        <div className='w-full flex justify-evenly gap-2'>
          <div className='flex flex-col'>
            <label htmlFor="">Dia e mês</label>
            <input className='w-64 h-10 rounded-lg bg-input p-2 text-secondary text-2xl focus:border-secondary' type="date" value={selectedDate} onChange={handleDateChange} />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="">Horário</label>
            <input className='w-64 h-10 rounded-lg bg-input p-2 focus:border-secondary' type="time" value={selectedTime} onChange={handleTimeChange} />
          </div>
        </div>

        <div className='w-11/12 flex flex-col items-start self-start mx-8'>
          <label className='self-start' htmlFor="">Descrição</label>
          <textarea maxLength={90} className='w-full h-32 max-h-32 hide-scroll-bar bg-input p-2 rounded-lg' value={description} onChange={handleDescriptionChange} />
        </div>

        <div className='flex gap-20 mt-8'>
          <button type='submit' className='bg-primary text-white p-2 rounded-lg'>Confirmar</button>
          <button type='button' className='bg-white text-primary p-2 rounded-lg' onClick={() => toggleCreateMatchForm(false)}>Cancelar</button>
        </div>
      </form>
    </>
  )
}

export default CreateMatchForm