import pencil from '../assets/pencil.svg';
import PerfilPhoto from '../assets/PerfilPhoto.svg';
import { ChangeEvent, useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';

interface ConfigPanelProps {
  toggleConfigPanel: () => void;
}

function ConfigPanel({ toggleConfigPanel }: ConfigPanelProps) {
  const [isEditNick, setIsEditNick] = useState(false);
  const [isEditEmailActive, setIsEditEmailActive] = useState(false);
  const [isEditPasswordActive, setIsEditPasswordActive] = useState(false);

  const [selectedImage, setSelectedImage] = useState<string | undefined>(PerfilPhoto);

  const { userImg, setUserImg } = useContext(UserContext);

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    file && setSelectedImage(URL.createObjectURL(file));
  };


  function toggleEditNick() {
    setIsEditNick(!isEditNick);
  }

  function toggleEditEmail() {
    setIsEditEmailActive(!isEditEmailActive);
  }

  function toggleEditPassword() {
    setIsEditPasswordActive(!isEditPasswordActive);
  }

  function handleSave() {
    setUserImg(selectedImage || '');
    toggleConfigPanel();
  }

  return (
    <div className='w-[30rem] h-[25rem] absolute left-[36%] top-[15%] flex flex-col gap-2 bg-input-panel border border-highlight text-secondary p-2 pt-6 rounded-md items-center overflow-scroll hide-scroll-bar z-10'>
      
      <div className='flex flex-col gap-2 items-center'> 
        <div className='w-28 h-28 rounded-full bg-bdr-purple flex items-center justify-center overflow-hidden'>
          <img title='alterar imagem' className='w-full h-full rounded-full hover:drop-shadow-img' src={userImg.length > 0 ? userImg : selectedImage} alt="foto de perfil" />
        </div>
        <input className='flex bg-primary text-white w-56 text-xs items-center h-5 rounded-lg hover:cursor-pointer' type="file" onChange={handleImageUpload} accept="image/*" />

        <div className='flex gap-1 items-center'>
         {isEditNick ? (
            <>
              <input disabled={!isEditNick} className="w-36 bg-input px-2 rounded-md" placeholder="Nick" />
              <button className='bg-highlight p-1 rounded-md flex gap-1' onClick={toggleEditNick}>OK</button>
            </>
         ):(
          <>
            <h1 className='pl-4' >NICKNAME</h1>
            <button onClick={toggleEditNick}>
              <img className='h-7 hover:drop-shadow-primary hover:bg-highlight rounded-md p-1' src={pencil} alt="" />
            </button>
          </>
         )}


        </div>
      </div>

      <>
        <div className="flex items-center gap-2">
          {isEditEmailActive ? (
            <>
              <input disabled={!isEditEmailActive} className="bg-input px-2 rounded-md" type="email" placeholder='email' />
              <button className='bg-highlight p-1 rounded-md flex gap-1' onClick={toggleEditEmail}>OK</button>
            </>
          ) : (
            <>
              <span>Email@email.com</span>
              <button onClick={toggleEditEmail}>
                <img className='h-7 hover:drop-shadow-primary hover:bg-highlight rounded-md p-1' src={pencil} alt="" />
              </button>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isEditPasswordActive ? (
            <div className='flex flex-col items-center gap-1'>
              <label htmlFor="">Nova senha</label>
              <input disabled={!isEditPasswordActive} className="bg-input px-2 rounded-md" placeholder='password' type="password" />
              <label htmlFor="">Confirme a Nova senha</label>
              <input disabled={!isEditPasswordActive} className="bg-input px-2 rounded-md" placeholder='password' type="password" />
              <button className='w-fit rounded-md p-2 bg-form text-white hover:bg-primary' onClick={toggleEditPassword}>Confirmar</button>
            </div>

          ) : (
            <>
              <button className='rounded-md p-2 bg-primary text-white hover:drop-shadow-primary' onClick={toggleEditPassword}>Mudar senha</button>
              <button className='rounded-md p-2 bg-primary text-white hover:drop-shadow-primary' onClick={handleSave}>Salvar</button>
            </>
          )}
        </div>
      </>
    </div>
  )
}

export default ConfigPanel;