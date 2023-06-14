
import { useState, useContext, useEffect } from 'react';
import MatchList from "./MatchList";
import Match from './Match';
import { MatchProps } from "../types/type";
import PanelContext from '../contexts/PanelContext';


function DayMatchsPanel() {
  const [isMatchSelected, setIsMatchSelected] = useState(false);
  const [matchSelected, setMatchSelected] = useState<MatchProps>({} as MatchProps);

  const { selectedDay } = useContext(PanelContext);

  function handleToggleMatchSelected(match: MatchProps) {
    setIsMatchSelected(!isMatchSelected);
    setMatchSelected(match);
  }

  function handleToggleMatchList() {
    setIsMatchSelected(!isMatchSelected);
  }

  return (
    <>
      <div className="w-[60rem] h-[36rem] bg-panel flex flex-col items-center gap-4 pt-8 hide-scroll-bar ">
        {isMatchSelected ? (
          <Match match={matchSelected} handleToggleMatchList={handleToggleMatchList} />
        ) 
        : (
          <MatchList handleToggleMatchSelected={handleToggleMatchSelected} />
        )}
      </div>
    </>
  )
}

export default DayMatchsPanel