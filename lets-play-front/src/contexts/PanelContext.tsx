import React from 'react';

interface PanelContextProps {
  selectedDay: string;
  selectedGroupID: string;
  setSelectedDay: React.Dispatch<React.SetStateAction<string>>;
  setSelectedGroupID: React.Dispatch<React.SetStateAction<string>>;
  isDaySelected: boolean;
  isGroupSelected: boolean;
  setIsGroupSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDaySelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const PanelContext =  React.createContext<PanelContextProps>({
  selectedDay: '',
  selectedGroupID: '',
  setSelectedDay: () => {},
  setSelectedGroupID: () => {},
  isDaySelected: false,
  isGroupSelected: false,
  setIsGroupSelected: () => {},
  setIsDaySelected: () => {},
});

export default PanelContext;