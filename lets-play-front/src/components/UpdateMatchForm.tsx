import { FormEvent, ChangeEvent, useState } from 'react';
import * as dayjs from 'dayjs';

import trophyIcon from "../assets/trophy_gold.svg";
import trophyIcon2 from "../assets/trophy.svg";
import block from '../assets/block.svg';
import addIcon from '../assets/add.svg';
import offlineIcon from '../assets/offline-icon.svg';
import wasteBinIcon from '../assets/waste-bin.svg';
import pencil from '../assets/pencil.svg';
import { MatchProps } from '../types/type';

interface handleFunctionsProps {
  editGameName: (gameName: string) => void;
  editDate: (date: string) => void;
  editTime: (time: string) => void;
  editVoiceChannel: (voiceChannel: string) => void;
  addParticipant: (participant: string) => void;
  removeParticipant: (user: string) => void;
  editDescription: (description: string) => void;
}

interface UpdateMatchFormProps {
  matchData: MatchProps;
  handle: handleFunctionsProps;
  toggleEditMode: () => void;
}

function UpdateMatchForm({ matchData, toggleEditMode, handle }: UpdateMatchFormProps) {
  const [participant, setParticipant] = useState('');
  const [updatedMatch, setUpdatedMatch] = useState<MatchProps>(matchData);

  const formattedDate = dayjs(matchData.date, 'DD/MM/YYYY').format('YYYY-MM-DD');
  console.log(formattedDate);


  function handleChangeParticipantName(e: ChangeEvent<HTMLInputElement>) {
    setParticipant(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    toggleEditMode();
    
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full h-full flex flex-col items-center px-8">
        <div className="w-full flex items-center">
          <div className="w-full flex gap-3 justify-center">
            <div className='bg-input p-1 rounded-lg'>
              <input className="text-primary font-outline-0 text-xl bg-panel rounded-lg p-1" value={matchData.game} onChange={(event) => handle.editGameName(event.target.value)} />
            </div>
            <button className="w-8 h-8">
              <img className='hover:drop-shadow-tertiary' src={trophyIcon} alt="" />
            </button>
          </div>
          <button className="flex self-end" onClick={handleSubmit}>
            <img className='h-12 right-[7%] hover:drop-shadow-primary hover:bg-highlight rounded-2xl p-2' src={pencil} alt="" />
          </button>
        </div>

        <div className='w-full h-full flex gap-4'>
          <div className='w-8/12 h-full flex flex-col gap-3'>
            <div className="w-full h-fit flex self-start items-start pt-6 gap-4">
              <div className="w-3/12 h-2/12 mt-7 self-start bg-input rounded-lg">
                <button className="w-full h-full">
                  <img className="w-full h-full" src={block} alt="" />
                </button>
              </div>

              <div className="w-3/4 h-fit flex flex-col">
                <label>Descrição</label>
                <div className="w-full h-full rounded-lg bg-input p-2">
                  <textarea className="w-full h-36 max-h-36 flex text-left p-1 rounded-lg bg-panel text-primary" value={matchData.description} onChange={(event) => handle.editDescription(event.target.value)}/>
                </div>
              </div>
            </div>

            <div className='flex gap-2'>
              <div className="w-full max-h-44 flex flex-col p-2 gap-4 justify-center overflow-hidden hide-scroll-bar">
                <div className="w-full flex items-center justify-around p-2 gap-2 bg-input rounded-lg">
                  <input className="w-full bg-panel p-2 rounded-lg" type='date' value={formattedDate} onChange={(event) => handle.editDate(event.target.value)} />
                  -
                  <input className="w-full bg-panel p-2 rounded-lg" type="time" value={matchData.time} onChange={(event) => handle.editTime(event.target.value)} />
                </div>
                <div className="w-full flex flex-col bg-input p-4 rounded-lg">
                  <label className="text-white font-outline-1">Voice Channel</label>
                    <input className="w-full p-2 rounded-lg bg-panel text-primary" type='text' value={matchData.voiceChannel} onChange={(event) => handle.editVoiceChannel(event.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <div className='h-full flex flex-col overflow-scroll hide-scroll-bar pr-2'>
            <label className='self-start' htmlFor="">Participantes</label>
            <div className='w-full flex items-center justify-between gap-2'>
              <input className='w-full h-10 rounded-lg bg-input p-2 text-ellipsis text-secondary text-lg focus:border-secondary' type="text" placeholder='Adicione um participante' value={participant} onChange={handleChangeParticipantName} />
              <button className='w-fit h-fit rounded-xl hover:drop-shadow-secondary' onClick={() => handle.addParticipant(participant)} type='button'>
                <img className='w-9 h-9' src={addIcon} alt="Plus sign" title='adicionar participante.' />
              </button>
            </div>
            <ul className='w-full h-full overflow-scroll hide-scroll-bar flex flex-col mt-4 rounded-lg bg-input p-2 text-secondary text-2xl focus:border-secondary'>
              {matchData.participants.map((user, index) => (
                <li className='w-full flex flex-row items-center justify-between gap-2' key={index}>
                  
                  <span className='w-full flex flex-row items-center gap-2 hover:drop-shadow-secondary hover:cursor-pointer'>
                    <img src={offlineIcon} alt="circulo" />
                    <span>
                      {user}
                    </span>
                  </span>

                  <button className='w-fit h-fit hover:drop-shadow-secondary hover:cursor-pointer' type='button' onClick={() => handle.removeParticipant(user)}>
                    <img className='w-8 h-7 self-end' src={wasteBinIcon} alt="icone de lata de lixo" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='w-fit flex gap-4 pb-2'>
          <button type='submit' className="w-30 h-14 text-white bg-primary rounded-md my-2 p-2 hover:drop-shadow-secondary" onClick={toggleEditMode}>Confirmar</button>
          {/* <button type='button' className="w-30 h-14 text-white bg-primary rounded-md my-2 p-2 hover:drop-shadow-secondary" onClick={toggleEditMode}>Voltar</button> */}
        </div>      
      </form>
    </>
  )
}

export default UpdateMatchForm