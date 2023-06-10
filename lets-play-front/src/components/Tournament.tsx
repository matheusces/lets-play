import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import { useEffect, useState } from 'react';

import TournamentTeamManager from './TournamentTeamManager';
import TournamentMatchManager from './TournamentMatchManager';
import Dropdown from './Dropdown';

import GlootTheme from '../utils/Themes';
import { size2 } from '../utils/TournamentSizeTemplates/size2';
import { size4 } from '../utils/TournamentSizeTemplates/size4';
import { Tournaments } from '../utils/Tournaments';
import { size8 } from '../utils/TournamentSizeTemplates/size8';
import { size16 } from '../utils/TournamentSizeTemplates/size16';
import { TournamentProps } from '../types/type';

interface TournamentComponentProps {
  tournamentID: string;
  toggleIsTournamentSelected: () => void;
}

const sizes = {
  2: size2,
  4: size4,
  8: size8,
  16: size16,
}

function Tournament({ tournamentID, toggleIsTournamentSelected }: TournamentComponentProps) {
  const [tournament, setTournament] = useState<TournamentProps>({} as TournamentProps);
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSoloChecked, setIsSoloChecked] = useState(false);
  const [isParticipantManagerActive, setIsParticipantManagerActive] = useState(true);
  const [isTeamsManagerActive, setIsTeamsManagerActive] = useState(false);
  const [isEditMatchActive, setIsEditMatchActive] = useState(false);

  function toggleEditMode() {
    setIsEditModeActive(!isEditModeActive);
  }

  function toggleManager(){
    setIsParticipantManagerActive(!isParticipantManagerActive);
    setIsTeamsManagerActive(!isTeamsManagerActive);
    // setTeams();
    // console.log('isParticipantManagerActive: ' + isParticipantManagerActive);
    // console.log('isTeamsManagerActive: ' + isTeamsManagerActive);
  }

  function toggleMatchManager(){
    setIsEditMatchActive(!isEditMatchActive);
  }

  function clearTeams() {
    const updatedParticipants = Array(tournament.participants.length);
    tournament.participants.map((participant, index) => updatedParticipants[index] = {...participant, team: 'Time 1'});
    setTournament({...tournament, participants: updatedParticipants});
  }

  function updateTeams(){
    if(isSoloChecked === true){
      clearTeams();
    } 
    else {
      const updatedParticipants = Array(tournament.participants.length);
      tournament.participants.map((participant, index) => updatedParticipants[index] = {...participant, team: 'Time '+(index+1)});
      setTournament({...tournament, participants: updatedParticipants});
    }
  }

  function handleSoloCheckChange() {
    setIsSoloChecked(!isSoloChecked);
    updateTeams();
  }

  // function updateeTeams(participants: participantProps[], teams: TeamInfoProps[]): TeamInfoProps[] {
  //   const updatedTeams: TeamInfoProps[] = [...teams];
  
  //   participants.forEach((participant) => {
  //     const teamIndex = updatedTeams.findIndex((team) => team.name === participant.team);
  
  //     if (teamIndex !== -1) {
  //       const playerIndex = updatedTeams[teamIndex].players.indexOf(participant.name);
  
  //       if (playerIndex === -1) {
  //         updatedTeams[teamIndex].players.push(participant.name);
  //       }
  //     } else {
  //       updatedTeams.push({
  //         id: updatedTeams.length + 1,
  //         name: participant.team,
  //         players: [participant.name],
  //       });
  //     }
  //   });
  
  //   return updatedTeams;
  // }

  function handleChangeTeam(team: string, participantIndex: number, ) {
    const previousTeam = tournament.participants[participantIndex].team;

    const updatedParticipant = {
      name: tournament.participants[participantIndex].name,
      team,
    };

    const updatedParticipants = tournament.participants.map((participant, index) => index === participantIndex ? updatedParticipant : participant);
    
    const updatedTournament = {...tournament, participants: updatedParticipants};
    
    setTournament(updatedTournament);

    const participant = tournament.participants[participantIndex].name;

    // console.log(updateeTeams(updatedParticipants, tournament.teams));

    // console.log(tournament.teams);
  }

  // useEffect(() => {
  //   syncTeamsWithParticipants();
  // }, [tournament.participants]);


  function handleTournamentSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newTournamentSize = e.target.value;
    setTournament({ ...tournament, tournamentSize: parseInt(newTournamentSize) });
  }

  useEffect(() => {
    const fetchedTournament: TournamentProps = Tournaments.find(tournament => tournament.id === tournamentID);
    setTournament(fetchedTournament);
    
    setIsLoading(false);      
  }, []);
  
  return (
    <div className='w-full h-full flex items-center justify-center'>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        isEditModeActive ? (
          <div className='w-full h-full p-8 flex flex-col gap-1'>
            <div className='flex justify-end'>
              <button className='w-fit p-1 bg-primary rounded-md text-white' onClick={toggleEditMode}>Salvar</button>
            </div>
            <div className='flex h-full w-full gap-2'>
              <div className='flex flex-col items-center gap-2'>
                <div className='flex flex-col gap-1'>
                  <h1 className='text-secondary text-xl self-start'>Título</h1>
                  <span className='p-2 bg-input rounded-md'>
                    <input className='bg-panel p-1 rounded-md' type="text" placeholder={tournament?.title} />
                  </span>
                </div>
                <div className='flex flex-col gap-2 items-center'>
                  <h1 className='self-start text-xl text-secondary'>Jogo</h1>
                  <Dropdown tournament={tournament} setTournament={setTournament} />
                </div>
                <img className='w-52 drop-shadow-primary border border-secondary hover:drop-shadow-secondary z-0' src={tournament?.game_img} alt="" />
              </div>

              <div className='w-9/12 p-4 rounded-md flex flex-col bg-input'>
                <div className='w-full flex items-center justify-center pt-2 pb-4 text-secondary gap-2'>
                  <span>
                    Gerencie os 
                  </span>
                  <div>
                    <button className={isParticipantManagerActive ? 'w-fit rounded-s-full bg-panel-item drop-shadow-secondary p-1' : 'w-fit rounded-s-full text-white bg-panel p-1'} onClick={toggleManager}>
                      participantes
                    </button> 
                    <button className={isTeamsManagerActive ? 'w-fit rounded-e-full bg-panel-item drop-shadow-secondary p-1' : 'w-fit rounded-e-full text-white bg-panel p-1'} onClick={toggleManager}>
                      times
                    </button>
                  </div>
                </div>
        
                <div className="flex flex-col">

                  <div className="flex gap-4 text-primary mb-8">

                    {
                      isParticipantManagerActive && (
                        <>
                        <span>Quantidade de times</span>
                          <select className='rounded-md' name="teams" id="teams" value={tournament?.tournamentSize} onChange={handleTournamentSizeChange} disabled={isSoloChecked}>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="8">8</option>
                            <option value="16">16</option>
                            <option value="32">32</option>
                          </select>
                          <label htmlFor="">Solo</label>
                          <input type="checkbox" name="solo" id="solo" checked={isSoloChecked} onChange={handleSoloCheckChange} />
                        </>
                      )
                    }
                    {/* <button onClick={setTeams}>Atualizar Times</button> */}
                  </div>

                  <div className='max-h-72 border border-primary p-2 overflow-scroll hide-scroll-bar'>
                    {
                      isParticipantManagerActive ? (
                        tournament?.participants.map((participant, participantIndex) => (
                        <div key={participantIndex} className="grid grid-cols-2 p-1 rounded-lg items-center hover:bg-panel hover:drop-shadow-primary">
                          <span className='text-secondary'>{participant.name}</span>
                          <select className='w-86 h-10 self-start rounded-lg bg-panel p-2 text-secondary text-2xl focus:border-secondary' value={participant.team} onChange={(e) => handleChangeTeam(e.target.value, participantIndex)} name="team" id="team" disabled={isSoloChecked}>
                            {
                              [...Array(tournament?.tournamentSize)].map((_, index) => (
                                <option className="w-24 h-10" key={index} value={'Time ' + (index+1)}>{isSoloChecked ? 'Time ' + (participantIndex+1) : 'Time '+(index+1)}</option>
                                ))
                            }
                          </select>
                        </div>
                      ))) : (
                        <TournamentTeamManager tournament={tournament} setTournament={setTournament} />
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          ) : (
          <div className='flex flex-col gap-3'>
            <div className='flex gap-2 items-center justify-between'>
              <div className='flex flex-col items-center'>
                <h1 className='text-lg text-white font-outline-1 hover:drop-shadow-primary'>{tournament?.title}</h1>
                <h2 className='text-xs text-secondary hover:drop-shadow-secondary'>{tournament?.game}</h2>
              </div>
              <div className='flex flex-col'>
                <span>Número de times: {tournament?.tournamentSize}</span>
                <span>Número de participantes: {tournament?.participants.length}</span>
              </div>
              <div className='flex gap-2'>
                <button className='w-fit p-1 bg-primary rounded-md text-white hover:drop-shadow-primary' onClick={toggleEditMode}>Editar Torneio</button>
                <button className='w-fit p-1 bg-primary rounded-md text-white hover:drop-shadow-primary' onClick={toggleIsTournamentSelected}>voltar</button>
              </div>
            </div>
            <button className='relative' onClick={toggleMatchManager}>
              <SingleEliminationBracket
                matches={tournament?.matches}
                matchComponent={Match}
                svgWrapper={({ children, ...props }) => (
                  <SVGViewer SVGBackground={GlootTheme.svgBackground}  width={900} height={500} {...props}>
                    {children}
                  </SVGViewer>
                )}
              />
            </button>
            {
              isEditMatchActive && (
                <TournamentMatchManager tournament={tournament} setTournament={setTournament} toggleMatchManager={toggleMatchManager} />
              )
            }
          </div>
        )
      )}
    </div>
  )
}

export default Tournament