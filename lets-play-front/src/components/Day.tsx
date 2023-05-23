import { useState, useContext } from 'react';
import DayContext from '../contexts/DayContext';

interface DayProps {
  day: string
}

function Day({ day }: DayProps) {
  const { isDaySelected, setIsDaySelected } = useContext(DayContext);
  const { selectedDay, setSelectedDay } = useContext(DayContext);
  const [isSelectedDay, setIsSelectedDay] = useState(false);


  function handleDaySelection() {
    // setIsSelectedDay(!isSelectedDay);
    setSelectedDay(day);
    setIsDaySelected(true);
  }


  return (
    <>
      <button className="w-20 h-20 bg-color-0 flex text-black items-center justify-center hover:drop-shadow-primary" onClick={(handleDaySelection)}>
        {day} 
      </button>
    </>
  )
}

export default Day