import PerfilPhoto from '../assets/PerfilPhoto.svg';
import notificationBell from '../assets/notification-bell.svg';
import gear from '../assets/gear.svg';
import folder from '../assets/paste.svg';
import friendListIcon from '../assets/friend-list-button.svg';
import onlineIcon from '../assets/online-icon.svg';
import offlineIcon from '../assets/offline-icon.svg';
import rightArrowPurple from '../assets/right-arrow-purple.svg';
import { useState } from 'react';
import LoginForm from './LoginForm';
import Overlay from './Overlay';
import GroupManager from './GroupManager';
import FriendManager from './FriendManager';

function Sidebar() {
  const [isLoginFormActive, setIsLoginFormActive] = useState(false);
  const [isGroupManagerActive, setIsGroupManagerActive] = useState(false);
  const [isFriendManagerActive, setIsFriendManagerActive] = useState(false);

  const [groups, setGroups] = useState<string[]>([]);
  const [friends, setFriends] = useState([]);

  function toggleLoginForm() {
    setIsLoginFormActive(!isLoginFormActive);
  }

  function toggleGroupManager() {
    setIsGroupManagerActive(!isGroupManagerActive);
  }

  function toggleFriendManager() {
    setIsFriendManagerActive(!isFriendManagerActive);
  }

  return (
    <div className="w-[297px] h-screen bg-[#0B0B0B] flex flex-col p-1 items-center justify-evenly">
      <div className="flex flex-col">
        <button className='w-28 h-28 rounded-full bg-bdr-purple flex items-center justify-center p-0.5' onClick={toggleLoginForm}>
          <img className='hover:drop-shadow-img' src={PerfilPhoto} alt="foto de perfil" />
        </button>
        <div className="flex items-center justify-evenly mt-3">
          <button>
            <img className='hover:drop-shadow-secondary' src={notificationBell} alt="notification bell icon" title='notifications' />
          </button>
          <button>
            <img className='hover:drop-shadow-secondary' src={gear} alt="gear icon for config button" title='configurations' />
          </button>
        </div>
      </div>

      {isLoginFormActive && (
        <>
          <LoginForm toggleLoginForm={toggleLoginForm} />
          <Overlay onClick={toggleLoginForm} />
        </>
      )}

      <div className="w-48 h-fit">
        <span className="uppercase">grupos</span>
        <div className="h-60 max-h-60 flex flex-col bg-blue-primary rounded-lg p-2">
          <div className="flex justify-end pt-1 pr-1">
            <button onClick={toggleGroupManager}>
              <img className='hover:drop-shadow-primary' src={folder} alt="folder icon" title='Manage Group List' />
            </button>
          </div>
          <ul className="list-none flex flex-col gap-0.5 overflow-scroll hide-scroll-bar">
            {groups.map((group, index) => (
              <li key={index} className="flex text-white font-outline-1 rounded-xl py-0.5 hover:bg-highlight">
                <button className='flex uppercase'>
                  <img src={rightArrowPurple} alt="" />
                  <span>{group}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isGroupManagerActive && ( 
       <>
        <GroupManager groups={groups} setGroups={setGroups} toggleGroupManager={toggleGroupManager} />
        <Overlay onClick={toggleGroupManager} />
       </>
      )}

      <div className="w-48 h-fit">
        <span className="uppercase">amigos</span>  
        <div className="h-60 max-h-60 flex flex-col bg-green-primary rounded-lg p-2">
          <div className="flex justify-end mt-1 mr-1">
            <button onClick={toggleFriendManager}>
              <img className='w-6 h-6 hover:drop-shadow-secondary' src={friendListIcon} alt="people with a plus icon" title='Manage Friend List' />
            </button>
          </div>
          <ul className="list-none flex flex-col gap-0.5 overflow-scroll hide-scroll-bar">
            <li>
              <button className="flex text-white font-outline-1 rounded-xl py-0.5 items-center gap-x-1 hover:drop-shadow-primary hover:cursor-pointer">
                <img className='hover:drop-shadow-secondary' src={onlineIcon} alt="" />
                <span>Matheus</span>
              </button>
            </li>
            <li>
              <button className="flex text-white font-outline-1 rounded-xl py-0.5 items-center gap-x-1 hover:drop-shadow-primary hover:cursor-pointer">
                <img className='hover:drop-shadow-primary' src={offlineIcon} alt="" />
                <span>Marcos</span>
              </button>
            </li>
            <li>
              <button className="flex text-white font-outline-1 rounded-xl py-0.5 items-center gap-x-1 hover:drop-shadow-primary hover:cursor-pointer">
                <img className='hover:drop-shadow-primary' src={offlineIcon} alt="" />
                <span>Luigge</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {isFriendManagerActive && (
        <>
          <FriendManager />
          <Overlay onClick={toggleFriendManager} />
        </>
      )}
    </div>
  )
}

export default Sidebar