import { ChangeEvent, useState } from 'react';

interface TournamentParticipantsManagerProps {
  participants: string[],
  tournamentSize: number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

function TournamentParticipantsManager({ participants, tournamentSize, onChange }: TournamentParticipantsManagerProps) {
  const [isSoloChecked, setIsSoloChecked] = useState(false);

  function handleTournamentSizeChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange(event);
  }

  function handleSoloCheckChange(event: ChangeEvent<HTMLInputElement>) {
    setIsSoloChecked(event.target.checked);
  }

  return (
    <div className="w-[42rem] h-[35rem] max-h-[35rem] overflow-scroll hide-scroll-bar absolute left-0 bottom-0 bg-form p-6 z-10">
      <h1 className='w-full flex justify-center pt-2 pb-4'>Gerencie os participantes</h1>
      
      <div className="flex flex-col">

        <div className="flex gap-4 text-primary mb-8">
          <span>Quantidade de times</span>
          <select name="teams" id="teams" value={tournamentSize} onChange={handleTournamentSizeChange} disabled={isSoloChecked}>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="32">32</option>
          </select>

          <label htmlFor="">Solo</label>
          <input type="checkbox" name="solo" id="solo" checked={isSoloChecked} onChange={handleSoloCheckChange} />
        </div>


        {participants.map((participant, index) => (
          <div key={index} className="grid grid-cols-2 items-center">
            <span>{participant}</span>
            <select name="team" id="team">
              {
                [...Array(tournamentSize)].map((_, index) => (
                  <option className="w-24 h-10" key={index} value={'Time'+index}>Time {index}</option>
                ))
              }
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TournamentParticipantsManager