
import { useState } from "react";
import MatchList from "./MatchList";
import Match, { MatchProps } from './Match';


function DayMatchsPanel() {
  const [isMatchSelected, setIsMatchSelected] = useState(false);
  const [matchSelected, setMatchSelected] = useState<MatchProps>({} as MatchProps);

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
        {/* <div className="w-full flex items-center justify-end gap-1 hover:drop-shadow-secondary">
          <span className="text-white font-outline-1 text-3xl">7</span>
          <img className="w-10 h-10" src={participants} alt="" />
        </div> */}

        {isMatchSelected ? (
          <Match match={matchSelected} handleToggleMatchList={handleToggleMatchList} />
        ) 
        : (
          <MatchList handleToggleMatchSelected={handleToggleMatchSelected} />
        )}
      </div>
      {/* <div className="w-full h-full absolute left-0 top-0 bg-galaxy bg-cover bg-no-repeat" /> */}
    </>
  )
}

export default DayMatchsPanel