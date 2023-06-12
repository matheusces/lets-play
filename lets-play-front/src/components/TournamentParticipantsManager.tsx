import { ChangeEvent, useState } from 'react';
import { ParticipantProps } from '../types/type';

interface TournamentParticipantsManagerProps {
  participants: ParticipantProps[],
  tournamentSize: number;
  isSoloChecked: boolean;
  setIsSoloChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setParticipants: React.Dispatch<React.SetStateAction<ParticipantProps[]>>;
  handleChangeTournamentSize: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleToggleParticipantsManager: () => void;
}

function TournamentParticipantsManager({participants, tournamentSize, setParticipants, isSoloChecked, setIsSoloChecked, handleChangeTournamentSize, handleToggleParticipantsManager }: TournamentParticipantsManagerProps) {
  // const [isSoloChecked, setIsSoloChecked] = useState(false);

  function handleTournamentSizeChange(event: ChangeEvent<HTMLSelectElement>) {
    clearTeams();
    handleChangeTournamentSize(event);
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

  function handleDone() {
    handleToggleParticipantsManager();
    // console.log(participants);
    // console.log(isSoloChecked);
  }


  return (
    <div className="w-[42rem] h-[35rem] max-h-[35rem] flex flex-col absolute left-0 bottom-0 bg-form p-6 z-10">
      <h1 className='w-full flex justify-center pt-2 pb-4'>Gerencie os participantes</h1>
      
      <div className="flex flex-col">

        <div className="flex gap-4 text-primary mb-8">
          <span>Quantidade de times</span>
            <select className='rounded-md' name="teams" id="teams" value={tournamentSize} onChange={handleTournamentSizeChange} disabled={isSoloChecked}>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="32">32</option>
            </select>

          <label htmlFor="">Solo</label>
          <input type="checkbox" name="solo" id="solo" checked={isSoloChecked} onChange={handleSoloCheckChange} />
        </div>

        <div className='max-h-72 border border-primary p-2 overflow-scroll hide-scroll-bar'>
          {participants.map((participant, participantIndex) => (
            <div key={participantIndex} className="grid grid-cols-2 p-1 rounded-lg items-center hover:bg-highlight hover:drop-shadow-primary">
              <span>{participant.name}</span>
              <select className='w-86 h-10 self-start rounded-lg bg-input p-2 text-secondary text-2xl focus:border-secondary' value={participant.team} onChange={(e) => handleChangeTeam(e.target.value, participantIndex)} name="team" id="team" disabled={isSoloChecked}>
                {
                  [...Array(tournamentSize)].map((_, index) => (
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
  )
}

export default TournamentParticipantsManager