import { useState } from "react";
import TournamentsList from "./TournamentsList";
import Tournament from "./Tournament";

function TournamentsPanel() {
  const [isTournamentSelected, setIsTournamentSelected] = useState(false);
  const [selectedTournamentID, setSetSelectedTournamentID] = useState('');

  function toggleIsTournamentSelected() {
    setIsTournamentSelected(!isTournamentSelected);
  }

  return (
    <div className="w-[60rem] h-[36rem] bg-panel flex flex-col items-center p-2">
      {isTournamentSelected
        ? <Tournament tournamentID={selectedTournamentID} toggleIsTournamentSelected={toggleIsTournamentSelected} />
        : <TournamentsList toggleIsTournamentSelected={toggleIsTournamentSelected} setSelectedTournamentID={setSetSelectedTournamentID} />
      } 
    </div>
  )
}

export default TournamentsPanel