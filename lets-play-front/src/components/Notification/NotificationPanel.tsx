import FriendInvite from "../FriendInvite";
import GroupInvite from "./GroupInvite";
import LeagueInvite from "./LeagueInvite";
import MatchInvite from "./MatchInvite";
import TournamentInvite from "./TournamentInvite";


interface NotificationPanelProps {
  togglePanel: () => void;
}

function NotificationPanel({ togglePanel }: NotificationPanelProps) {

  return (
    <div className='w-[30rem] h-96 absolute left-[36%] top-[15%] flex flex-col gap-2 bg-input-panel border border-highlight text-secondary p-2 rounded-md items-center z-10'>
      <h1 className='text-white font-outline-1'>Notificações</h1>
      <div className='w-[90%] overflow-scroll hide-scroll-bar'>
        <ul className='list-none flex flex-col gap-3 p-2'>
          <FriendInvite sender='João' />
          <FriendInvite sender='João' />
          <FriendInvite sender='Matheus' />
          <MatchInvite game='League of Legends' sender='João' />
          <GroupInvite groupName='Grupo do João' sender='João' />
          <LeagueInvite game='League of Legends' sender='João' />
          <TournamentInvite game='League of Legends' sender='João' />
        </ul>
      </div>

      <button className='bg-form rounded-md p-2 text-secondary hover:drop-shadow-secondary' onClick={() => togglePanel()}>Fechar</button>
    </div>
  )
}

export default NotificationPanel