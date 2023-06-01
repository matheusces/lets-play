import React from 'react';

interface PanelContextProps {
  selectedDay: string;
  setSelectedDay: React.Dispatch<React.SetStateAction<string>>;
  isDaySelected: boolean;
  isLeagueSelected: boolean;
  isTournamenteSelected: boolean;
  isGroupSelected: boolean;
  setIsLeagueSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTournamenteSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGroupSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDaySelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const PanelContext =  React.createContext<PanelContextProps>({
  selectedDay: '',
  setSelectedDay: () => {},
  isDaySelected: false,
  isLeagueSelected: false,
  isTournamenteSelected: false,
  isGroupSelected: false,
  setIsLeagueSelected: () => {},
  setIsTournamenteSelected: () => {},
  setIsGroupSelected: () => {},
  setIsDaySelected: () => {},
});

export default PanelContext;