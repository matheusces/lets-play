import { useState, useEffect } from 'react';

import { GroupProps, LeagueProps, MatchProps, TournamentProps } from "../types/type";
import { groups } from '../utils/Groups';

import GroupLeaguesList from './GroupLeagueList';
import GroupMatchList from './GroupMatchList';
import GroupTournamentsList from './GroupTournamentList';

import onlineIcon from '../assets/online-icon.svg';
import participantsIcon from '../assets/participants.svg';
import closeIcon from '../assets/cross-mark.svg';
import hourglassIcon from '../assets/hourglass.gif';
import wasteBinIcon from '../assets/waste-bin.svg';
import Match from './Match';
import League from './League';
import Tournament from './Tournament';


interface GroupPanelProps {
  groupID: string;
}

function GroupPanel({ groupID }: GroupPanelProps) {
  const [group, setGroup] = useState<GroupProps>();
  const [newParticipant, setNewParticipant] = useState('');
  const [tabSelected, setTabSelected] = useState<'matches'|'leagues'|'tournaments'>('matches');
  const [isLoading, setIsLoading] = useState(true);
  const [isParticipantsLoading, setIsParticipantsLoading] = useState(false);
  const [isParticipantsListActive, setIsParticipantsListActive] = useState(false);

  const [isMatchSelected, setIsMatchSelected] = useState(false);
  const [isLeagueSelected, setIsLeagueSelected] = useState(false);
  const [isTournamentSelected, setIsTournamentSelected] = useState(false);

  const [match, setMatch] = useState<MatchProps>();
  const [league, setLeague] = useState<string>();
  const [tournament, setTournament] = useState<string>();

  const [selectedElement, setSelectedElement] = useState<string | null>(null);


  const elementSelected = {
    'match': {
      component: <Match match={match!}  handleToggleMatchList={handleToggleMatchList}/>
    },
    'league': {
      component: <League leagueID={league!} toggleIsLeagueSelected={handleToggleLeagueList}/>
    },
    'tournament': {
      component: <Tournament tournamentID={tournament!} toggleIsTournamentSelected={handleToggleTournamentList}/>
    }
  }

  function handleToggleMatchList() {
    setIsMatchSelected(!isMatchSelected);
    isMatchSelected ? setSelectedElement(null) : setSelectedElement('match');
  }

  function handleToggleLeagueList() {
    setIsLeagueSelected(!isLeagueSelected);
    isLeagueSelected ? setSelectedElement(null) : setSelectedElement('league');
  }

  function handleToggleTournamentList() {
    setIsTournamentSelected(!isTournamentSelected);
    isTournamentSelected ? setSelectedElement(null) : setSelectedElement('tournament');
  }

  function handleSelectMatch(match: MatchProps){
    setMatch(match);
    handleToggleMatchList();
  }

  function handleSelectLeague(league: string){
    setLeague(league);
    handleToggleLeagueList();
  }

  function handleSelectTournament(tournament: string){
    setTournament(tournament);
    handleToggleTournamentList();
  }

  function handleSelectMatchTab(){
    setTabSelected('matches');
    setSelectedElement(null);
  }

  function handleSelectLeagueTab(){
    setTabSelected('leagues');
    setSelectedElement(null);
  }

  function handleSelectTournamentTab(){
    setTabSelected('tournaments');
    setSelectedElement(null);
  }

  function toggleParticipantsList() {
    setIsParticipantsListActive(!isParticipantsListActive);
  }

  function handleRemoveParticipant(participantName: string){
    const newParticipantsList = group?.participants.filter(participant => participant !== participantName);
    setGroup({...group, participants: newParticipantsList});
    groups.find(group => group.id === groupID)!.participants = newParticipantsList!;
  }

  function handleAddParticipant(participantName: string){
    setIsLoading(true);
    setIsParticipantsLoading(true);

    group?.participants.push(participantName);
    setNewParticipant('');

    setTimeout(() => {
      setIsLoading(false);
      setIsParticipantsLoading(false);
    }, 1000);
  }

  function handleChangeNewParticipant(event: React.ChangeEvent<HTMLInputElement>){
    setNewParticipant(event.target.value);
  }

  function handleEnterKeyPress(event: React.KeyboardEvent<HTMLInputElement>){
    if(event.key === 'Enter'){
      handleAddParticipant(newParticipant);
    }
  }

  useEffect(() => {
    const fetchedGroup = groups.find(group => group.id === groupID);
    
    setGroup(fetchedGroup)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [groups])


  return (
    <>
      <div className="w-[60rem] h-[36rem] bg-panel flex flex-col items-center gap-4 p-8 hide-scroll-bar ">
        <div className='w-full flex items-center justify-center gap-4'>
          <div className="flex gap-4">
            <button 
              className={tabSelected === 'matches' 
              ?  'px-3 py-1 bg-panel rounded-lg text-secondary drop-shadow-secondary border border-secondary' 
              : 'px-3 py-1 bg-panel rounded-lg border border-primary hover:drop-shadow-secondary hover:border-secondary hover:text-secondary'}
              onClick={handleSelectMatchTab}  
            >
              Partidas
            </button>
            <button 
              className={tabSelected === 'leagues'
              ? 'px-3 py-1 bg-panel rounded-lg text-secondary drop-shadow-secondary border border-secondary'
              : 'px-3 py-1 bg-panel rounded-lg border border-primary hover:drop-shadow-secondary hover:border-secondary hover:text-secondary'}
              onClick={handleSelectLeagueTab}
            >
              Ligas
            </button>
            <button 
              className={tabSelected === 'tournaments' 
              ? 'px-3 py-1 bg-panel rounded-lg text-secondary drop-shadow-secondary border border-secondary'
              : 'px-3 py-1 bg-panel rounded-lg border border-primary hover:drop-shadow-secondary hover:border-secondary hover:text-secondary'}
              onClick={handleSelectTournamentTab}
            >
              Torneios
            </button>
          </div>
          <button className='flex items-end self-end hover:drop-shadow-primary' onClick={toggleParticipantsList}>
            {!isLoading && (
              <span className='text-4xl text-white font-outline-1 drop-shadow-logo'>{group?.participants.length}</span>
            )}
            <img className='h-12 drop-shadow-logo' src={participantsIcon} alt="" />
          </button>
        </div>

        <div className="w-full h-full flex flex-col items-center overflow-scroll hide-scroll-bar">
          {
            isLoading ? (
              <h1>Loading...</h1>
            ) : (
              selectedElement ? (
                elementSelected[selectedElement]?.component
              ) : (
                <div>
                  { tabSelected === 'matches' &&(
                      <GroupMatchList matches={group!.matches} handleToggleMatchSelected={handleSelectMatch} />
                    )
                  }
                  {
                    tabSelected === 'leagues' && (
                      <GroupLeaguesList leagues={group!.leagues} handleSelectLeague={handleSelectLeague} />
                    )
                  }
                  {
                    tabSelected === 'tournaments' && (
                      <GroupTournamentsList tournaments={group!.tournaments} handleSelectTournament={handleSelectTournament} />
                    )
                  }
                </div>
              )
            )
          }
          {isParticipantsListActive && (
                  <>
                    <div className='w-60 h-[35rem] right-[19%] top-[17%] flex flex-col gap-4 absolute bg-input drop-shadow-logo rounded-lg p-4 z-10'>
                      <div className="w-full flex flex-row-reverse">
                        <button type='button' className="w-fit flex" onClick={toggleParticipantsList} title="Fechar painel de participantes">
                          <img className='w-8 hover:drop-shadow-logo hover:bg-highlight p-1 rounded-lg' src={closeIcon} alt="Close List" title='Fechar lista' />
                        </button>
                      </div>
                      <div className='flex gap-2'>
                        <input disabled={isParticipantsLoading} className='w-2/3 text-sm bg-panel rounded-md px-1' value={newParticipant} onKeyDown={handleEnterKeyPress} onChange={(e) => handleChangeNewParticipant(e)} type="text" placeholder='Convide um amigo' />
                        <button disabled={isParticipantsLoading} className='w-fit p-1 self-center rounded-lg flex bg-primary text-white' onClick={() => handleAddParticipant(newParticipant)}>Enviar</button>
                      </div>
                      <ul className='flex flex-col gap-2 p-0 text-white font-outline-1 overflow-scroll hide-scroll-bar'>
                        {
                          isParticipantsLoading ? (
                            <h1>Loading...</h1>
                          ) : (
                            group!.participants.map((participant, index) => (
                              <li key={index} className='flex items-center justify-between hover:drop-shadow-primary'>
                                <div className='flex gap-1'>
                                  <img className='w-7 h-7' src={onlineIcon} alt="ampulheta" title='aceitação pendente'/>
                                  <span className='self-end'>
                                    {participant}
                                  </span>
                                </div>
                                <button className='border border-input rounded-md p-0.5 hover:border-secondary hover:drop-shadow-secondary' onClick={() => handleRemoveParticipant(participant)}>
                                  <img className='h-8' src={wasteBinIcon} alt="" />
                                </button>
                              </li>
                            ))
                          )
                        }
                      </ul>
                    </div>
                  </>
                )}
        </div>
        
      </div>    
    </>
  )
}

export default GroupPanel