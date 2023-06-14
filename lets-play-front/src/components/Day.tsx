import { useState, useContext } from "react";
import DayContext from "../contexts/PanelContext";

interface DayProps {
  day: string;
}

function Day({ day }: DayProps) {
  const { isDaySelected, setIsDaySelected } = useContext(DayContext);
  const { selectedDay, setSelectedDay } = useContext(DayContext);

  function handleDaySelection() {
    setSelectedDay(day);
    setIsDaySelected(true);
  }

  return (
    <>
      <button
        className="w-20 h-20 bg-color-0 flex text-black items-center justify-center hover:drop-shadow-primary"
        onClick={handleDaySelection}
      >
        {day}
      </button>
    </>
  );
}

export default Day;
