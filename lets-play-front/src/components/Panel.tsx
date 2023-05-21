import { useState } from "react"
import Calendar from "./Calendar"
import CreateMatchForm from "./CreateMatchForm";
import Overlay from "./Overlay";
import LeaguesPanel from './LeaguesPanel';
import TournamentsPanel from "./TournamentsPanel";
import CreateTournamentForm from "./CreateTournamentForm";

type PanelOptions = 'calendar' | 'tournament' | 'league';

function Panel() {
  const panelOptions: PanelOptions[] = ['calendar', 'tournament', 'league'];

  const [isCreateMatchFormActive, setIsCreateMatchFormActive] = useState(false);
  const [isCreateTournamentFormActive, setIsCreateTournamentFormActive] = useState(false);
  const [currentPanel, setCurrentPanel] = useState<PanelOptions>(panelOptions[0]);

  const info = {
    'calendar': {
      title: 'Minhas partidas',
      component: <Calendar />
    },
    'tournament': {  
      title: 'Meus torneios',
      component: <TournamentsPanel />
    },
    'league': {
      title: 'Minhas ligas',
      component: <LeaguesPanel />
    }
  }

  function toggleCreateMatchForm() {
    setIsCreateMatchFormActive(!isCreateMatchFormActive);
  }

  function toggleCreateTournamentForm() {
    setIsCreateTournamentFormActive(!isCreateTournamentFormActive);
  }

  function teste() {
    console.log("1");
  }

  return (
    <div className="w-fit h-fit flex flex-col gap-2">

      <div className="flex items-center justify-between">
        <h1 className="uppercase text-primary text-2xl">{info[currentPanel].title}</h1>
        <div className="flex text-white items-center gap-6">
          <button className="uppercase w-32 h-12 rounded-2xl px-0.5 border border-bdr-purple hover:bg-primary" onClick={toggleCreateMatchForm}>Criar partida</button>
          <button className={currentPanel === 'calendar' ? 'hidden' : "uppercase w-32 h-12 rounded-2xl px-0.5 border border-bdr-purple hover:bg-primary"} onClick={currentPanel === 'calendar' ? teste : () => setCurrentPanel('calendar')}>{currentPanel === 'calendar' ? 'teste' : 'Calendário'}</button>
          <button className="uppercase w-32 h-12 rounded-2xl px-0.5 border border-bdr-purple hover:bg-primary" onClick={() => setCurrentPanel('league')}>{currentPanel === 'league' ? 'Criar liga' : 'Ligas'}</button>
          <button className="uppercase w-32 h-12 rounded-2xl px-0.5 border border-bdr-purple hover:bg-primary" onClick={currentPanel === 'tournament' ? toggleCreateTournamentForm : () => setCurrentPanel('tournament')}>{currentPanel === 'tournament' ? 'Criar torneio' : 'Torneios'}</button>
        </div>
      </div>

      <div className="w-[60rem] h-[36rem] bg-panel flex flex-col items-center">
        {info[currentPanel].component}
        {isCreateMatchFormActive && (
          <>
            <CreateMatchForm toggleCreateMatchForm={toggleCreateMatchForm} />
            <Overlay onClick={toggleCreateMatchForm} />
          </>
        )}
        {isCreateTournamentFormActive && (
          <>
            <CreateTournamentForm toggleCreateTournamentForm={toggleCreateTournamentForm} />
            <Overlay onClick={toggleCreateTournamentForm} />
          </>
        )}
      </div>
    </div>
  )
}

export default Panel