import { FormEvent, useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

import Overlay from './Overlay';

import { Leagues } from '../utils/Leagues';
import { GameProps, ParticipantProps } from '../types/type';

import rightArrowBlue from '../assets/right-arrow-blue.svg';
import offlineIcon from '../assets/offline-icon.svg';
import addIcon from '../assets/add.svg';
import wasteBinIcon from '../assets/waste-bin.svg';
import noImage from '../assets/block.svg';
import hourglassIcon from '../assets/hourglass.gif';


interface createTournamentFormProps {
  toggleCreateLeagueForm: () => void;
}

function CreateLeagueForm({ toggleCreateLeagueForm }: createTournamentFormProps) {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState('');
  const [participant, setParticipant] = useState<ParticipantProps>({name : '', team: 'Time 1'});
  const [participants, setParticipants] = useState<ParticipantProps[]>([]);
  const [leagueSize, setLeagueSize] = useState(1);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [isParticipantsManagerActive, setIsParticipantsManagerActive] = useState(false);
  const [isSoloChecked, setIsSoloChecked] = useState(false);

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

  function groupParticipantsByTeam(participants: ParticipantProps[]): { [team: string]: string[] } {
    const groupedParticipants: { [team: string]: string[] } = {};
  
    participants.forEach(participant => {
      const { name, team } = participant;
  
      if (groupedParticipants[team]) {
        groupedParticipants[team].push(name);
      } else {
        groupedParticipants[team] = [name];
      }
    });
  
    return groupedParticipants;
  }

  function clearForm() {
    setSelectedGame('');
    setSelectedImage(undefined);
    setTitle('');
    setParticipant({
      name: '',
      team: 'Time 1'
    });
    setParticipants([]);
    setLeagueSize(2);
  }

  function handleGameChange(e: ChangeEvent<HTMLInputElement>) {
    setSelectedGame(e.target.value);
    setIsDropdownActive(true);
  }

  function handleChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  // function handleChangeLeagueSize(event: ChangeEvent<HTMLInputElement>) {
  //   setLeagueSize(Number(event.target.value));
  // }

  function handleAddParticipant() {
    setParticipants([...participants, participant]);
    setParticipant({
      name: '',
      team: 'Time 1'
    });

  }

  function handleChangeParticipantName(e: ChangeEvent<HTMLInputElement>) {
    setParticipant(prevParticipant => ({
      ...prevParticipant,
      name: e.target.value
    }))
  }

  function handleRemoveParticipant(user: string) {
    setParticipants(prevParticipants => prevParticipants.filter(participant => participant.name !== user));
  }
  
  function handleToggleCreateLeagueForm() {
    toggleCreateLeagueForm();
  }

  function handleSoloCheckChange(event: ChangeEvent<HTMLInputElement>) {
    setIsSoloChecked(event.target.checked);
    updateTeams();
  }

  function handleChangeTeam(team: string, participantIndex: number, ) {
    const updatedParticipant = {
      name: participants[participantIndex].name,
      team,
    };

    setParticipants(prevParticipants => {
      
      const updatedParticipants = [...prevParticipants];
      updatedParticipants[participantIndex] = updatedParticipant;
      return updatedParticipants;
    });
  }

  function clearTeams() {
    const updatedParticipants = Array(participants.length);
    participants.map((participant, index) => updatedParticipants[index] = {...participant, team: 'Time 1'});
    setParticipants(updatedParticipants);
  }

  function updateTeams(){
    if(isSoloChecked === true){
      clearTeams();
    } 
    else {
      const updatedParticipants = Array(participants.length);
      participants.map((participant, index) => updatedParticipants[index] = {...participant, team: 'Time '+(index+1)});
      setParticipants(updatedParticipants);
    }
  }

  function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = {
      id: Leagues.length + 1,
      title,
      game_img: selectedImage,
      game: selectedGame,
      participants,
      leagueSize,
      teams: groupParticipantsByTeam(participants),
    }

    console.log(formData);

    Leagues.push(formData);

    clearForm();
    toggleCreateLeagueForm();
  }

  function handleDone() {
    handleToggleParticipantsManager();
    // console.log(participants);
    // console.log(isSoloChecked);
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleAddParticipant();
    }
  }

  function handleKeyForm(event: React.KeyboardEvent<HTMLFormElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
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
      } catch (error) {
        console.error(error);
      }
    };

    fetchGames();
  }, [selectedGame]);


  useEffect(() => {
    const numberOfTeams = Object.keys(groupParticipantsByTeam(participants)).length;
    numberOfTeams === 0 || numberOfTeams === 1 ? setLeagueSize(participants.length) : setLeagueSize(numberOfTeams);
  }, [participants, isSoloChecked]);

  return (
    <form onKeyDown={handleKeyForm} onSubmit={handleSubmitForm} className='w-[42rem] h-[35rem] bg-form absolute z-10 left-1/4 z-1 flex flex-col gap-3 text-secondary items-center text-3xl px-12 py-5'>
      <h1>Criar Liga</h1>
      <button type='button' onClick={handleToggleDropdown} className='w-[35rem] h-28 flex justify-between items-center bg-input text-white text-center rounded-lg font-outline-1 border focus-within:border-secondary'>
        <img src={selectedImage === undefined ? noImage : selectedImage} className='w-28 h-28 bg-img border border-secondary rounded-lg'/>
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

      <div className='w-full flex flex-col self-start'>
        <label className='self-start' htmlFor="">Título</label>
        <input className='w-full h-10 self-start rounded-lg bg-input p-2 text-white font-outline-1 text-2xl focus:border-secondary' type="text" placeholder='Título' value={title} onChange={handleChangeTitle} />
      </div>

      <div className='w-full h-full flex justify-between gap-2'>
        <div className='h-full flex flex-col gap-7'>
          <div className='flex flex-col'>
            <label className='self-start' htmlFor="">Tamanho</label>
            <input disabled className='w-40 h-10 self-start rounded-lg bg-input p-2 text-secondary text-2xl focus:border-secondary' value={leagueSize} />
          </div>

          <div className='w-fit flex flex-col gap-2 px-4'>
            <button className='w-36 h-14 bg-primary p-2 text-base text-white rounded-lg hover:drop-shadow-secondary' type='submit'>Confirmar</button>
            <button className='w-36 h-14 bg-white p-2 text-base text-primary rounded-lg hover:drop-shadow-secondary' type='button' onClick={handleToggleCreateLeagueForm}>Cancelar</button>
          </div>
        </div>

        <div className='flex flex-col'>
          <label className='self-start' htmlFor="">Participantes</label>
          <div className='w-full flex items-center justify-between gap-2'>
            <input className='w-full h-10 rounded-lg bg-input p-2 text-ellipsis text-secondary text-lg focus:border-secondary' type="text" placeholder='Adicione um participante' value={participant.name} onKeyDown={handleKeyPress} onChange={handleChangeParticipantName} />
            <button className='w-fit h-fit rounded-xl hover:drop-shadow-secondary' onClick={handleAddParticipant} type='button'>
              <img className='w-9 h-9' src={addIcon} alt="Plus sign" title='adicionar participante.' />
            </button>
          </div>
          <div className='w-80 h-40 max-h-40 overflow-scroll hide-scroll-bar flex flex-col mt-4 rounded-lg bg-input p-2 text-secondary text-2xl focus:border-secondary'>
            {participants.map((user, index) => (
              <div className='w-full flex flex-row items-center justify-between gap-2' key={index}>
                <button className='w-full flex flex-row items-center gap-2 hover:drop-shadow-secondary hover:cursor-pointer' type='button' onClick={handleToggleParticipantsManager}>
                  <img className='p-1 w-10 h-10' src={hourglassIcon} alt="ampulheta" title='aceitação pendente' />
                  <span>
                    {user.name}
                  </span>
                </button>

                <button className='w-fit h-fit hover:drop-shadow-secondary hover:cursor-pointer' type='button' onClick={() => handleRemoveParticipant(user.name)}>
                  <img className='w-8 h-7 self-end' src={wasteBinIcon} alt="icone de lata de lixo" />
                </button>

              </div>
            ))}
          </div>
        </div>

        {isParticipantsManagerActive && (
          <>
            <div className="w-[42rem] h-[35rem] max-h-[35rem] flex flex-col absolute left-0 bottom-0 bg-form p-6 z-10">
            <h1 className='w-full flex justify-center pt-2 pb-4'>Gerencie os participantes</h1>
            
            <div className="flex flex-col">

              <div className="flex gap-4 text-primary mb-8">
                <span>Quantidade de times</span>
                <span className='rounded-md'>{leagueSize}</span>

                <label htmlFor="">Solo</label>
                <input type="checkbox" name="solo" id="solo" checked={isSoloChecked} onChange={handleSoloCheckChange} />
              </div>

              <div className='max-h-72 border border-primary p-2 overflow-scroll hide-scroll-bar'>
                {participants.map((participant, participantIndex) => (
                  <div key={participantIndex} className="grid grid-cols-2 p-1 rounded-lg items-center hover:bg-highlight hover:drop-shadow-primary">
                    <span>{participant.name}</span>
                    <select className='w-86 h-10 self-start rounded-lg bg-input p-2 text-secondary text-2xl focus:border-secondary' value={participant.team} onChange={(e) => handleChangeTeam(e.target.value, participantIndex)} name="team" id="team" disabled={isSoloChecked}>
                      {
                        [...Array(participants.length)].map((_, index) => (
                          <option className="w-24 h-10" key={index} value={'Time ' + (index+1)}>{isSoloChecked ? 'Time ' + (participantIndex+1) : 'Time '+(index+1)}</option>
                          ))
                      }
                    </select>
                  </div>
                ))}
              </div>

              <button className='w-fit h-fit self-center mt-10 p-2 rounded-xl text-white bg-primary' type='button' onClick={handleDone}>Feito</button>

            </div>
          </div>
            <Overlay onClick={handleToggleParticipantsManager} />
          </>

        )}

      </div>
    </form>
  )
}

export default CreateLeagueForm;