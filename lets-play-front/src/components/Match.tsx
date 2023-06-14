import { useState } from 'react';
import 'dayjs/locale/pt-br';
import * as dayjs from 'dayjs';

import block from '../assets/block.svg';
import trophyIcon from "../assets/trophy_gold.svg";
import trophyIcon2 from "../assets/trophy_grad.svg";
import offlineIcon from '../assets/offline-icon.svg';
import pencil from '../assets/pencil.svg';

import UpdateMatchForm from './UpdateMatchForm';
import { MatchProps } from '../types/type';

interface MatchComponentProps {
  match: MatchProps;
  handleToggleMatchList: () => void;
}


function Match({ match, handleToggleMatchList }: MatchComponentProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [matchData, setMatchData] = useState<MatchProps>(match);
  const [isTournament, setIsTournament] = useState(false);
  const [isLeague, setIsLeague] = useState(true);

  function toggleEditMode() {
    setIsEditMode(!isEditMode);
  }

  function editMatch(matchData: MatchProps) {
    setMatchData(matchData);
  }

  function editGameName(gameName: string) {
    setMatchData(prevMatchData => ({ ...prevMatchData, game: gameName }));
  }

  function editDate(date: string) {
    setMatchData(prevMatchData => ({ ...prevMatchData, date: date }));
  }

  function editTime(time: string) {
    setMatchData(prevMatchData => ({ ...prevMatchData, time: time }));
  }

  function addParticipant(participant: string) {
    setMatchData(prevMatchData => ({ ...prevMatchData, participants: [...prevMatchData.participants, participant] }));
  }

  function removeParticipant(user: string) {
    setMatchData(prevMatchData => ({ ...prevMatchData, participants: prevMatchData.participants.filter(participant => participant !== user) }));
  }

  function editVoiceChannel(voiceChannel: string) {
    setMatchData(prevMatchData => ({ ...prevMatchData, voiceChannel: voiceChannel }));
  }

  function editDescription(description: string) {
    setMatchData(prevMatchData => ({ ...prevMatchData, description: description }));
  }

  return (
    <>
      {isEditMode ? (
        <UpdateMatchForm matchData={matchData} handle={{ editGameName, editDate, editTime, addParticipant, removeParticipant, editVoiceChannel, editDescription }} toggleEditMode={toggleEditMode} />
      ) : (
        <div className="w-full h-full flex flex-col items-center px-8">
          <div className="w-full flex items-center">
            <button className="w-30 h-10 text-white bg-primary rounded-md my-2 p-2 hover:drop-shadow-primary" onClick={handleToggleMatchList}>Voltar</button>
            <div className="w-full flex gap-3 justify-center">
              <h1 className="text-white font-outline-1 text-3xl hover:drop-shadow-primary">
                {matchData.game}
              </h1>
              {(isTournament || isLeague) && (
                <button className="w-8 h-8">
                  <img className={isTournament ? 'hover:drop-shadow-tertiary' : 'hover:drop-shadow-secondary'} src={isTournament ? trophyIcon : trophyIcon2} alt="" />
                </button>
              )}
            </div>
            <button className="flex self-end" onClick={toggleEditMode}>
              <img className='h-12 right-[7%] hover:drop-shadow-primary hover:bg-highlight rounded-2xl p-2' src={pencil} alt="" />
            </button>
          </div>

          <div className='w-full h-full flex gap-3'>
            <div className='w-8/12 h-full flex flex-col gap-3'>
              <div className="w-full h-fit flex self-start items-start pt-6 gap-4">
                <div className="w-3/12 h-2/12 mt-7 self-start bg-input rounded-lg">
                  <button className="w-full h-full">
                    <img className="w-full h-full" src={block} alt="" />
                  </button>
                </div>

                <div className="w-3/4 h-fit flex flex-col">
                  <span>Descrição</span>
                  <p className="w-full h-40 p-4 rounded-lg bg-input text-white font-outline-1">{matchData.description}</p>
                </div>

              </div>
              <div className='w-full flex gap-2'>
                <div className=" w-full flex flex-col gap-2">
                  <div className="w-full flex items-center justify-around p-2 gap-4 bg-input rounded-lg">
                    <span className="w-full bg-panel p-2 rounded-lg">{matchData.date}</span>
                    -
                    <span className="w-full bg-panel p-2 rounded-lg">{matchData.time}</span>
                  </div>
                  <div className="w-full flex flex-col self-start bg-input p-4 rounded-lg">
                    <label className="text-white font-outline-1">Voice Channel</label>
                    <span className="p-2 bg-panel rounded-lg text-input hover:cursor-default">{matchData.voiceChannel}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-4/12 h-full flex flex-col p-2 overflow-hidden hide-scroll-bar">
              <span>Participantes</span>
              <div className="w-full h-full flex p-2 bg-input rounded-lg">
                <ul className="w-full h-full overflow-scroll hide-scroll-bar flex flex-col rounded-lg bg-input p-2 text-secondary text-2xl focus:border-secondary">
                  {matchData.participants.map((user, index) => (
                    <li className='w-full flex flex-row items-center justify-between gap-2' key={index}>  
                      <span className='w-full flex flex-row items-center gap-2 hover:drop-shadow-secondary hover:cursor-pointer'>
                        <img src={offlineIcon} alt="circulo" />
                        <span>
                          {user}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>  
            </div>

          </div>

        </div>
      )}
    </>
  )
}

export default Match;