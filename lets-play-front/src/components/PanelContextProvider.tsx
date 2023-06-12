import { useState, ReactNode } from 'react';
import PanelContext from '../contexts/PanelContext';

interface PanelContextProviderProps {
  children: ReactNode;
}

function PanelContextProvider({ children }: PanelContextProviderProps) {
  const [selectedDay, setSelectedDay] = useState('');
  const [isDaySelected, setIsDaySelected] = useState(false);
  const [selectedGroupID, setSelectedGroupID] = useState('');
  const [isGroupSelected, setIsGroupSelected] = useState(false);

  return (
    <PanelContext.Provider value={{ selectedDay, setSelectedDay, isDaySelected, setIsDaySelected, selectedGroupID, setSelectedGroupID, isGroupSelected, setIsGroupSelected }}>
      {children}
    </PanelContext.Provider>
  );

}

export default PanelContextProvider;
