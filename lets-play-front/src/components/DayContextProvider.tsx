import { useState, ReactNode } from 'react';
import DayContext from '../contexts/DayContext';

interface DayContextProviderProps {
  children: ReactNode;
}

function DayContextProvider({ children }: DayContextProviderProps) {
  const [selectedDay, setSelectedDay] = useState('');
  const [isDaySelected, setIsDaySelected] = useState(false);

  return (
    <DayContext.Provider value={{ selectedDay, setSelectedDay, isDaySelected, setIsDaySelected }}>
      {children}
    </DayContext.Provider>
  );

}

export default DayContextProvider;
