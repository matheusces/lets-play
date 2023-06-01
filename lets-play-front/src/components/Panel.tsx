import { useState, useContext, useEffect } from 'react';
import Calendar from "./Calendar"
import CreateMatchForm from "./CreateMatchForm";
import Overlay from './Overlay';
import LeaguesPanel from './LeaguesPanel';
import TournamentsPanel from "./TournamentsPanel";
import CreateTournamentForm from "./CreateTournamentForm";
import DayContext from "../contexts/DayContext";
import DayMatchsPanel from './DayMatchsPanel';
import CreateLeagueForm from './CreateLeagueForm';

type PanelOptions = 'calendar' | 'tournament' | 'league' | 'day';

function Panel() {
  const panelOptions: PanelOptions[] = ['calendar', 'tournament', 'league', 'day'];

  const [isCreateMatchFormActive, setIsCreateMatchFormActive] = useState(false);
  const [isCreateLeagueFormActive, setIsCreateLeagueFormActive] = useState(false);
  const [isCreateTournamentFormActive, setIsCreateTournamentFormActive] = useState(false);
  const [currentPanel, setCurrentPanel] = useState<PanelOptions>(panelOptions[0]);

  const { selectedDay, setSelectedDay, isDaySelected, setIsDaySelected } = useContext(DayContext);

  const info = {
    'calendar': {
      title: 'Meu calendário',
      component: <Calendar />
    },
    'tournament': {  
      title: 'Meus torneios',
      component: <TournamentsPanel />
    },
    'league': {
      title: 'Minhas ligas',
      component: <LeaguesPanel />
    },
    'day': {
      title: 'Partidas do dia',
      component: <DayMatchsPanel />
    }
  }

  function toggleCreateMatchForm() {
    setIsCreateMatchFormActive(!isCreateMatchFormActive);
  }

  function toggleCreateLeagueForm() {
    setIsCreateLeagueFormActive(!isCreateLeagueFormActive);
  }

  function toggleCreateTournamentForm() {
    setIsCreateTournamentFormActive(!isCreateTournamentFormActive);
  }

  function handleChangePanel(panel: PanelOptions) {
    setCurrentPanel(panel);
    setIsDaySelected(false);
  }

  function teste() {
    console.log("1");
  }

  useEffect(() => {
    if (isDaySelected) {
      setCurrentPanel('day');
    }
  }, [isDaySelected]);

  return (
    <div className="w-fit h-fit flex flex-col gap-2">

      <div className="flex items-center justify-between">
        <h1 className="uppercase text-primary text-2xl">{info[currentPanel].title}</h1>
        <div className="flex text-white items-center gap-6">
          <button className="uppercase w-32 h-12 rounded-2xl px-0.5 border border-bdr-purple hover:bg-primary" onClick={toggleCreateMatchForm}>Criar partida</button>
          <button className={currentPanel === 'calendar' ? 'hidden' : "uppercase w-32 h-12 rounded-2xl px-0.5 border border-bdr-purple hover:bg-primary"} onClick={currentPanel === 'calendar' ? teste : () => handleChangePanel('calendar')}>{currentPanel === 'calendar' ? '' : 'Calendário'}</button>
          <button className="uppercase w-32 h-12 rounded-2xl px-0.5 border border-bdr-purple hover:bg-primary" onClick={currentPanel === 'league' ? toggleCreateLeagueForm : () => handleChangePanel('league')}>{currentPanel === 'league' ? 'Criar liga' : 'Ligas'}</button>
          <button className="uppercase w-32 h-12 rounded-2xl px-0.5 border border-bdr-purple hover:bg-primary" onClick={currentPanel === 'tournament' ? toggleCreateTournamentForm : () => handleChangePanel('tournament')}>{currentPanel === 'tournament' ? 'Criar torneio' : 'Torneios'}</button>
        </div>
      </div>

      <div className="w-[60rem] h-[36rem] bg-panel flex flex-col items-center">

        {/* {isDaySelected ? <DayMatchsList /> : info[currentPanel].component} */}
        {info[currentPanel].component}

        {isCreateMatchFormActive && (
          <>
            <CreateMatchForm toggleCreateMatchForm={toggleCreateMatchForm} />
            <Overlay onClick={toggleCreateMatchForm} />
          </>
        )}
        {isCreateLeagueFormActive && (
          <>
            <CreateLeagueForm toggleCreateLeagueForm={toggleCreateLeagueForm} />
            <Overlay onClick={toggleCreateLeagueForm} />
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