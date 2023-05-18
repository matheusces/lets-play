import { useState } from "react"
import Calendar from "./Calendar"
import CreateMatchForm from "./CreateMatchForm";
import Overlay from "./Overlay";
import TournamentsPanel from "./TournamentsPanel";
import LeaguesPanel from "./LeaguesPanel";

type PanelOptions = 'calendar' | 'tournament' | 'league';


function CalendarPanel() {
  const panelOptions: PanelOptions[] = ['calendar', 'tournament', 'league'];

  const [isCreateMatchFormActive, setIsCreateMatchFormActive] = useState(false);
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

  return (
    <div className="w-[60rem] h-[36rem] bg-panel flex flex-col items-center">
      {info[currentPanel].component}
      <Calendar />
      {/* <LeaguesPanel /> */}
      {/* <TournamentsPanel /> */}
      {isCreateMatchFormActive && (
        <>
          <CreateMatchForm toggleCreateMatchForm={toggleCreateMatchForm} />
          <Overlay onClick={toggleCreateMatchForm} />
        </>
      )}
    </div>
  )
}

export default CalendarPanel