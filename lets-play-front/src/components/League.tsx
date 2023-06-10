import axios from 'axios';
import { useEffect, useState, ChangeEvent } from 'react';

import { Leagues } from '../utils/Leagues';

import wasteBinIcon from '../assets/waste-bin.svg';
import noImage from '../assets/block.svg';
import rightArrowBlue from '../assets/right-arrow-blue.svg';
import LeagueStat from './LeagueStat';
import { GameProps, LeagueProps, ParticipantProps } from '../types/type';

interface ComponentLeagueProps {
  leagueID: string;
  toggleIsLeagueSelected: () => void;
}

function League({ leagueID, toggleIsLeagueSelected }: ComponentLeagueProps) {
  const [league, setLeague] = useState<LeagueProps | undefined>({} as LeagueProps);
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const [isParticipantManagerActive, setIsParticipantManagerActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [games, setGames] = useState([]);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [isSoloChecked, setIsSoloChecked] = useState(false);
  
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [participant, setParticipant] = useState<ParticipantProps>({name : '', team: 'Time 1'});
  // const [isParticipantsManagerActive, setIsParticipantsManagerActive] = useState(false);
  // const [title, setTitle] = useState('');
  // const [participants, setParticipants] = useState<participantProps[]>([]);
  // const [leagueSize, setLeagueSize] = useState(1);
  // const [leagueTeams, setLeagueTeams] = useState({} as { [team: string]: string[]; });
  // const [teams, setTeams] = useState<string[]>();


  function handleChangeLeagueTitle(e: ChangeEvent<HTMLInputElement>) {
    setLeague({...league, title: e.target.value} as LeagueProps);
  }

  function toggleEditMode() {
    setIsEditModeActive(!isEditModeActive);
  }

  function handleToggleDropdown() {
    setIsDropdownActive(!isDropdownActive);
  }

  function handleSelectGame(game: GameProps) {
    setSelectedGame(game.name);
    setSelectedImage(game.background_image);
    setLeague({...league, game: game.name, game_img: game.background_image} as LeagueProps);
    setIsDropdownActive(false);
  }

  function handleGameChange(e: ChangeEvent<HTMLInputElement>) {
    setSelectedGame(e.target.value);
    setLeague({...league, game: e.target.value} as LeagueProps);
    setIsDropdownActive(true);
  }

  function handleSoloCheckChange(event: ChangeEvent<HTMLInputElement>) {
    setIsSoloChecked(event.target.checked);
    updateTeams();
  }

  function groupParticipantsByTeam(participants: ParticipantProps[]): { [team: string]: string[]; } {
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

  function handleChangeTeam(team: string, participantIndex: number, ) {
    setIsLoading(true);

    const updatedParticipant = {
      ...league?.participants[participantIndex],
      team,
    };

    const updatedParticipants = league?.participants.map((participant, index) => {
      if(index === participantIndex){
        return updatedParticipant;
      }
      return participant;
    });

    setLeague({...league, participants: updatedParticipants} as LeagueProps);
      
    setIsLoading(false);
  }

  function handleChangeParticipant(e: ChangeEvent<HTMLInputElement>) {
    const newParticipant = {
      name: e.target.value,
      team: 'Time 1',
    }
    setParticipant(newParticipant);
  }

  function handleAddParticipant() {
    setIsLoading(true);
    setLeague({...league, participants: [...league!.participants, participant]} as LeagueProps);
    setParticipant({name: '', team: 'Time 1'});
    setIsLoading(false);
  }

  function handleRemoveParticipant(name: string) {  
    const updatedParticipants = league?.participants.filter(participant => participant.name !== name);
    setLeague({...league, participants: updatedParticipants} as LeagueProps);
  }

  function clearTeams() {
    const updatedParticipants = Array(league?.participants.length);
    league?.participants.map((participant, index) => updatedParticipants[index] = {...participant, team: 'Time 1'});
    setLeague({...league, participants: updatedParticipants} as LeagueProps);
  }

  function updateTeams(){
    if(isSoloChecked === true){
      clearTeams();
      return;
    } 
    const updatedParticipants = Array(league?.participants.length);
    league?.participants.map((participant, index) => updatedParticipants[index] = {...participant, team: 'Time '+(index+1)});
    setLeague({...league, participants: updatedParticipants} as LeagueProps);
  }

  function HandleUpdateLeague(){
    const updatedLeague = {
      ...league,
    }

    Leagues.map((league, index) => {
      if(league.id === leagueID){
        Leagues[index] = updatedLeague;
      }
    });


    toggleIsLeagueSelected();
  }

  
  useEffect(() => {
    setIsLoading(true);
    
    const fetchedLeague: LeagueProps | undefined = Leagues.find(league => league.id === leagueID);
    setLeague(fetchedLeague);

    setIsLoading(false);
  }, []);


  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setLeague({...league, teams: groupParticipantsByTeam(league!.participants)} as LeagueProps);
    }, 1000);


    // setTimeout(() => {

    //   const numberOfTeams = Object.keys(league!.teams!).length;
    //   setLeague({...league, leagueSize: numberOfTeams} as LeagueProps);
    // }, 1000);

    setIsLoading(false);
  }, [league?.participants]);

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

  return (
    <div className="w-full h-full flex justify-evenly gap-4">

      {
        isEditModeActive ? 
        (
          <>
            <div className='w-2/3 h-full flex flex-col gap-2'>
              {isLoading ? (
                <h1>loading</h1>
              ) : (
                <>
                  <span className='w-fit rounded-lg flex px-2 py-1 bg-input'>
                    <input className='bg-panel p-1 rounded-lg border-0' type="text" value={league?.title} onChange={handleChangeLeagueTitle} placeholder={league?.title} />
                  </span>
                  
                  <div className="w-full h-full bg-panel-item rounded-lg flex flex-col items-start justify-start py-4 px-2 text-xl text-white gap-2 hover:drop-shadow-secondary">
                    <div className='w-full h-fit text-sm flex justify-between px-2'>
                      <span className='w-44  font-outline-1 text-start '>Participantes</span>
                    </div>
                    <div className='w-full h-full flex flex-col overflow-scroll hide-scroll-bar'>
                      <div className="flex flex-col">
                        <div className="flex gap-4 text-primary justify-start pl-2">
                          {/* <div className='flex gap-3'>
                            <span>Quantidade de times</span>
                            <span className='rounded-md text-secondary'>{league?.leagueSize}</span>
                          </div> */}

                          <div className='flex gap-2 pr-10'>
                            <label htmlFor="">Sem time, participantes solo</label>
                            <input type="checkbox" name="solo" id="solo" checked={isSoloChecked} onChange={handleSoloCheckChange} />
                          </div>
                        </div>

                        <div className='max-h-80 p-2 text-sm border border-primary overflow-scroll hide-scroll-bar'>
                          {league?.participants.map((participant, participantIndex) => (
                            <div key={participantIndex} className="flex justify-between p-1 rounded-lg items-center hover:bg-highlight hover:drop-shadow-primary">
                                <span key={participantIndex} className='text-secondary'>{participant.name}</span>
                              <div className='flex gap-3'>
                                <select className='w-86 h-8 self-start rounded-lg bg-input p-2 text-secondary focus:border-secondary' value={participant.team} onChange={(e) => handleChangeTeam(e.target.value, participantIndex)} name="team" id="team" disabled={isSoloChecked}>
                                  {
                                    [...Array(league?.participants.length)].map((_, index) => (
                                      <option className="w-24 h-10" key={index} value={'Time ' + (index+1)}>{isSoloChecked ? 'Time ' + (participantIndex+1) : 'Time '+(index+1)}</option>
                                      ))
                                  }
                                </select>
                                <button className='w-8 h-8 self-center p-1 text-xl bg-panel text-secondary rounded-full hover:drop-shadow-secondary' onClick={() => handleRemoveParticipant(participant.name)}>
                                  <img src={wasteBinIcon} alt="" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className='w-full h-fit opacity-50 text-sm flex justify-start gap-4 py-1 hover:opacity-100 hover:drop-shadow-primary hover:bg-highlight rounded-lg px-2'>
                        <input className='w-44 bg-panel p-1 rounded-lg text-xs text-secondary' value={participant.name} onChange={handleChangeParticipant} type="text" placeholder='Adicione um participante' />
                        <button className='w-9 p-1 text-xl bg-panel text-secondary rounded-full hover:drop-shadow-secondary' onClick={handleAddParticipant}>+</button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className='w-1/3 h-full flex flex-col items-center justify-around p-4'>
              <div className='h-full flex flex-col items-start justify-around'>
                <button type='button' className='w-56 h-24 flex justify-between items-center bg-input text-white text-center rounded-lg font-outline-1 border focus-within:border-secondary'>
                  {/* <img src={selectedImage === undefined ? noImage : selectedImage} className='h-20 bg-img border border-secondary rounded-lg'/> */}
                  <input className='w-full text-center p-2 bg-input text-ellipsis focus:outline-0' placeholder='Selecione o jogo' onChange={handleGameChange} value={selectedGame} />
                  <img className={isDropdownActive ? 'right-10 rotate-90 transition-all' : 'right-10 transition-all'} src={rightArrowBlue} alt="" onClick={handleToggleDropdown} />
                </button>
                {isDropdownActive && (
                  <div className='w-56 max-h-48 overflow-scroll hide-scroll-bar relative bg-input rounded-br-lg rounded-bl-lg bottom-[5rem] right-[0rem] border-x border-b border-secondary'>
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
                {/* {
                    selectedImage !== undefined &&
                  <img className='w-56 h-48 fixed z-0' src={selectedImage} alt="" />
                } */}
              </div>
                  
              <button className='w-40 h-fit rounded-lg p-2 hover:drop-shadow-primary bg-primary text-white' onClick={toggleEditMode}>Voltar</button>
            </div>
          </>

        ) : (
        <>
          <div className='w-2/3 h-full'>
            {isLoading ? (
              <h1>loading</h1>
            ) : (
              <>
                <h1>{league?.title}</h1>
                
                <div className="w-full h-full bg-panel-item rounded-lg flex flex-col items-start justify-start py-4 px-2 text-xl text-white font-outline-1 gap-2 hover:drop-shadow-secondary">
                  <div className='w-full h-fit text-sm flex justify-between px-2'>
                    <span className='w-[50%] text-start '>Participantes</span>

                    <div className='w-2/3 flex justify-between px-5'>
                      <span>V</span>
                      <span>E</span>
                      <span>D</span>
                      <span>P</span>
                    </div>
                  </div>
                  <div className='w-full h-full flex flex-col gap-1 overflow-scroll hide-scroll-bar'>
                    {
                      Object.keys(league?.teams!).map((team, teamIndex) => (
                        <div key={teamIndex} className='flex hover:drop-shadow-primary hover:bg-highlight rounded-lg px-2'>
                          <div  className='w-[50%] h-fit text-sm flex justify-between text-secondary font-outline-0 rounded-lg'>
                            <span className='w-44 text-start '>
                              {league?.teams[team].join(', ')}
                            </span>
                          </div>
                          <div className='w-2/3 text-secondary font-outline-0 text-sm flex justify-between'>
                            <LeagueStat />
                            <LeagueStat />
                            <LeagueStat />
                            <LeagueStat />
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </>
            )}
          </div>

          <div className='w-1/3 h-full flex flex-col items-center justify-around p-4'>
            <div className='flex flex-col'>
              <span>{league?.game}</span>
              <img className='w-56 h-48' src={league?.game_img} alt="" />

            </div>

            <div className='flex flex-col gap-3'>
              <button className='w-40 h-fit rounded-lg p-2 hover:drop-shadow-primary bg-primary text-white' onClick={toggleEditMode}>Editar Liga</button>
              {/* <button className='w-40 h-fit rounded-lg p-2 hover:drop-shadow-primary bg-primary text-white' onClick={toggleParticipantManager}>Gerenciar Participantes</button> */}
              <button className='w-40 h-fit rounded-lg p-2 hover:drop-shadow-primary bg-primary text-white' onClick={HandleUpdateLeague}>Voltar</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default League