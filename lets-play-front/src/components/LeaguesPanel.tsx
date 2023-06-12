import { useState } from "react";
import LeaguesList from "./LeaguesList";
import League from "./League";

function LeaguesPanel() {
  const [isLeagueSelected, setIsLeagueSelected] = useState(false);
  const [selectedLeagueID, setSelectedLeagueID] = useState('');

  function toggleIsLeagueSelected() {
    setIsLeagueSelected(!isLeagueSelected);
  }

  return (
    <div className="w-[60rem] h-[36rem] bg-panel flex flex-col items-center gap-4 p-12">
      {isLeagueSelected 
        ? <League leagueID={selectedLeagueID} toggleIsLeagueSelected={toggleIsLeagueSelected} />
        : <LeaguesList toggleIsLeagueSelected={toggleIsLeagueSelected} setSelectedLeagueID={setSelectedLeagueID} />
      }
    </div>
  )
}

export default LeaguesPanel