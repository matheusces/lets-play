import { useContext } from 'react';
import DayContext from '../contexts/PanelContext';
import dayjs from 'dayjs';

interface DayProps {
  day: dayjs.Dayjs;
}

function Day({ day }: DayProps) {
  const { setIsDaySelected } = useContext(DayContext);
  const { setSelectedDay } = useContext(DayContext);


  function handleDaySelection() {
    setSelectedDay(day.format('YYYY-MM-DD'));
    setIsDaySelected(true);
  }

  return (
    <>
      <button className="w-20 h-20 bg-color-0 flex text-black items-center justify-center hover:drop-shadow-primary" onClick={(handleDaySelection)}>
        {day.format('DD')} 
      </button>
    </>
  )
}

export default Day