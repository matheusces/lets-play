import { useState } from "react";
import voiceChannelIcon from '../assets/voice-channel.svg';
import Overlay from "./Overlay";

interface VoiceChannelProps {
  voiceChannel: string,
  setVoiceChannel: (link: string) => void
}

function AddVoiceChannel({ voiceChannel, setVoiceChannel }:VoiceChannelProps) {
  const [isVoiceChannelInputActive, setIsVoiceChannelInputActive] = useState(false);

  function toggleVoiceChannelInput() {
    setIsVoiceChannelInputActive(!isVoiceChannelInputActive);
  }

  function clearInput() {
    setVoiceChannel('');
    toggleVoiceChannelInput();
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setVoiceChannel(value);
  };

  return (
    <>
      <button type='button' className="hover:drop-shadow-secondary" onClick={toggleVoiceChannelInput} title="Adicionar um canal de voz">
        <img className='w-12 h-12' src={voiceChannelIcon} alt="Microphone with a chat balloon icon" />
      </button>
      {isVoiceChannelInputActive && (
        <>
          <div className='w-30 h-30 border border-secondary rounded-lg bg-form absolute z-10 left-1/4 top-20 z-1 flex flex-col gap-2 text-secondary items-center text-3xl px-6 py-4'>
            <label htmlFor="">Link para a call</label>
            <input className="bg-input rounded-lg p-1.5" type="text" value={voiceChannel} onChange={handleInputChange} />
            <div className='flex gap-2'>
              <button className='bg-primary text-white rounded-lg p-1 text-lg hover:drop-shadow-secondary' type='button' onClick={toggleVoiceChannelInput}>Confirmar</button>
              <button className='bg-white text-primary rounded-lg p-1 text-lg hover:drop-shadow-secondary' type='button' onClick={clearInput}>cancelar</button>
            </div>
          </div>
          <Overlay onClick={toggleVoiceChannelInput}/>
        </>
      )}
    </>
  )
}

export default AddVoiceChannel